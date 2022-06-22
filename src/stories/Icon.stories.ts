import { ShareModule } from '@share/share.module';
import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

// This exports the Stories group for this component
export default {
  // The title defines the name and where in the structure of
  // Storybook's menu this is going to be placed.
  // Here we add it to a "Components" section under "Link"
  title: 'Icon',
  // The component related to the Stories
  component: IconComponent,
  decorators: [
    // The necessary modules for the component to work on Storybook
    moduleMetadata({
      declarations: [IconComponent],
      imports: [ShareModule],
    }),
  ],
};
// This creates a Story for the component
const Template: Story<IconComponent> = () => ({
  component: IconComponent,
  props: {
    content: {
      color: 'primary',
      name: 'format_color_fill',
    },
  },
  template: `<app-icon [content]="content"></app-icon>`,
});
export const Base = Template.bind({});
// Other stories could be added here as well, all you have to do is export them along!

Base.args = {
  variant: 'primary',
};

export const Base = {
  args: {
    variant: 'primary',
  },
};
