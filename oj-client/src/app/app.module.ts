import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ProblemListComponent} from './components/problem-list/problem-list.component';
import {FooterComponent} from './components/footer/footer.component';
import {NewProblemComponent} from './components/new-problem/new-problem.component';
import {ProblemDetailComponent} from './components/problem-detail/problem-detail.component';
import {routing} from './app.routes';
import {FormsModule} from '@angular/forms';
import {DataService} from './services/data.service';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {EditorComponent} from './components/editor/editor.component';
import {CollaborationService} from "./services/collaboration.service";
import {EditProblemComponent} from './components/edit-problem/edit-problem.component';
import { ModifyProblemComponent } from './components/modify-problem/modify-problem.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    FooterComponent,
    NewProblemComponent,
    ProblemDetailComponent,
    HeaderComponent,
    EditorComponent,
    EditProblemComponent,
    ModifyProblemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [DataService, CollaborationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
