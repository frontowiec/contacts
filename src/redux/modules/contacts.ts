/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import {data} from '../mock-data/data';
import {List, Map} from 'immutable';
import {includes} from 'lodash';
import * as MyWorker from 'worker-loader!./filterContacts';

export const contactsWorker: Worker = new MyWorker();

export type Contact = {
  name: string;
  avatar: string;
  email: string;
  phone: number;
};

const LOAD_ALL_CONTACTS = 'LOAD_ALL_CONTACTS';
const FIND_CONTACTS = 'FIND_CONTACTS';
export const START_COMPUTING = 'START_COMPUTING';
const FINISH_COMPUTING = 'FINISH_COMPUTING';

const initialState: Map<string, List<Contact> | boolean> = Map({
  default: List([]),
  current: List([]),
  isComputing: false
});

const loadAllContacts = (contacts: List<Contact>) => ({
  type: LOAD_ALL_CONTACTS,
  payload: contacts
});

export const fetchContacts = () => dispatch => {
  setTimeout(() => {
    dispatch(loadAllContacts(List(data(1000))));
  }, 1500);
};

export const startComputing = (term: string) => ({
  type: START_COMPUTING,
  payload: true,
  term
});

export const finishComputing = (data) => ({
  type: FINISH_COMPUTING,
  payload: false,
  data
});

export const findContacts = (term: string) => dispatch =>
  dispatch(startComputing(term));

export default function reducer(state = initialState, action): Map<string, List<Contact> | boolean> {
  switch (action.type) {
    case LOAD_ALL_CONTACTS:
      return Map({default: action.payload, current: action.payload, isComputing: false});
    case START_COMPUTING:
      return state.set('isComputing', true);
    case FINISH_COMPUTING:
      return state.set('isComputing', false).set('current', List(action.data));
    default:
      return state;
  }
}
