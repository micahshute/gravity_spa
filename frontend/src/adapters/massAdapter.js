const MassAdapter = (function(){

    //Singleton Holder
    let instance = null

    return class{

        // Class method to retrieve singleton instance
        static instance(token = null){
            if(instance === null){ instance = new this() }
            return instance
        }

        // Constructor only returns a new instance one time
        constructor(token = null){
            if(instance !== null){ 
                return instance
            }else{
                this.token = token
                instance = this 
                return instance
            }
        }

        get baseURL(){
            return `http://localhost:3000`
        }

        get massesURL(){
            return `${this.baseURL}/masses`
        }

            massURL(id){
            return `${this.massesURL}/${id}`
        }

        get headers(){
            const stdHeader =  {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

            if(this.token === null){
                return stdHeader
            }
            return {
                ...stdHeader,
                'Authorization': `Bearer ${this.token}`
            }
        }

        async getMasses(){
            const res = await fetch(this.massesURL)
            this.checkStatus(res)
            return await res.json()
        }

        async getMass(id){
            const res = await fetch(this.massURL(id))
            this.checkStatus(res)
            return await res.json()
        }

        async newMass(params){
            const res = await fetch(this.massesURL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(params)
            })
            this.checkStatus(res)
            return await res.json()
        }

        checkStatus(res){
            if(res.status > 299 || res.status < 200){
                throw new Error(res.status)
            }
        }


    }
})()

