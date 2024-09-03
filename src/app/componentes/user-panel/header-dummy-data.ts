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
    label: 'PROFILE',
    userEvent: 'profile'
  },
  {
    icon: 'far fa-cog',
    label: 'SETTINGS',
    userEvent: 'settings'
  },
  {
    icon: 'far fa-unlock-alt',
    label: 'LOCK_SCREEN',
    userEvent: 'profile'
  },
  {
    icon: 'far fa-power-off',
    label: 'LOGOUT',
    userEvent: 'logout'
  },
];

export const positions = [
  new ConnectionPositionPair(
    { originX: 'end', originY: 'bottom' },
    { overlayX: 'end', overlayY: 'top' }
  ),
];
