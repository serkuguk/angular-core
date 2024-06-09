import { ConnectionPositionPair } from "@angular/cdk/overlay";

export const languages = [
  {
    langage: 'Español',
    flag: 'sp'
  },
  {
    langage: 'English',
    flag: 'us'
  }
];

export const userItems = [
  {
    icon: 'far fa-user',
    label: 'Profile'
  },
  {
    icon: 'far fa-cog',
    label: 'Settings'
  },
  {
    icon: 'far fa-unlock-alt',
    label: 'Lock screen'
  },
  {
    icon: 'far fa-power-off',
    label: 'Logout'
  },
];

export const positions = [
  new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'top' }
  ),
];