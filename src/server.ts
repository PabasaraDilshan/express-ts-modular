import { initializeErrorHandling, initializeMiddlewares, initializeRoutes, initializeSwagger, startListening } from '@/app';
import authRouter from '@routes/auth.route';
import userRouter from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

initializeMiddlewares();
initializeRoutes([authRouter, userRouter]);
initializeSwagger();
initializeErrorHandling();
startListening();
