import { hash } from 'bcrypt';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

export const findAllUser = async (): Promise<User[]> => {
  const users: User[] = UserModel;
  return users;
};

export const findUserById = async (userId: number): Promise<User> => {
  const findUser: User = UserModel.find(user => user.id === userId);
  if (!findUser) throw new HttpException(409, "User doesn't exist");

  return findUser;
};

export const createUser = async (userData: User): Promise<User> => {
  const findUser: User = UserModel.find(user => user.email === userData.email);
  if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

  const hashedPassword = await hash(userData.password, 10);
  const createUserData: User = { ...userData, id: UserModel.length + 1, password: hashedPassword };

  return createUserData;
};

export const updateUser = async (userId: number, userData: User): Promise<User[]> => {
  const findUser: User = UserModel.find(user => user.id === userId);
  if (!findUser) throw new HttpException(409, "User doesn't exist");

  const hashedPassword = await hash(userData.password, 10);
  const updateUserData: User[] = UserModel.map((user: User) => {
    if (user.id === findUser.id) user = { ...userData, id: userId, password: hashedPassword };
    return user;
  });

  return updateUserData;
};

export const deleteUser = async (userId: number): Promise<User[]> => {
  const findUser: User = UserModel.find(user => user.id === userId);
  if (!findUser) throw new HttpException(409, "User doesn't exist");

  const deleteUserData: User[] = UserModel.filter(user => user.id !== findUser.id);
  return deleteUserData;
};
