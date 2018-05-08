import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {

  public todos: Todos[];

  constructor(private http: HttpClient) {
    const baseUrl: string = environment.APIBaseURL;

    http.get(baseUrl + 'api/todos').subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}