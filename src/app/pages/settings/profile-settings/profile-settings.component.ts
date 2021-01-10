import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Profile } from '../../../models/profile';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProfileSettingsComponent implements OnInit {

  profileDialog: boolean;
  profile: Profile = {
    id: '1',
    firstName: '',
    lastName: '',
    relationship: '',
    profileUrl: ''
  };

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private profileService: ProfileService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.profileService.getProfile()
      .then(data => {
        if (data) {
          this.profile = data;
        } else {
          this.profile = {
            id: '1',
            firstName: '',
            lastName: '',
            relationship: '',
            profileUrl: ''
          }
        }
      });

    this.cols = [
      {field: 'firstName', header: 'First Name'},
      {field: 'lastName', header: 'Last Name'},
      {field: 'relationship', header: 'Relationship'},
      {field: 'profileUrl', header: 'Profile Url'}
    ];

  }

  editProfile(profile: Profile) {
    this.profile = {...profile};
    this.profileDialog = true;
  }

  hideDialog() {
    this.profileDialog = false;
    this.submitted = false;
  }

  saveProfile() {
    this.submitted = true;

    if (this.profile) {
      this.dbService.getDatabase('profile').update({ id: '1' }, this.profile, { upsert: true });
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Profile Updated', life: 3000});
      this.profileDialog = false;
    }
  }

}
