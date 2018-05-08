import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title = '';
  public todo: Todos;
  public result: JSON;

  //public model: Todo;
  public baseUrl: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient) { 
    this.baseUrl = environment.APIBaseURL;

    this.todo = JSON.parse('{"title":"","isDone":false}') as Todos;
    
    console.log(this.todo);
   

    //this.todo = result as Todos;
  }

  ngOnInit() {
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
    console.log("Clicked update!");

    // process form data
    console.log(this.todo);

    // put request to api
    this.http
    .post(this.baseUrl + 'api/todos', this.todo)
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
  title: string;
  isDone: boolean;
}

