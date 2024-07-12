import { RoleType } from './RoleType';

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: RoleType;
}
