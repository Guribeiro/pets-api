import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import { config } from 'dotenv';
import '@shared/container';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';
import routes from '@shared/http/routes';

const port = process.env.PORT || 3333;

config();

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(port, () => console.log(`server is running on port ${port}`));
