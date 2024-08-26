import { INavbarData } from "./interfaces/nav-bar-data.interface";

export const navabarData: INavbarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard'
  },
  {
    routerLink: 'basic-example',
    icon: 'fal fa-box-open',
    label: 'Examples'
  },
  {
    routerLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'Statistics'
  },
  {
    routerLink: 'coupens',
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
    label: 'Settings',
    items: [
      {
        routerLink: 'settings/lever1.1',
        label: 'Level 1.1',
        items: [
                {
                  routerLink: 'settings/lever2.1',
                  label: 'Level 2.1',
                },
                {
                  routerLink: 'settings/lever2.1',
                  label: 'Level 2.1',
                  items: [
                    {
                      routerLink: 'settings/lever2.2',
                      label: 'Level 2.2',
                    },
                    {
                      routerLink: 'settings/lever2.3',
                      label: 'Level 2.3',
                    }
                   ]
                }
               ]
      }
    ]
  }
]
