
import Dispatcher from '../dispatcher/Dispatcher'

export const saveDetails= (image_url,title,address,price,date,full_date,full_price,full_address) => {
    const action = {
        type: 'Event_detail'
    };
    Dispatcher.dispatchEVent(action,image_url,title,address,price,date,full_date,full_price,full_address)

};

