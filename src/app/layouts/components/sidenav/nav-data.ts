import { INavbarData } from "./interfaces/nav-bar-data.interface";

export const navabarData: INavbarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'DASHBOARD'
  },
  {
    routerLink: 'basic-examples',
    icon: 'fal fa-box-open',
    label: 'EXAMPLES',
    items: [
      {
        routerLink: 'basic-examples/tables',
        label: 'TABLES',
      },
      {
        routerLink: 'basic-examples/button',
        label: 'BUTTONS',
      },
      {
        routerLink: 'basic-examples/selects',
        label: 'DROPDOWNS',
      },
      {
        routerLink: 'basic-examples/charts',
        label: 'CHARTS',
      },
      {
        routerLink: 'basic-examples/forms',
        label: 'FORMS',
      },
      {
        routerLink: 'basic-examples/stepper',
        label: 'STEPPER',
      },
      {
        routerLink: 'basic-examples/calendar',
        label: 'CALENDAR',
      }
    ]
  },
  {
    routerLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'STATISTIC'
  },
  {
    routerLink: 'coupons',
    icon: 'fal fa-tags',
    label: 'COUPONS',
    items: [
      {
        routerLink: 'coupons/list',
        label: 'LIST_COUPONS',
      },
      {
        routerLink: 'coupons/create',
        label: 'CREATE_COUPONS',
      }
    ]
  },
  {
    routerLink: 'pages',
    icon: 'fal fa-file',
    label: 'PAGES'
  },
  {
    routerLink: 'media',
    icon: 'fal fa-camera',
    label: 'MEDIA'
  },
  {
    routerLink: 'settings',
    icon: 'fal fa-cog',
    label: 'SETTINGS',
    items: [
      {
        routerLink: 'settings/level1.1',
        label: 'SETTINGS_LEVEL_1.1',
        items: [
            {
              routerLink: 'settings/level2.1',
              label: 'SETTINGS_LEVEL_ONE_2.1',
            },
            {
              routerLink: 'settings/level2.1',
              label: 'SETTINGS_LEVEL_TWO_2.1',
              items: [
                {
                  routerLink: 'settings/level2.2',
                  label: 'SETTINGS_LEVEL_2.2',
                },
                {
                  routerLink: 'settings/level2.3',
                  label: 'SETTINGS_LEVEL_2.3',
                }
               ]
            }
        ]
      }
    ]
  }
]
