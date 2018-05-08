import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent implements OnInit {
  id = '';
  public todos: Todos[];

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient) {
    const baseUrl: string = environment.APIBaseURL;
    this.id = this.route.snapshot.params.id;

    http.delete(baseUrl + 'api/todos/' + this.id).subscribe(result => {
      this.todos = result as Todos[];
      console.log(this.todos);
    }, error => console.error(error));

    this.router.navigate(["/todos/list"]);
   }

  ngOnInit() {
    
  }

}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
}
