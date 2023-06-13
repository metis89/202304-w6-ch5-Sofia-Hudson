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
      const mockHateThing = [{ id: 2 }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockHateThing)
      );
      const result = await repo.queryById(2);
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockHateThing[1]);
    });

    test('Then method create should be used', async () => {
      const mockHateThing = [{ thing: '' }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockHateThing)
      );
      const result = await repo.create({ thing: '' });
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockHateThing[0]);
    });

    test('Then method update should be used', async () => {
      const mockHateThing = [{ id: '88'}];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockHateThing)
      );
      const result = await repo.update('88', {});
      expect(fs.readFile).toHaveBeenCalled();
      expect(result).toEqual(mockHateThing[0]);

    });

    test('Then method delete should be used', async () => {
      const mockHateThing = [{ id: 1 }];
      (fs.readFile as jest.Mock).mockResolvedValueOnce(mockHateThing);
      await repo.deleteThing(0);

      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
    });
  });
});
