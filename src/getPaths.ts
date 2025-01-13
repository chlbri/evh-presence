import { t } from '@bemedev/types';
import { FROM } from './constants';
import { toString2 } from './toString2';

export const getPathsToCopy = () => {
  const out = t.anify<string[]>([]);

  const months = Array.from({ length: 11 });
  const monthsLength = months.length + 2;
  const days = ['Dimanche', 'Mercredi'] as const;

  months.forEach((_, _index) => {
    const index = _index + 2;

    days.forEach(day => {
      const to = FROM.replace(
        '/public/csv/2025-01',
        `/public/csv/2025-${toString2(index, monthsLength)}`,
      ).replace('Dimanche', day);

      out.push(to);
    });
  });

  const to = FROM.replace(days[0], days[1]);
  out.push(to);

  return out;
};
