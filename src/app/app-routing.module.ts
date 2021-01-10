import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TextMessagesComponent } from './pages/text-messages/text-messages.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { WhatsAppComponent } from './pages/whatsapp/whatsapp.component';
import { EventsComponent } from './pages/events/events.component';
import { BlockApplicationsComponent } from './pages/block-applications/block-applications.component';
import { BlockCallsComponent } from './pages/block-calls/block-calls.component';
import { CallsComponent } from './pages/calls/calls.component';
import { GpsComponent } from './pages/gps/gps.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    {path: 'general/contacts', component: ContactsComponent},
                    {path: 'general/text-messages', component: TextMessagesComponent},
                    {path: 'general/calls', component: CallsComponent},
                    {path: 'general/events', component: EventsComponent},
                    {path: 'general/photos', component: PhotosComponent},
                    {path: 'general/profile', component: ProfileComponent},
                    {path: 'general/settings', component: SettingsComponent},
                    {path: 'locations/gps', component: GpsComponent},
                    {path: 'socials/whatsapp', component: WhatsAppComponent},
                    {path: 'restricted/block-applications', component: BlockApplicationsComponent},
                    {path: 'restricted/block-calls', component: BlockCallsComponent},
                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
