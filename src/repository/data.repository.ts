import fs from 'fs/promises';
import createDebug from 'debug';
import { Thing } from '../entities/thing.js';
import { Repo } from './repo.js';
import { HttpError } from '../types/http.error.js';
import { createID } from '../helper/helpers.js';

const debug = createDebug('CHW:KnownThingsRepo');

const file = './data.json';

export class DataRepo implements Repo<Thing> {
  constructor() {
    debug('Data Things Repo');
  }

  async query() {
    const stringData = await fs.readFile(file, { encoding: 'utf-8' });
    const data = JSON.parse(stringData) as Thing[];

    return data;
  }

  async queryById(id: number | string) {
    const data = await this.query();
    const result = data.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Bad id for the query');
    return result;
  }

  async create(thing: Omit<Thing, 'id'>) {
    const data = await this.query();
    const newThing: Thing = { ...thing, id: createID() };
    const result = JSON.stringify([...data, newThing]);
    await fs.writeFile(file, result, { encoding: 'utf-8' });
    return newThing;
  }

  async update(thing: Partial<Thing>, id: number | string) {
    const data = await this.query();

    let modifiedThing: Thing = {} as Thing;
    const result = data.map((item) => {
      if (item.id === id) {
        modifiedThing = { ...item, ...thing };
        return modifiedThing;
      }

      return item;
    });

    if (!modifiedThing!.id)
      throw new HttpError(404, 'Not found', 'Bad id for the update');

    await fs.writeFile(file, JSON.stringify(result), { encoding: 'utf-8' });
    return modifiedThing;
  }

  async deleteThing(id: number) {
    const data = await this.query();
    const newThingList = data.filter((item) => item.id !== id);
    await fs.writeFile(file, JSON.stringify(newThingList), {
      encoding: 'utf-8',
    });
  }
}
