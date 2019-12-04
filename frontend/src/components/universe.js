
class Universe{

    static get MassDecorator(){
        return class{
            constructor(mass, location, velocity){
                this.location = location
                this.mass = mass
                this.velocity = velocity
            }



        }
    }


    constructor(){
        this.masses = []
        this.container = document.querySelector('#universe')

    }

    addMass(mass, location, velocity = {x: 0, y: 0}){
        const decMass = new Universe.MassDecorator(mass, location, velocity)
        this.mass.push(decMass)
    }

    removeMass(mass){
        this.masses = this.masses.filter(m => m.mass !== mass)
    }
    

}