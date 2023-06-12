import { Thing } from '../entities/thing';

export const createID = (): Thing['id'] =>
  Math.trunc(Math.random() * 1_000_000_000);
