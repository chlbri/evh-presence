import { copyFileSync, existsSync, unlinkSync } from 'fs';
import { FROM } from './constants';
import { getPathsToCopy } from './getPaths';

export const deleteFiles = () => {
  const PATHS = getPathsToCopy();

  PATHS.forEach(path => {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  });
};

export const copyFiles = () => {
  const PATHS = getPathsToCopy();

  PATHS.forEach(path => {
    copyFileSync(FROM, path);
  });
};
