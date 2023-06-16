import * as progressBarStory from '../../widgets/feedback/ProgressBar.stories';
import * as progressGroupStory from '../../widgets/feedback/ProgressGroup.stories';
import * as spinnerStory from '../../widgets/feedback/Spinner.stories';

const {
  Determinate: { args: progressbar },
} = progressBarStory;

const {
  Default: { args: progressGroup },
} = progressGroupStory;

const {
  Default: { args: spinner },
} = spinnerStory;

export const feedback = [
  {
    label: 'Progress',
    icon: { svg: 'progress-helper' },
    ...progressbar,
  },
  {
    label: 'Group',
    icon: { svg: 'format-list-group' },
    ...progressGroup,
  },
  {
    label: 'Loadding',
    icon: { svg: 'reload' },
    ...spinner,
  },
];
