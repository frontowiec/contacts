/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {data} from '../mock-data/data';
import {List} from 'immutable';
import {includes} from 'lodash';

export type Contact = {
  name: string;
  avatar: string;
  email: string;
  phone: number;
};

const LOAD_ALL_CONTACTS = 'LOAD_ALL_CONTACTS';
const FIND_CONTACTS = 'FIND_CONTACTS';

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

export const findContacts = (term: string) => ({
  type: FIND_CONTACTS,
  payload: term
});

export default function reducer(state = initialState, action): List<Contact> {
  switch (action.type) {
    case LOAD_ALL_CONTACTS:
      return action.payload;
    case FIND_CONTACTS:
      return filterContacts(action.payload, state);
    default:
      return state;
  }
}

const isContainTerm = (term: string, contact: Contact): boolean =>
includes(contact.name.toLocaleLowerCase(), term.toLocaleLowerCase()) ||
includes(contact.email.toLocaleLowerCase(), term.toLocaleLowerCase()) ||
includes(contact.phone, term.toLocaleLowerCase());


function filterContacts(term: string, contacts: List<Contact>): List<Contact> {
  return contacts.filter(contact => isContainTerm(term, contact)).toList();
}
