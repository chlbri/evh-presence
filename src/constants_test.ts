import { join } from 'node:path';

const _fromTest =
  './public/csv-test/2025-01 - Bilan Présence -- Dimanche.numbers';

export const FROM_TEST = join(process.cwd(), _fromTest);
