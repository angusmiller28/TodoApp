import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {
  id = '';
  title = '';
  public todo: Todos;
  //public model: Todo;
  public baseUrl: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient) { 
    
    this.id = this.route.snapshot.params.id;
    this.baseUrl = environment.APIBaseURL;

    http.get(this.baseUrl + 'api/todos/' + this.id).subscribe(result => {
      this.todo = result as Todos;
      console.log(this.todo);
    }, error => console.error(error));

    // this.todo = this.todos.findIndex[0];
    // console.log("Update: " + this.todo);

    //this.model = new Todo(this.todo.id, this.todo.title, this.todo.isDone);
    //console.log("Update: " + this.model);
    //this.model = this.todos.findIndex[0]

    // http.put(baseUrl + 'api/todos/' + this.id).subscribe(result => {
    //   this.todos = result as Todos[];
    //   console.log(this.todos);
    // }, error => console.error(error));
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
    })
    .subscribe(result => {
      this.todo = result as Todos;
      console.log(this.todo);
    }, error => console.error(error));

    this.router.navigate(["/todos/list"]);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.todo); }
}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}