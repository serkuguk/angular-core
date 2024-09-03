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
        routerLink: 'basic-examples/buttons',
        label: 'BUTTONS',
      },
      {
        routerLink: 'basic-examples/selects',
        label: 'DROPDOWNS',
      },
      {
        routerLink: 'basic-examples/selects',
        label: 'CHARTS',
      },
      {
        routerLink: 'basic-examples/selects',
        label: 'FORMS',
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
        routerLink: 'coupons/crate',
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
    routerLink: 'medita',
    icon: 'fal fa-camera',
    label: 'MEDIA'
  },
  {
    routerLink: 'settings',
    icon: 'fal fa-cog',
    label: 'SETTINGS',
    items: [
      {
        routerLink: 'settings/lever1.1',
        label: 'SETTINGS_LEVEL_1.1',
        items: [
            {
              routerLink: 'settings/lever2.1',
              label: 'SETTINGS_LEVEL_ONE_2.1',
            },
            {
              routerLink: 'settings/lever2.1',
              label: 'SETTINGS_LEVEL_TWO_2.1',
              items: [
                {
                  routerLink: 'settings/lever2.2',
                  label: 'SETTINGS_LEVEL_2.2',
                },
                {
                  routerLink: 'settings/lever2.3',
                  label: 'SETTINGS_LEVEL_2.3',
                }
               ]
            }
        ]
      }
    ]
  }
]
