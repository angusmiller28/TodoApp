import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TodosApp';
  public todos: Todos[];

  constructor(private http: HttpClient){
    var baseUrl: string = environment.APIBaseURL;

    http.get(baseUrl + 'api/todos').subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));
  }
}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}
