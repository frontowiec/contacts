/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {data} from '../mock-data/data';
import {List, Map} from 'immutable';
import {includes} from 'lodash';

export type Contact = {
  name: string;
  avatar: string;
  email: string;
  phone: number;
};

const LOAD_ALL_CONTACTS = 'LOAD_ALL_CONTACTS';
const FIND_CONTACTS = 'FIND_CONTACTS';

const initialState: Map<string, List<Contact>> = Map({default: List([]), current: List([])});

const loadAllContacts = (contacts: List<Contact>) => ({
  type: LOAD_ALL_CONTACTS,
  payload: contacts
});

export const fetchContacts = () => dispatch => {
  setTimeout(() => {
    dispatch(loadAllContacts(List(data(10))));
  }, 1500);
};

export const findContacts = (term: string) => ({
  type: FIND_CONTACTS,
  payload: term
});

const isContainTerm = (term: string, contact: Contact): boolean =>
includes(contact.name.toLocaleLowerCase(), term.toLocaleLowerCase()) ||
includes(contact.email.toLocaleLowerCase(), term.toLocaleLowerCase()) ||
includes(contact.phone, term.toLocaleLowerCase());


const filterContacts = (term: string, contacts: List<Contact>): List<Contact> =>
  contacts.filter(contact => isContainTerm(term, contact)).toList();

export default function reducer(state = initialState, action): Map<string, List<Contact>> {
  switch (action.type) {
    case LOAD_ALL_CONTACTS:
      return Map({default: action.payload, current: action.payload});
    case FIND_CONTACTS:
      const term = action.payload;
      return state.set('current', filterContacts(term, state.get('default')));
    default:
      return state;
  }
}
