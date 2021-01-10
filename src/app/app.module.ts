import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { CoreModule } from './core/core.module';

// PrimeNG Components for demos
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

// Application Components
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppMenuComponent} from './app.menu.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppProfileComponent} from './app.profile.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppConfigComponent} from './app.config.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';

// Demo pages
import {AppCodeModule} from './app.code.component';
import {AppNotfoundComponent} from './pages/not-found/app.notfound.component';

// Services
import {EventService} from './services/eventservice';
import {PhotoService} from './services/photoservice';

// Application services
import {BreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';
import { ContactsService } from './services/contacts.service';
import { TextMessagesComponent } from './pages/text-messages/text-messages.component';
import { TextMessagesService } from './services/text-messages.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { MessageListComponent } from './shared/message-list/message-list.component';
import { ChatComponent } from './shared/chat/chat.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { WhatsAppComponent } from './pages/whatsapp/whatsapp.component';
import { EventsComponent } from './pages/events/events.component';
import { BlockApplicationsComponent } from './pages/block-applications/block-applications.component';
import { AppService } from './services/app.service';
import { BlockCallsComponent } from './pages/block-calls/block-calls.component';
import { CallService } from './services/call.service';
import { CallsComponent } from './pages/calls/calls.component';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { GpsComponent } from './pages/gps/gps.component';
import { GpsService } from './services/gps.service';
import { HereMapComponent } from './shared/map/map.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DatabaseService } from './services/database.service';
import { ContactSettingsComponent } from './pages/settings/contact-settings/contact-settings.component';
import { TextMessageSettingsComponent } from './pages/settings/text-message-settings/text-message-settings.component';
import { CallSettingsComponent } from './pages/settings/call-settings/call-settings.component';
import { EventsSettingsComponent } from './pages/settings/events-settings/events-settings.component';
import { PhotoSettingsComponent } from './pages/settings/photo-settings/photo-settings.component';
import { WhatsappSettingsComponent } from './pages/settings/whatsapp-settings/whatsapp-settings.component';
import { WhatsappService } from './services/whatsapp.service';
import { GpsSettingsComponent } from './pages/settings/gps-settings/gps-settings.component';
import { BlockedCallsSettingsComponent } from './pages/settings/blocked-calls-settings/blocked-calls-settings.component';
import { BlockedNumberService } from './services/blocked-number.service';
import { BlockedAppSettingsComponent } from './pages/settings/blocked-app-settings/blocked-app-settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SidebarModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    AppCodeModule,
    NgxAudioPlayerModule,
  ],
  declarations: [
    AppComponent,
    ContactsComponent,
    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppProfileComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppConfigComponent,
    AppBreadcrumbComponent,
    AppNotfoundComponent,
    TextMessagesComponent,
    EllipsisPipe,
    MessageListComponent,
    ChatComponent,
    GalleryComponent,
    PhotosComponent,
    WhatsAppComponent,
    EventsComponent,
    BlockApplicationsComponent,
    BlockCallsComponent,
    CallsComponent,
    GpsComponent,
    HereMapComponent,
    SettingsComponent,
    ContactSettingsComponent,
    TextMessageSettingsComponent,
    CallSettingsComponent,
    EventsSettingsComponent,
    PhotoSettingsComponent,
    WhatsappSettingsComponent,
    GpsSettingsComponent,
    BlockedCallsSettingsComponent,
    BlockedAppSettingsComponent,
    DashboardComponent,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    EventService, PhotoService, MenuService, BreadcrumbService, ContactsService,
    TextMessagesService, AppService, CallService, GpsService, DatabaseService,
    WhatsappService, BlockedNumberService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
