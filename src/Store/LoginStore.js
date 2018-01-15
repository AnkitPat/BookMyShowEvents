
import EventEmitter from 'EventEmitter'

import Dispatcher from '../dispatcher/Dispatcher'

const profileInformation = {
    username: ''
};

const save = (username) => {
    console.log('Store here saving',username);
    profileInformation.username=username
};


const handlerAction = (action,username) => {
    switch (action.type) {
        case 'Login':
            save(username)
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