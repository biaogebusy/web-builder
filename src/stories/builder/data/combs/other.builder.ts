import { IBuilderComponent } from '@core/interface/IBuilder';
import * as profileStory from '@stories/components/profile/profile1v1.stories';
import * as bannerStory from '@stories/components/banner/BannerSimple.stories';

const {
  BannerOverlay: { args: banner },
} = bannerStory as any;

export const {
  UserProfile: { args: profile },
  Componey: { args: componey, storyName: componeyName },
} = profileStory as any;

export const others: IBuilderComponent[] = [
  banner,
  {
    content: {
      child: [
        {
          label: 'profile',
          elements: [
            profile,
            {
              ...componey,
              name: componeyName,
            },
          ],
        },
      ],
    },
  },
];
