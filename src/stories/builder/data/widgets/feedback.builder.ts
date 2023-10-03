import * as progressBarStory from '@stories/widgets/feedback/ProgressBar.stories';
import * as progressGroupStory from '@stories/widgets/feedback/ProgressGroup.stories';
import * as spinnerStory from '@stories/widgets/feedback/Spinner.stories';
import * as notfoundStory from '@stories/sample/feedback/404.stories';

const {
  Default: { args: notfound },
} = notfoundStory;

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
    label: '进度条',
    icon: { svg: 'progress-helper' },
    ...progressbar,
  },
  {
    label: '进度组',
    icon: { svg: 'format-list-group' },
    ...progressGroup,
  },
  {
    label: '加载',
    icon: { svg: 'reload' },
    ...spinner,
  },
];
