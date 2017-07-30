/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {data} from '../mock-data/data';
import {List} from 'immutable';

export type Contact = {
  name: string;
  avatar: string;
  email: string;
  phone: number;
};

const LOAD_ALL_CONTACTS = 'LOAD_ALL_CONTACTS';

const initialState: List<Contact> = List([]);

const loadAllContacts = (contacts: List<Contact>) => ({
  type: LOAD_ALL_CONTACTS,
  payload: contacts
});

export const fetchContacts = () => dispatch => {
  setTimeout(() => {
    dispatch(loadAllContacts(data(10)));
  }, 1500);
};

export default function reducer(state = initialState, action): List<Contact> {
  switch (action.type) {
    case LOAD_ALL_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}
