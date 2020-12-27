import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of (app.grouped ? modelGrouped : modelUngrouped); let i = index;"
                [item]="item" [index]="i" [visible]="true" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    modelGrouped: any[];

    modelUngrouped: any[];

    constructor(public app: AppMainComponent) {
    }

    ngOnInit() {
        this.modelGrouped = [
            {
                label: 'Home Page', materialIcon: 'home',
                items: [
                    {label: 'Dashboard', materialIcon: 'home', routerLink: ['/']}
                ]
            },
            {
              label: 'General', icon: 'pi pi-fw pi-th-large',
              items: [
                {label: 'Contacts', materialIcon: 'contacts', routerLink: ['/general/contacts']},
                {label: 'Text Messages', materialIcon: 'chat', routerLink: ['/general/text-messages']},
                {label: 'Calls', materialIcon: 'call', routerLink: ['/general/calls']},
                {label: 'Events', materialIcon: 'event', routerLink: ['/general/events']},
                {label: 'Photos', materialIcon: 'image', routerLink: ['/general/photos']},
                {label: 'Videos', materialIcon: 'videocam'},
                {label: 'Wi-Fi Networks', materialIcon: 'wifi'},
                {label: 'Keyword Tracking', materialIcon: 'format_shapes'},
                {label: 'Logger', materialIcon: 'keyboard'},
                {label: 'Installed Apps', materialIcon: 'apps'}
              ]
            },
            {
              label: 'Locations', icon: 'pi pi-fw pi-compass',
              items: [
                {label: 'GPS Locations', materialIcon: 'gps_fixed', routerLink: ['/locations/gps']},
                {label: 'Geofencing', materialIcon: 'track_changes'}
              ]
            },
            {
              label: 'Social Networks', icon: 'pi pi-fw pi-users',
              items: [
                {label: 'WhatsApp', socialIcon: 'icon-whatsapp', routerLink: ['/socials/whatsapp']},
                {label: 'KiK', socialIcon: 'icon-kik'},
                {label: 'Telegram', socialIcon: 'icon-telegram'},
                {label: 'Tinder', socialIcon: 'icon-tinder'},
                {label: 'Snapchat', socialIcon: 'icon-snapchat'},
                {label: 'Google Hangouts', socialIcon: 'icon-hangouts'},
                {label: 'Skype', socialIcon: 'icon-skype'},
                {label: 'Instagram', socialIcon: 'icon-instagram'},
                {label: 'Facebook', socialIcon: 'icon-facebook'}
              ]
            },
            {
              label: 'Internet Usage', icon: 'pi pi-fw pi-wifi',
              items: [
                {label: 'Browser History', materialIcon: 'history'},
                {label: 'Browser Bookmarks', materialIcon: 'bookmark'},
                {label: 'Email', materialIcon: 'email'}
              ]
            },
            {
              label: 'Restricted', icon: 'pi pi-fw pi-times-circle',
              items: [
                {label: 'Block Calls', materialIcon: 'phone_disabled', routerLink: ['/restricted/block-calls']},
                {label: 'Block Wifi', materialIcon: 'wifi_off'},
                {label: 'Block Websites', materialIcon: 'browser_not_supported'},
                {label: 'Block Applications', materialIcon: 'app_blocking', routerLink: ['/restricted/block-applications']}
              ]
            },
            {
                label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
            {
                label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
                items: [
                    {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
                    {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
                    {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
                    {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
                    {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
                    {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
                    {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
                    {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
                    {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                    {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
                    {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
                    {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
                    {label: 'Wizard', icon: 'pi pi-fw pi-star', routerLink: ['/wizard']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Get Started', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
                    },
                    {
                        label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
                    }
                ]
            }
        ];

        this.modelUngrouped = [
            {
                label: 'Main Menu',
                icon: 'pi pi-fw pi-home',
                items: this.modelGrouped
            }
        ];
    }
}
