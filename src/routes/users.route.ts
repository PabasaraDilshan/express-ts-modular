import { Router } from 'express';
import * as UserController from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const path = '/users';
const userRouter = Router();

userRouter.get(`${path}`, UserController.getUsers);
userRouter.get(`${path}/:id(\\d+)`, UserController.getUserById);
userRouter.post(`${path}`, ValidationMiddleware(CreateUserDto), UserController.createUser);
userRouter.put(`${path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), UserController.updateUser);
userRouter.delete(`${path}/:id(\\d+)`, UserController.deleteUser);

export default userRouter;
// export class UserRoute implements Routes {
//   public path = '/users';
//   public router = Router();
//   public user = new UserController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.get(`${this.path}`, this.user.getUsers);
//     this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);
//     this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
//     this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), this.user.updateUser);
//     this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
//   }
// }
