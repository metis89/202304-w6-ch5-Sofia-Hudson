import { DataRepo } from './data.repository';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given DataRepo class', () => {
  describe('When I instantiate it', () => {
    const repo = new DataRepo();

    test('Then method query should be used', async () => {
      (fs.readFile as jest.Mock).mockResolvedValueOnce('[]');

      const result = await repo.query();

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
    test('Then method queryById should be used', async () => {
      const mockKnownThing = [{ id: 3 }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockKnownThing)
      );

      const result = await repo.queryById(3);

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockKnownThing[0]);
    });
    test('Then method create should be used', async () => {
      const mockKnownThing = [{ thing: '' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockKnownThing)
      );

      const result = await repo.create({ thing: '' });

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockKnownThing[0]);
    });
    test('Then method update should be used', async () => {
      const mockKnownThing = [{ id: 13213, thing: '' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockKnownThing)
      );

      const result = await repo.update(13213, { thing: 'b' });

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockKnownThing[0]);
    });
    test('Then method update should be used', async () => {
      const mockKnownThing = [{ id: 13213, thing: '' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockKnownThing)
      );

      const result = await repo.update(31233, { thing: '' });

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockKnownThing[0]);
    });
    test('Then method delete should be used', async () => {
      const mockKnownThing = [{}];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockKnownThing)
      );

      const result = await repo.deleteThing(13213);

      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockKnownThing[0]);
    });
  });
});
