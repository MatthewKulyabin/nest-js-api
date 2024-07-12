import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInterface } from './types/UserInterface';
import { RoleType } from './types/RoleType';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: UserInterface[] = [
    {
      id: 'FAA8A3DC-DE67-5E3C-0644-E3DC446B722B',
      name: 'Nola Duke',
      email: 'id.magna@aol.com',
      role: RoleType.intern,
    },
    {
      id: 'BBC9EDE3-2EF8-D146-C39E-C438A39015A4',
      name: 'Shelby Hahn',
      email: 'neque.et@protonmail.com',
      role: RoleType.engineer,
    },
    {
      id: 'C1A2C2C8-CAEE-9E2A-5DE3-3D82BEF1FEDA',
      name: 'Kaye Mccormick',
      email: 'volutpat.nunc.sit@icloud.net',
      role: RoleType.engineer,
    },
    {
      id: '991611EA-91C9-7A5D-D228-692C695E7992',
      name: 'Carol Morgan',
      email: 'sed.molestie@google.com',
      role: RoleType.intern,
    },
    {
      id: '18B25288-24D8-3190-AAC2-2BCF7B44D931',
      name: 'Reece Fuentes',
      email: 'praesent@hotmail.com',
      role: RoleType.admin,
    },
  ];

  findAll(role?: RoleType): UserInterface[] {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length) {
        throw new NotFoundException('User Role Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: string): UserInterface {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  create(createUserDto: CreateUserDto): UserInterface {
    const newUser = { ...createUserDto, id: Date.now().toString() };
    this.users.push(newUser);

    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserInterface {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updateUserDto } : user,
    );

    return this.findOne(id);
  }

  remove(id: string) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
