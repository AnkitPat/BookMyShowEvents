

class Dispatcher {

    constructor(){
        this.isDispatching = false;
        this.isDispatchingEvents = false;

        this.actionHandlers = [];
        this.actionHandlersEvents = [];
    }

    dispatch(action,username,emailId,image_url){
        if(this.isDispatching)
            throw new Error('we are already dispatching')

        this.isDispatching=true;
        //to do disptach

        this.actionHandlers.forEach(handler=>handler(action,username,emailId,image_url))

        this.isDispatching=false
    }

    dispatchEVent(action,image_url,title,address,price,date,full_date,full_price,full_address) {
        if(this.isDispatchingEvents)
            throw new Error('we are already dispatching')

        this.isDispatchingEvents=true;
        //to do disptach

        this.actionHandlersEvents.forEach(handler=>handler(action,image_url,title,address,price,date,full_date,full_price,full_address))

        this.isDispatchingEvents=false
    }

    register(actionHandlers)
    {
        this.actionHandlers.push(actionHandlers)
    }
    registerEvents(actionHandlers)
    {
        this.actionHandlersEvents.push(actionHandlers)
    }


}


export default new Dispatcher()