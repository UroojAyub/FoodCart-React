import {db} from './firebase';


export const pushNewOrder = (uid,order) => db.ref(`orders/${uid}`).push(order);

export const getUserOrders = (uid) => db.ref(`orders/${uid}`).orderByChild('timestamp');