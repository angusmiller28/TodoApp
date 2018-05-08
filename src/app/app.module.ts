import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';

// Boostrap
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

const appRoutes: Routes = [
  { path: '', component: ListTodoComponent },
  {
    path: 'todos',
    children: [
      { path: 'list', component: ListTodoComponent }, //  /list
      { path: 'view/:id', component: ViewTodoComponent }, //  /list
      { path: 'add', component: AddTodoComponent }, //  /add
      { path: 'update/:id', component: UpdateTodoComponent }, //  /update
      { path: 'delete/:id', component: DeleteTodoComponent }, // /delete
    ]
  },

  { path: '**', component: NotFoundComponent } // Match anything
];

// const appRoutes: Routes = [
//   { path: '', component: TodosComponent },
//   { path: 'todos', component: TodosComponent },
//   { path: 'add', component: AddTodoComponent }, //  /add
//   { path: 'delete/:id', component: DeleteTodoComponent }, // /delete
//   { path: '**', component: NotFoundComponent } // Match anything
// ];

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    ListTodoComponent,
    DeleteTodoComponent,
    NotFoundComponent,
    ListTodoComponent,
    UpdateTodoComponent,
    ViewTodoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

