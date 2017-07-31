/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {Contact} from './contacts';
import {List} from 'immutable';
import {includes} from 'lodash';

declare function postMessage(message: any): void;

const isContainTerm = (term: string, contact: Contact): boolean =>
includes(contact.name.toLocaleLowerCase(), term.toLocaleLowerCase()) ||
includes(contact.email.toLocaleLowerCase(), term.toLocaleLowerCase()) ||
includes(contact.phone, term.toLocaleLowerCase());


const filterContacts = (term: string, contacts: List<Contact>): List<Contact> =>
  contacts.filter(contact => isContainTerm(term, contact)).toList();

self.onmessage = (message: any) => {
  postMessage(filterContacts(message.data.term, List(message.data.contacts)).toJS());
};
