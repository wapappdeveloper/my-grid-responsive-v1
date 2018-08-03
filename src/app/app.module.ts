import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { InfoComponent } from './info/info.component';
import { DetailComponent } from './detail/detail.component';
import { DatapersistanceService } from './services/datapersistance.service';
import { FooterComponent } from './footer/footer.component';
import { ToolsComponent } from './tools/tools.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    InfoComponent,
    DetailComponent,
    FooterComponent,
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CommonService, DatapersistanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
