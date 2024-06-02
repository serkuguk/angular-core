import { INavbarData } from "./interfaces/nav-bar-data.interface";

export const navabarData: INavbarData[] = [
  {
    routerLink: 'auth',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routerLink: 'examples',
    icon: 'fal fa-box-open',
    label: 'Examples'
  },
  {
    routerLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'Statistics'
  },
  {
    routerLink: 'basic-example',
    icon: 'fal fa-tags',
    label: 'Coupens',
    items: [
      {
        routerLink: 'coupens/list',
        label: 'List Coupens',
      },
      {
        routerLink: 'coupens/crate',
        label: 'Create Coupens',
      }
    ]
  },
  {
    routerLink: 'pages',
    icon: 'fal fa-file',
    label: 'Pages'
  },
  {
    routerLink: 'medita',
    icon: 'fal fa-camera',
    label: 'Media'
  },
  {
    routerLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings'
  }
]