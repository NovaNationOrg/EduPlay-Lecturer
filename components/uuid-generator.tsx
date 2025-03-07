import { v4 as uuidv4 } from 'uuid';

const MyUUID = uuidv4().substring(0, 8);
export default MyUUID;