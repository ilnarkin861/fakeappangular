import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import { Todo } from "../../models/todo";
import { TodoService } from "../../services/todo.service";
import {TodoForm} from "../../forms/todo-form";



@Component({
    selector: 'app-account-todos',
    templateUrl: './account-todos.component.html'
})
export class AccountTodosComponent implements OnInit {
	
	todos!: Todo [];
	private todosLimit: number = 5;
	todoForm: FormGroup = new TodoForm().form;
	loadButtonClicked: boolean = false;
	private completed: any;
	hasNextPage: boolean = false;
	messages: string [] = [];
	success: boolean = false;
	

  	constructor(private todoService: TodoService) { }


  	ngOnInit(): void { this.getTodos(); }
	
	
	loadTodos(){
  		
  		if(this.hasNextPage){
  			
  			this.loadButtonClicked = true;
  			
  			this.getTodos();
		}
	}
	
	
	todosFilter(event: any){

  		let selectValue = event.target.value;
  		
  		this.todos.length = 0;
  		
  		switch (selectValue) {
  		
			case 'completed':
				this.completed = true;
				break;
		  
			case 'active':
				this.completed = false;
				break;
				
			default:
				this.completed = null;
				break;
		}
		
		this.getTodos();
	}

	
	addTodo(event: any){
  		
  		this.todoForm.markAllAsTouched();
  		
  		if(this.todoForm.valid){
  			
  			event.submitter.disabled = true;
  			
  			this.todoService.addTodo(this.todoForm.value).subscribe((result: any) => {
					
					this.todos.unshift(result);
					
					event.submitter.disabled = false;
					
					this.todoForm.reset();
					
					this.success = true;
					
					this.messages.push("Todo added successfully");
					
					setTimeout(() => this.messages.length = 0, 3000)
				},
				
				error => {
					this.getErrorMessages(error);
					
					event.submitter.disabled = false;
				}
			);
		}
	}
	
	
	setAsCompleted(event: any, index: number){
  		
  		let todo = this.todos[index];
  		
  		event.target.disabled = true;
  		
  		this.todoService.changeTodoStatus(todo.id).subscribe((result: any) => {

  			todo.completed = result.completed;

  			event.target.disabled = false;
  		},

		error => {

  			this.getErrorMessages(error);

  			event.target.disabled = false;
		});
	}
	
	
	deleteTodo(event: any, id: number, index: number){
		
		if(confirm("Are you sure to delete?")){
			
			event.target.disabled = true;
			
			this.todoService.deleteTodo(id).subscribe((result: any) => {

				this.todos.splice(index, 1);

				alert(result['message']);
			},

			error => {

				this.getErrorMessages(error);

				event.target.disabled = false;
			});
		}
	}

	
	private getTodos(){
  		
  		let offset = this.todos ? this.todos.length : 0;
  		
  		this.todoService.getTodos(offset, this.todosLimit, this.completed).subscribe((result: any) => {

  			if(!this.todos) this.todos = [];

  			result['data'].forEach((v: any) => this.todos.push(v));

  			this.hasNextPage = result['pagination'].hasNextPage;

  			this.loadButtonClicked = false;
		});
	}
	
	
	private getErrorMessages(messages: any){
		
		this.messages.length = 0;
		
		if(Array.isArray(messages['error'].errors)){

			messages['error'].errors.forEach((v: any) => {this.messages.push(v)});
		}

		else this.messages.push(messages['error'].Message);
	}
}
