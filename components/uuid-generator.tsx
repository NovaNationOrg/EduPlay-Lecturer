import { v4 as uuidv4 } from 'uuid';

export const generateUUID  = () =>{
    return uuidv4().substring(0, 8);
}
