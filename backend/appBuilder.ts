import express, { Express, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import router from './router';
import { RequestError } from './RequestError'
import { environment } from './config';
import validationHandler from './utils/validationHandler'
import errorHandler from './utils/errorHandler';

const isProduction = environment === 'production';

interface AppObject {
  [app: string]: Express
}

export default function appBuilder (ports: string[]) {
  const apps = {};
  for (const port of ports) {
    const app = express();
    apps[port] = app;
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    if (!isProduction) app.use(cors());
    app.use(helmet({
      contentSecurityPolicy: false
    }));
    app.use(csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction,
        httpOnly: true
      }
    }));

    app.use(router);

    app.use((_req, _res, next: NextFunction) => {
      const err = new RequestError(
        'Resource Not Found',
        'The requested resource couldn\'t be found.',
        404
      );
      next(err);
    });

    app.use(validationHandler);

    app.use(errorHandler);
  }
  return apps;
}
