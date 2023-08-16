import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import * as UserService from '@services/users.service';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const findAllUsersData: User[] = await UserService.findAllUser();

    res.status(200).json({ data: findAllUsersData, message: 'findAll' });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const findOneUserData: User = await UserService.findUserById(userId);

    res.status(200).json({ data: findOneUserData, message: 'findOne' });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: User = req.body;
    const createUserData: User = await UserService.createUser(userData);

    res.status(201).json({ data: createUserData, message: 'created' });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const userData: User = req.body;
    const updateUserData: User[] = await UserService.updateUser(userId, userData);

    res.status(200).json({ data: updateUserData, message: 'updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const deleteUserData: User[] = await UserService.deleteUser(userId);

    res.status(200).json({ data: deleteUserData, message: 'deleted' });
  } catch (error) {
    next(error);
  }
};

// export class UserController {
//   public user = Container.get(UserService);

//   public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const findAllUsersData: User[] = await this.user.findAllUser();

//       res.status(200).json({ data: findAllUsersData, message: 'findAll' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const userId = Number(req.params.id);
//       const findOneUserData: User = await this.user.findUserById(userId);

//       res.status(200).json({ data: findOneUserData, message: 'findOne' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const userData: User = req.body;
//       const createUserData: User = await this.user.createUser(userData);

//       res.status(201).json({ data: createUserData, message: 'created' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const userId = Number(req.params.id);
//       const userData: User = req.body;
//       const updateUserData: User[] = await this.user.updateUser(userId, userData);

//       res.status(200).json({ data: updateUserData, message: 'updated' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const userId = Number(req.params.id);
//       const deleteUserData: User[] = await this.user.deleteUser(userId);

//       res.status(200).json({ data: deleteUserData, message: 'deleted' });
//     } catch (error) {
//       next(error);
//     }
//   };
// }
