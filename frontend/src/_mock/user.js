import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
function generateCompanyCombinations() {
  const combinations = [];
  for (let i = 7; i <= 9; i += 1) {
    for (let j = 'A'.charCodeAt(0); j <= 'F'.charCodeAt(0); j += 1) {
      combinations.push(`${i}-${String.fromCharCode(j)}`);
    }
  }
  return combinations;
}

// Mendapatkan kombinasi untuk company
const kelas = generateCompanyCombinations();
export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  kelas: sample(kelas),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample(['Murid', 'Guru', 'Admin']),
}));
