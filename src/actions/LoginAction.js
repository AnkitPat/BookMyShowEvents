
import Dispatcher from '../dispatcher/Dispatcher'

export const LoginDone= (username,emailId,image_url) => {
    const action = {
        type: 'Login'
    };
    Dispatcher.dispatch(action,username,emailId,image_url)

};

