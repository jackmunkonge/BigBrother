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
