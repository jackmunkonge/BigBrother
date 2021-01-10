import { Component, OnInit } from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {AppMainComponent} from './app.main.component';
import { ProfileService } from './services/profile.service';
import { Profile } from './models/profile';

@Component({
    selector: 'app-inline-profile',
    templateUrl: './app.profile.component.html',
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px',
                paddingBottom: '0px'
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
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent implements OnInit {

    active: boolean;
    profile: Profile;

    constructor(public app: AppMainComponent, private profileService: ProfileService) { }

    ngOnInit() {
      this.profileService.getProfile()
        .then(profile => {
          this.profile = profile;
        });
    }

  onClick(event) {
        this.app.onInlineMenuClick(event);
        event.preventDefault();
    }
}
