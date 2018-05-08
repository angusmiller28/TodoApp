import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent implements OnInit {
  id = '';
  public data:any=[]
  public todos: Todos[];
  public token: Token;
  public tokenValue: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    const baseUrl: string = environment.APIBaseURL;
    this.id = this.route.snapshot.params.id;

    // get session token
    this.token = this.getFromSession("token") as Token;
    this.tokenValue = "Bearer " + this.token["token"];
    console.log(this.tokenValue);

    http.delete(baseUrl + 'api/todos/' + this.id, {
      params: new HttpParams().set('id', this.id),
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    }).subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));

    this.router.navigate(["/todos/list"]);
   }

  ngOnInit() {
    
  }

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