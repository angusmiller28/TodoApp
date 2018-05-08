import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {
  public data:any=[]
  public todos: Todos[];
  public todo: Todos;
  public token: Token;
  public tokenValue: string;
  public baseUrl: string;
  
  constructor(private router:Router, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    this.baseUrl = environment.APIBaseURL;

     // get session token
     this.token = this.getFromSession("token") as Token;
     this.tokenValue = "Bearer " + this.token["token"];
     console.log(this.tokenValue);
    

    http.get(this.baseUrl + 'api/todos', {
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    }).subscribe(result => {
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
    console.log(id);

    // delete request to api
    this.http.delete(this.baseUrl + 'api/todos/' + id, {
      params: new HttpParams().set('id', id),
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    }).subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));

    this.router.navigate(["/todos/list"]);
  };
  
  getFromSession(key): Token {
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);

    return this.data;
}

}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}

interface Token {
  code: string;
}