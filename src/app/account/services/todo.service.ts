import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";



@Injectable({
  	providedIn: 'root'
})
export class TodoService {
	
	private apiUrl: string = environment.apiUrl;
	

  	constructor(private httpClient: HttpClient) { }
	
	
	getTodos(offset: number, limit: number, completed: boolean | undefined | null){
  		
  		let url = `${this.apiUrl}/todos?offset=${offset}&limit=${limit}`;
  		
  		if (typeof completed === "boolean") url = `${url}&completed=${completed}`;

  		return this.httpClient.get(url);
	}
	
	
	addTodo(data: any){
  		return this.httpClient.post(`${this.apiUrl}/todos/add`, data);
	}
	
	
	changeTodoStatus(id: number){
  		return this.httpClient.put(`${this.apiUrl}/todos/change-status`, { todoId: id });
	}
	
	deleteTodo(id: number){
  		return this.httpClient.delete(`${this.apiUrl}/todos/delete/${id}`);
	}
}
