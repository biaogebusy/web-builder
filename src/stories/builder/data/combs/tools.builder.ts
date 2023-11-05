import * as lotteryStory from '@stories/feature/calculator/Lottery.stories';

const {
  Default: { args: lottery },
} = lotteryStory;
export const tools = [
  {
    label: '红包预算器',
    icon: {
      svg: 'format-size',
    },
    ...lottery,
  },
];
