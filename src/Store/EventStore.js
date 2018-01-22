
import EventEmitter from 'EventEmitter'

import Dispatcher from '../dispatcher/Dispatcher'

const  eventDetail = {
    image_url: '',
    title:'',
    address:'',
    price:'',
    date:'',
    full_date:'',
    full_price:'',
    full_address:''
};

const save = (image_url,title,address,price,date,full_date,full_price,full_address) => {
    console.log('Store here saving',title);
    eventDetail.image_url=image_url;
    eventDetail.title=title;
    eventDetail.address=address;
    eventDetail.price=price;
    eventDetail.date=date;
    eventDetail.full_address=full_address;
    eventDetail.full_date=full_date;
    eventDetail.full_price=full_price;
};


const handlerAction = (action,image_url,title,address,price,date,full_date,full_price,full_address) => {
    switch (action.type) {
        case 'Event_detail':
            save(image_url,title,address,price,date,full_date,full_price,full_address)
            break;
        default:
            //default things

            instance.emitChanges();

    }
};

Dispatcher.registerEvents(handlerAction);


class EventStore extends EventEmitter {

    getStore() {
       // console.log('get store method',eventDetail);
        return Object.assign({},eventDetail);
    }

    emitChanges() {
        this.emit('Event_detail')
    }

    addLoginListener(callback) {
        this.addListener('Event_detail',callback)
    }

    removeLoginListener (callback) {
        this.addListener('Event_detail',callback)
    }


}


const instance = new EventStore()
export default  instance;