import { Router } from 'express';
import * as AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

const authRouter = Router();

authRouter.post('/signup', ValidationMiddleware(CreateUserDto), AuthController.signUp);
authRouter.post('/login', ValidationMiddleware(CreateUserDto), AuthController.logIn);
authRouter.post('/logout', AuthMiddleware, AuthController.logOut);

export default authRouter;
// export class AuthRoute implements Routes {
//   // public router = Router();
//   public auth = new AuthController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.post('/signup', ValidationMiddleware(CreateUserDto), this.auth.signUp);
//     this.router.post('/login', ValidationMiddleware(CreateUserDto), this.auth.logIn);
//     this.router.post('/logout', AuthMiddleware, this.auth.logOut);
//   }
// }
