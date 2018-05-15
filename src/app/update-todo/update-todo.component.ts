import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {
  id = '';
  title = '';
  public data:any=[]
  public todo: Todos;
  public notification: Notification;
  public token: Token;
  public tokenValue: string;
  public baseUrl: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
    
    this.id = this.route.snapshot.params.id;
    this.baseUrl = environment.APIBaseURL;

    // get session token
    this.token = this.getFromSession("token") as Token;
    this.tokenValue = "Bearer " + this.token["token"];
    this.notification = JSON.parse('{"message":"", "error":"false"}') as Notification;

    http.get(this.baseUrl + 'api/todos/' + this.id,{
      params: new HttpParams().set('id', this.id),
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    }).subscribe(result => {
      this.todo = result as Todos;
      console.log(this.todo);
    }, error => 
    {
      this.router.navigate(['login']);
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
    console.log("Clicked update!");

    // process form data
    console.log(this.todo);

    // put request to api
    this.http
    .put(this.baseUrl + 'api/todos/' + this.id, this.todo, {
      params: new HttpParams().set('id', this.id),
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    })
    .subscribe(result => {
      this.todo = result as Todos;
      console.log(this.todo);
    }, error => {
      if(error.status == 400) // Unauthorized
      {
        this.notification = JSON.parse('{"message":"Bummer! We could not verify you. Did you give the right credentials?", "error":"true"}') as Notification;
      }
      setTimeout(() => 
      {
        this.router.navigate(["/login"]);
      },
      5000);
    });

    this.router.navigate(["/todos/list"]);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.todo); }

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

interface Notification {
  message: string;
  error: boolean;
}