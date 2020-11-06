import {Component} from '@angular/core';
import {state, style, trigger} from '@angular/animations';
import {BreadcrumbService} from '../app.breadcrumb.service';

@Component({
    selector: 'app-help',
    templateUrl: './app.help.component.html',
    animations: [
        trigger('tabContent', [
            state('basic', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('license', style({
                transform: 'translate3d(-100%, 0, 0)'
            })),
            state('framework', style({
                transform: 'translate3d(-200%, 0, 0)'
            }))
        ])
    ]
})
export class AppHelpComponent {
    text: any;

    filteredText: any[];

    activeTab = 'basic';

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Help Page', routerLink: ['/pages/help'] }
        ]);
    }

    filterText(event) {
        const query = event.query;
        this.filteredText = [];

        for (let i = 0; i < 10; i++) {
            this.filteredText.push(query + i);
        }
    }

    selectTab(tab) {
        this.activeTab = tab;
    }
}
