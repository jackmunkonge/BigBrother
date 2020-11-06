import {Component} from '@angular/core';
import {BreadcrumbService} from '../app.breadcrumb.service';

@Component({
    templateUrl: './elevation.component.html',
    styles: [`
        .box {
            min-height: 100px;
            min-width: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin: 2rem;
            border-radius: 4px;
        }
    `]
})
export class ElevationComponent {

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Elevation'}
        ]);
    }

    boxes: Array<number> = new Array(24);
}
