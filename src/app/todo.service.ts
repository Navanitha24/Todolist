import { Injectable } from '@angular/core';


export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[] = [];

  constructor() {
    this.loadTodos();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string, description: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    this.todos.push(newTodo);
    this.saveTodos();
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.saveTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  toggleCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadTodos(): void {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.todos = JSON.parse(todos);
    }
  }
}
