import { NextFunction, Request, Response } from 'express';
import { DataRepo } from '../repository/data.repository';
import createDebug from 'debug';

const debug = createDebug('W6:DataController');

export class DataController {
  constructor(private repo: DataRepo) {
    debug(this.repo);
  }

  async getAll(request: Request, response: Response, next: NextFunction) {
    try {
      response.send(await this.repo.query());
    } catch (error) {
      next(error);
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    try {
      response.send(await this.repo.queryById(parseFloat(request.params.id)));
    } catch (error) {
      next(error);
    }
  }

  async post(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(201);
      response.send(await this.repo.create(request.body));
    } catch (error) {
      next(error);
    }
  }

  async patch(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(202);
      response.send(
        await this.repo.update(request.body, Number(request.params.id))
      );
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(204);
      response.send(await this.repo.deleteThing(parseFloat(request.params.id)));
    } catch (error) {
      next(error);
    }
  }
}
