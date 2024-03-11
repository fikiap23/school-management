import { RoleEnum } from 'src/helpers/helper';

export type PayloadToken = {
  sub: string;
  role: RoleEnum;
};
