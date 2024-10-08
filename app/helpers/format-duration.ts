import { helper } from '@ember/component/helper';
import { intervalToDuration, formatDuration as libFormatDuration } from 'date-fns';

const formatDuration = helper(function formatDuration([durationInSeconds]: [number] /*, named*/) {
  const duration = intervalToDuration({ start: 0, end: durationInSeconds * 1000 });

  return libFormatDuration(duration);
});

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'format-duration': typeof formatDuration;
  }
}

export default formatDuration;
