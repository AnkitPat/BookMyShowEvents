
import EventEmitter from 'EventEmitter'

import Dispatcher from '../dispatcher/Dispatcher'

const profileInformation = {
    username: '',
    emailId:'',
    image_url:''
};

const save = (username,emailId,image_url) => {
    console.log('Store here saving',username+emailId+image_url);
    profileInformation.username=username
    profileInformation.emailId = emailId
    profileInformation.image_url= image_url
};


const handlerAction = (action,username,emailId,image_url) => {
    switch (action.type) {
        case 'Login':
            save(username,emailId,image_url)
            break;
        default:
            //default things

            instance.emitChanges();

    }
};

Dispatcher.register(handlerAction);


class LoginStore extends EventEmitter {

    getStore() {
        console.log('get store method',profileInformation);
        return Object.assign({},profileInformation);
    }

    emitChanges() {
        this.emit('Login')
    }

    addLoginListener(callback) {
        this.addListener('Login',callback)
    }

    removeLoginListener (callback) {
        this.addListener('Login',callback)
    }


}


const instance = new LoginStore()
export default  instance;