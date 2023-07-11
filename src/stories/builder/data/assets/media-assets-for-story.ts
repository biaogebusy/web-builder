const featureBox = {
  id: 1,
  type: 'feature-box',
  width: '20',
  fullIcon: 'fullscreen',
  copyIcon: 'content-copy',
  ratios: 'media-4-3',
  mode: 'float',
  hoverIcon: true,
};
export const mediaAssets = {
  elements: [
    {
      ...featureBox,
      img: {
        classes: 'object-fit',
        src: '/assets/images/1-1/animal-01.jpg',
        alt: '',
      },
    },
  ],
  links: {
    first: {
      href: 'xx',
    },
    next: {
      href: 'xx',
    },
    prev: {
      href: 'xx',
    },
    self: {
      href: 'xx',
    },
  },
};
