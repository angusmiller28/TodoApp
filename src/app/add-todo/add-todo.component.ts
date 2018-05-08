import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title = '';
  public data:any=[]
  public todo: Todos;
  public result: JSON;
  public token: Token;
  public tokenValue: string;

  //public model: Todo;
  public baseUrl: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
    this.baseUrl = environment.APIBaseURL;

    this.todo = JSON.parse('{"title":"","isDone":false}') as Todos;
    
    console.log(this.todo);

  }

  ngOnInit() {
  }

  getFromSession(key): Token {
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);

    return this.data;
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 

    // get session token
    this.token = this.getFromSession("token") as Token;
    this.tokenValue = "Bearer " + this.token["token"];

    // put request to api
    this.http
    .post(this.baseUrl + 'api/todos', this.todo, 
    {
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    })
    .subscribe(result => {
      this.todo = result as Todos;
    }, error => console.error(error));

    this.router.navigate(["/todos/list"]);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.todo); }
}

interface Todos {
  title: string;
  isDone: boolean;
}

interface Token {
  code: string;
}