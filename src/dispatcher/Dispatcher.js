

class Dispatcher {

    constructor(){
        this.isDispatching = false;
        this.actionHandlers = [];
    }

    dispatch(action,username){
        if(this.isDispatching)
            throw new Error('we are already dispatching')

        this.isDispatching=true;
        //to do disptach

        this.actionHandlers.forEach(handler=>handler(action,username))

        this.isDispatching=false
    }

    dispatch(action,image_url,title,address,price,date,full_date,full_price,full_address) {
        if(this.isDispatching)
            throw new Error('we are already dispatching')

        this.isDispatching=true;
        //to do disptach

        this.actionHandlers.forEach(handler=>handler(action,image_url,title,address,price,date,full_date,full_price,full_address))

        this.isDispatching=false
    }

    register(actionHandlers)
    {
        this.actionHandlers.push(actionHandlers)
    }


}


export default new Dispatcher()