
import Dispatcher from '../dispatcher/Dispatcher'

export const LoginDone= (username) => {
    const action = {
        type: 'Login'
    };
    Dispatcher.dispatch(action,username)

};

