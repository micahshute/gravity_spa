class Mass{

    static get sizeRatio(){
        return (1 / 250000)
    }

    static get maxPixelSize(){
        return 200
    }

    static get minPixelSize(){
        return 1
    }

    static get adapter(){
        return MassAdapter.instance
    }

    static async retrieveAll(){
        try{
            const json = await this.adapter.getMasses()
            return json.map(obj => new this(obj))
        }catch(err){
            alert(`The request failed with status ${err}`)
            return null
        }
    }

    constructor(params){
        const { id, name, radius, mass } = params
        this.id = id
        this.name = name
        this.radius = radius
        this.mass = mass
    }

    get pixelSize(){
        return this.radius * 2 * Mass.sizeRatio
    }

    get alteredPixelSize(){
        let pixelSize = this.pixelSize
        if(pixelSize > Mass.maxPixelSize){
            pixelSize = Mass.maxPixelSize
        }else if(pixelSize < Mass.minPixelSize){
            pixelSize = Mass.minPixelSize
        }
        return pixelSize
    }

    get htmlWithLabel(){
        return (`
            <div class='mass-border'>
                ${this.htmlPicture}
                <ul>
                    <li>${this.name}</li>
                    <li>Radius: ${this.radius} m</li>
                    <li>Mass: ${this.mass} kg</li>
                </ul>
                <button id="select-mass" data-id="${this.id}">Select</button>
            </div>
        `)
    }



    get htmlPicture(){
        return (`
            <div class='circle' style='height: ${this.alteredPixelSize}px; width: ${this.alteredPixelSize}px;' >
            </div>
        `)
    }
}