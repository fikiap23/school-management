import { sample } from 'lodash';

// ----------------------------------------------------------------------

import { faker } from '@faker-js/faker';

export const account = {
  displayName: 'Fiki Aprian',
  email: 'fiki@fikitech.co',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
  idUser: faker.string.uuid(),
  location: faker.location.city(),
  birthDate: faker.date.anytime(),
  gender: sample(['Laki-Laki', 'Perempuan']),
  religion: sample(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha']),
};
