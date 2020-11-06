import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" [ngClass]="{'layout-config-active': app.configActive}" (click)="app.onConfigClick($event)">
            <h5>Input Style</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                <label for="inputStyle1">Outlined</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                <label for="inputStyle2">Filled</label>
            </div>

            <h5>Ripple Effect</h5>
            <p-inputSwitch [ngModel]="app.ripple" (onChange)="app.onRippleChange($event)"></p-inputSwitch>

            <h5>Menu Mode</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="menuMode" value="static" [(ngModel)]="app.layoutMode" inputId="mode1"></p-radioButton>
                <label for="mode1">Static</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="menuMode" value="overlay" [(ngModel)]="app.layoutMode" inputId="mode2"></p-radioButton>
                <label for="mode2">Overlay</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="menuMode" value="horizontal" [(ngModel)]="app.layoutMode" inputId="mode3" (onClick)="app.profileMode = 'popup'"></p-radioButton>
                <label for="mode3">Horizontal</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="menuMode" value="slim" [(ngModel)]="app.layoutMode" inputId="mode4"></p-radioButton>
                <label for="mode4">Slim</label>
            </div>

            <h5>Menu Type</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="grouped" [value]="true" [(ngModel)]="app.grouped" inputId="grouped1"></p-radioButton>
                <label for="grouped1">Grouped</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="grouped" [value]="false" [(ngModel)]="app.grouped" inputId="grouped2"></p-radioButton>
                <label for="grouped2">Ungrouped</label>
            </div>

            <h5>Menu Colors</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="darkMenu" [value]="true" [(ngModel)]="app.darkMenu" inputId="darkMenu1"></p-radioButton>
                <label for="darkMenu1">Dark</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="darkMenu" [value]="false" [(ngModel)]="app.darkMenu" inputId="darkMenu2"></p-radioButton>
                <label for="darkMenu2">Light</label>
            </div>

            <h5>User Profile</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="profileMode" value="inline" [(ngModel)]="app.profileMode" [disabled]="app.isHorizontal()" inputId="profileMode1"></p-radioButton>
                <label for="profileMode1">Inline</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="profileMode" value="popup" [(ngModel)]="app.profileMode" [disabled]="app.isHorizontal()" inputId="profileMode2"></p-radioButton>
                <label for="profileMode2">Popup</label>
            </div>

            <h5>Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let theme of componentThemes">
                    <a style="cursor: pointer" (click)="changeTheme(theme.file)" [ngStyle]="{'background-color': theme.color}">
                        <i class="pi pi-check" *ngIf="themeColor === theme.file"></i>
                    </a>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    componentThemes: any;

    themeColor = 'blue';

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.componentThemes = [
            {name: 'Amber Accent', file: 'amber', color: '#FFC107'},
            {name: 'Blue Accent', file: 'blue', color: '#2196F3'},
            {name: 'Blue Gray Accent', file: 'bluegray', color: '#607D8B'},
            {name: 'Brown Accent', file: 'brown', color: '#795548'},
            {name: 'Cyan Accent', file: 'cyan', color: '#00BCD4'},
            {name: 'Deep Orange Accent', file: 'deeporange', color: '#FF5722'},
            {name: 'Deep Purple Accent', file: 'deeppurple', color: '#673AB7'},
            {name: 'Green Accent', file: 'green', color: '#4CAF50'},
            {name: 'Indigo Accent', file: 'indigo', color: '#3F51B5'},
            {name: 'Light Blue Accent', file: 'lightblue', color: '#03A9F4'},
            {name: 'Light Green Accent', file: 'lightgreen', color: '#8BC34A'},
            {name: 'Lime Accent', file: 'lime', color: '#CDDC39'},
            {name: 'Orange Accent', file: 'orange', color: '#FF9800'},
            {name: 'Pink Accent', file: 'pink', color: '#E91E63'},
            {name: 'Purple Accent', file: 'purple', color: '#9C27B0'},
            {name: 'Teal Accent', file: 'teal', color: '#00796B'},
            {name: 'Yellow Accent', file: 'yellow', color: '#FFEB3B'},
        ];
    }

    changeTheme(theme: string) {
        this.changeStyleSheetsColor('theme-css', theme, 'theme-');
        this.changeStyleSheetsColor('layout-css', theme, 'layout-');
        this.themeColor = theme;

        const topbarLogo: HTMLImageElement = document.getElementById('layout-topbar-logo') as HTMLImageElement;
        const menuLogo: HTMLImageElement = document.getElementById('layout-menu-logo') as HTMLImageElement;

        if (theme === 'yellow' || theme === 'lime') {
            topbarLogo.src = 'assets/layout/images/logo-black.png';
            menuLogo.src = 'assets/layout/images/logo-black.png';
        } else {
            topbarLogo.src = 'assets/layout/images/logo-white.png';
            menuLogo.src = 'assets/layout/images/logo-white.png';
        }
    }

    changeStyleSheetsColor(id, value, prefix) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + value + '.css' ;
        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event) {
        this.app.configActive = !this.app.configActive;
        this.app.configClick = true;
        event.preventDefault();
    }
}
