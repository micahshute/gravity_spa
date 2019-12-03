class Mass{

    static get adapter(){
        return MassAdapter.instance
    }

    static async retrieveAll(){
        try{
            const json = await this.adapter.getMasses()
            return json.map(obj => new this(obj))
        }catch{
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


    get html(){
        return (`
            <div class='circle'>

            </div>
        `)
    }
}