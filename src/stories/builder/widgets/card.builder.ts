import * as cardBaseStory from '@stories/widgets/card/Card.stories';
import * as card1v1Story from '@stories/widgets/card/Card1v1.stories';
import * as card1v2Story from '@stories/widgets/card/Card1v2.stories';
import * as card1v4Story from '@stories/widgets/card/Card1v4.stories';
import * as card1v5Story from '@stories/widgets/card/Card1v5.stories';
import * as card1v6Story from '@stories/widgets/card/Card1v6.stories';

const {
  Base: { args: cardBase },
} = cardBaseStory;

const {
  Default: { args: v1 },
} = card1v1Story;
const {
  Default: { args: v2 },
} = card1v2Story;
const {
  Default: { args: v4 },
} = card1v4Story;

const {
  StepFirst: { args: v5 },
} = card1v5Story;

const {
  Default: { args: v6 },
} = card1v6Story;

export const card = [
  {
    label: 'Card',
    icon: { svg: 'card-outline' },
    ...cardBase,
  },
  {
    label: 'Card v1',
    icon: {
      svg: 'numeric-1',
    },
    ...v1,
  },
  {
    label: 'Card v2',
    icon: {
      svg: 'numeric-2',
    },
    ...v2,
  },
  {
    label: 'Card 1v4',
    icon: { svg: 'numeric-4' },
    ...v4,
  },
  {
    label: 'Card 1v5',
    icon: { svg: 'numeric-5' },
    ...v5,
  },
  {
    label: 'Card 1v6',
    icon: { svg: 'numeric-6' },
    ...v6,
  },
];
