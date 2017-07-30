/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {data} from '../mock-data/data';

export type Contact = {
  name: string;
  avatar: string;
  email: string;
  phone: number;
};

const LOAD_ALL_CONTACTS = 'LOAD_ALL_CONTACTS';

const initialState: Array<Contact> = [];

const loadAllContacts = (contacts: Array<Contact>) => ({
  type: LOAD_ALL_CONTACTS,
  payload: contacts
});

export function fetchContacts() {
  return dispatch => {
    setTimeout(() => {
      dispatch(loadAllContacts(data(10)));
    }, 1500);
  };
}

export default function reducer(state = initialState, action): Array<Contact> {
  switch (action.type) {
    case LOAD_ALL_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}
