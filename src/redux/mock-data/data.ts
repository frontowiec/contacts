/**
 * Created by Marcin Sirocki
 * email: marcinsirocki@gmail.com
 */
import * as faker from 'faker';
import {Contact} from '../modules/contacts';

export const data = (n: number): Array<Contact> => {
  let contacts: Array<Contact> = [];
  for (let i = 0; i <= n; i++) {
    contacts.push({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber()
    });
  }

  return contacts;
};
