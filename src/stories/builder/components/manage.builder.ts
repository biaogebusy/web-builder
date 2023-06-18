import * as dashboardStory from '@stories/sample/dashboard/Dashboard.stories';

const {
  Order: { args: dashboard },
  Advert: { args: advert },
} = dashboardStory;

export const manage = [dashboard, advert];
