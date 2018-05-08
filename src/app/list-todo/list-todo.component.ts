import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {

  public todos: Todos[];
  public todo: Todos;
  public baseUrl: string;

  constructor(private router:Router, private http: HttpClient) {
    this.baseUrl = environment.APIBaseURL;

    http.get(this.baseUrl + 'api/todos').subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  submitted = false;

 
  onDelete(id: string) { 
    this.submitted = true; 
    console.log("Clicked delete!");
    
    // get todo
    // this.http.get(this.baseUrl + 'api/todos').subscribe(result => {
    //   this.todo = result as Todos;
    //   console.log(this.todos);
    // }, error => console.error(error));

    // process form data
    console.log(this.todo);

    // delete request to api
    this.http.delete(this.baseUrl + 'api/todos/' + id, {
      params: new HttpParams().set('id', id),
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
    }).subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));

    this.router.navigate(["/todos/list"]);
  };
  

}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}