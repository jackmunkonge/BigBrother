import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { AppMainComponent } from './app.main.component';

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-menuitem]',
    /* tslint:enable:component-selector */
    template: `
        <ng-container>
            <div *ngIf="root">
                <span class="layout-menuitem-text">{{item.label}}</span>
            </div>
            <a [attr.href]="item.url" (click)="itemClick($event)" *ngIf="!item.routerLink || item.items"
               (mouseenter)="onMouseEnter()" (keydown.enter)="itemClick($event)" pRipple
               [attr.target]="item.target" [attr.tabindex]="!visible ? '-1' : 0">
                <i class="layout-menuitem-icon" [ngClass]="item.icon"></i>
                <span class="layout-menuitem-text">{{item.label}}</span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
                <span class="menuitem-badge" *ngIf="item.badge">{{item.badge}}</span>
            </a>
            <a (click)="itemClick($event)" (mouseenter)="onMouseEnter()" *ngIf="item.routerLink && !item.items"
               [routerLink]="item.routerLink" routerLinkActive="active-route" pRipple
               [routerLinkActiveOptions]="{exact: true}" [attr.target]="item.target" [attr.tabindex]="!visible ? '-1' : 0">
                <i class="layout-menuitem-icon" [ngClass]="item.icon"></i>
                <span class="layout-menuitem-text">{{item.label}}</span>
                <i class="pi pi-fw pi-angle-down layout-submenu-toggler" *ngIf="item.items"></i>
                <span class="menuitem-badge" *ngIf="item.badge">{{item.badge}}</span>
            </a>
            <div class="layout-menu-tooltip">
                <div class="layout-menu-tooltip-arrow"></div>
                <div class="layout-menu-tooltip-text">{{item.label}}</div>
            </div>
            <ul *ngIf="item.items || (active || animating)" (@children.done)="onAnimationDone()"
                [@children]="(app.isSlim()||app.isHorizontal())&&app.isDesktop()&&root ? active ?
                    'visible' : 'hidden' : active ? 'visibleAnimated' :
                    app.grouped && root ? 'visibleAnimated': root ? 'visibleAnimated' : 'hiddenAnimated'">
                <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                    <li app-menuitem *ngIf="child.visible!==false" [item]="child" [visible]="active"
                        [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
                </ng-template>
            </ul>
        </ng-container>
    `,
    host: {
        '[class.active-menuitem]': 'active',
        '[class.layout-root-menuitem]': 'root',
    },
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px'
            })),
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    @Input() root: boolean;

    @Input() visible: boolean;

    @Input() parentKey: string;

    animating: boolean;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string;

    constructor(public app: AppMainComponent, public router: Router, private cd: ChangeDetectorRef, private menuService: MenuService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.app.isHorizontal()) {
                    this.active = false;
                } else {
                    if (this.item.routerLink) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
            });
    }

    ngOnInit() {
        if (!this.app.isHorizontal() && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], this.item.items ? false : true);
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return true;
        }

        // navigate with hover in horizontal mode
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
            this.animating = true;
        } else {
            // activate item
            this.active = true;

            // hide overlay menus
            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;

            // reset horizontal menu
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.menuService.reset();
            }
        }
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim()) && this.app.isDesktop()) {
            this.menuService.onMenuStateChange(this.key);
            this.active = true;
        }
    }

    onAnimationDone() {
        this.animating = false;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}
