import {
  Section1A,
  Section1B,
  Section2A,
  Section2B,
  Section3A,
  Section3B,
  Section4A,
  Section5A,
} from '@stories/builder/LayoutBuilder.stories';

export const sections = [
  {
    label: '1A',
    content: Section1A.args?.content,
  },
  {
    label: '1B',
    content: Section1B.args?.content,
  },
  {
    label: '2A',
    content: Section2A.args?.content,
  },
  {
    label: '2B',
    content: Section2B.args?.content,
  },
  {
    label: '3A',
    content: Section3A.args?.content,
  },
  {
    label: '3B',
    content: Section3B.args?.content,
  },
  {
    label: '4A',
    content: Section4A.args?.content,
  },
  {
    label: '5A',
    content: Section5A.args?.content,
  },
];
