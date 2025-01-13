import { t } from '@bemedev/types';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { FROM_TEST } from './constants_test';
import { copyFiles, deleteFiles } from './modifyFiles';
import { toString2 } from './toString2';

vi.mock('./getPaths', async original => {
  return {
    ...(await original<typeof import('./getPaths')>()),
    getPathsToCopy: () => {
      const out = t.anify<string[]>([]);

      const months = Array.from({ length: 11 });
      const monthsLength = months.length + 2;
      const days = ['Dimanche', 'Mercredi'] as const;

      months.forEach((_, _index) => {
        const index = _index + 2;

        days.forEach(day => {
          const to = FROM_TEST.replace(
            '/public/csv-test/2025-01',
            `/public/csv-test/2025-${toString2(index, monthsLength)}`,
          ).replace('Dimanche', day);

          out.push(to);
        });
      });

      const to = FROM_TEST.replace(days[0], days[1]);
      out.push(to);

      return out;
    },
  };
});

describe('CSV', () => {
  const dir = join(process.cwd(), 'public/csv-test');

  test('#0 => Only one file', () => {
    const numb = readdirSync(dir).length;
    expect(numb).toBe(1);
  });

  test('#1 => copyFiles', () => copyFiles());

  test('#2 => Tests the created files', () => {
    const numb = readdirSync(dir).length;
    expect(numb).toBe(24);
  });

  test('#3 => deleteFiles', deleteFiles);

  test('#4 => Only one file', () => {
    const numb = readdirSync(dir).length;
    expect(numb).toBe(1);
  });
});
