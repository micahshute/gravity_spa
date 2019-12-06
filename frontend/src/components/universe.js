
class Universe{

    static get MassDecorator(){
        return class{
            constructor(mass, location, velocity){
                this.location = location
                this.baseMass = mass
                this.velocity = velocity
                this.mass = mass.mass
                this.name = mass.name
                this.radius = mass.radius
            }

            get html(){
                const centerX = this.location.x
                const centerY =  this.location.y
                const top = centerY - (this.baseMass.alteredPixelSize / 2) - 20
                const right = 10000 - centerX - (this.baseMass.alteredPixelSize / 2) - 20
                return this.baseMass.htmlPicture(`position: absolute; top: ${top}px; right: ${right}px;`)
            }

        }
    }

//238900 miles from earth to moon
//7917 earth diameter miles

    constructor(){
        this.masses = []
        this.initBindingsAndEventListeners()
        this.addMassCallback = null
        this.physicsMachine = PhysicsMachine
        this.simulating = false
        this.simulationInterval = null
        this.speedRatioValue = 1
    }


    initBindingsAndEventListeners(){
        this.container = document.querySelector('#universe')
        this.simContainer = document.querySelector('#universe-sim')
        this.beginSimulationButton = document.querySelector('#begin-sim')
        this.initXVel = document.querySelector("#xvel")
        this.initYVel = document.querySelector("#yvel")
        this.clearSim = document.querySelector("#clear-sim")
        this.speedRatio = document.querySelector('#speed-ratio')

        this.simContainer.addEventListener('click', this.handleSimClick.bind(this))
        this.beginSimulationButton.addEventListener('click', this.toggleSimHandler.bind(this))
        this.clearSim.addEventListener('click', this.clearSimulation.bind(this))
        this.speedRatio.addEventListener('change', this.changeSpeedRatio.bind(this))
    }

    addMass(mass, location){
        const velocity = {
            x: parseInt(this.initXVel.value),
            y: parseInt(this.initYVel.value)
        }
        console.log(velocity)
        const decMass = new Universe.MassDecorator(mass, location, velocity)
        this.masses.push(decMass)
        this.physicsMachine.allForcesForMass(decMass, this.masses, 1)
        this.render()
    }

    changeSpeedRatio(e){
        const newRatio = parseInt(e.target.value)
        if(newRatio > 0){
            this.speedRatioValue = newRatio
        }
    }


    clearSimulation(){
        this.masses = []
        this.render()
    }

    toggleSimHandler(e){
        if(this.simulating){
            this.simulating = false
            clearInterval(this.simulationInterval)
            e.target.innerText = "Begin Simulation"
        }else{
            this.simulating = true
            e.target.innerText = "Stop Simulation"
            this.simulationInterval = setInterval(this.simulationUpdater.bind(this), 1)
        }
    }

    simulationUpdater(){
        const massForces = this.masses.map(m => ({
            mass: m,
            force: this.physicsMachine.allForcesForMass(m, this.masses)
        }))
        for(let massForce of massForces){
            this.physicsMachine.updateMass(massForce.mass, massForce.force, this.speedRatioValue)

        }
        
        this.render()
    }

    removeMass(mass){
        this.masses = this.masses.filter(m => m.mass !== mass)
    }

    handleSimClick(e){
        const x = e.offsetX
        const y = e.offsetY
        const mass = this.addMassCallback()
        if(mass){
            this.addMass(mass, {x,y})
        }
        
    }
    
    render(){
        this.simContainer.innerHTML = this.masses.map(m => m.html).join('')
    }

}