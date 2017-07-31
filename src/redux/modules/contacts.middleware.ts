/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {contactsWorker, finishComputing, START_COMPUTING} from './contacts';

export function contactsMiddleware() {
  return store => next => action => {
    if (action.type === START_COMPUTING) {
      const state = store.getState();
      const contacts = state.contacts;
      contactsWorker.postMessage({term: action.term, contacts: contacts.get('default').toJS()});
    }
    contactsWorker.onmessage = message => {
      store.dispatch(finishComputing(message.data));
    };
    next(action);
  };
}
