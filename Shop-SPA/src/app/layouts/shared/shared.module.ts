import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../_services/language.service';

@NgModule({
  declarations: [TopbarComponent, FooterComponent, SidebarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    NgbDropdownModule,
    ClickOutsideModule,
    RouterModule
  ],
  exports: [TopbarComponent, FooterComponent, SidebarComponent],
  providers: [LanguageService]
})
export class SharedModule { }
