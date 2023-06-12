import EventEmitter from 'events';
import {Authentication,is_authenticated} from '../auth/auth.js'
const eventEmitter = new EventEmitter();

async function Emitter(message_id, data) {
    if(is_authenticated){
    console.log("emitted a message with name -----> ",message_id)
    eventEmitter.emit(message_id,data)
    }else{
        console.log("please authorize with valid credentials")
    }
}

export {Emitter,eventEmitter}