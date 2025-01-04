import { Component } from '@angular/core';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  editTodoId: number | null = null;
  errorMessage: string = '';

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }
    if (!this.newTodoDescription.trim()) {
      this.errorMessage = 'Description is required.';
      return;
    }

    this.todoService.addTodo(this.newTodoTitle, this.newTodoDescription);
    this.newTodoTitle = '';
    this.newTodoDescription = '';
    this.errorMessage = '';
    this.loadTodos();
  }

  editTodo(todo: Todo): void {
    this.editTodoId = todo.id;
    this.newTodoTitle = todo.title;
    this.newTodoDescription = todo.description;
    this.errorMessage = '';
  }

  updateTodo(): void {
    if (this.editTodoId !== null) {
      const updatedTodo: Todo = {
        id: this.editTodoId,
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        completed: this.todos.find(todo => todo.id === this.editTodoId)!.completed
      };

      this.todoService.updateTodo(updatedTodo);
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.editTodoId = null;
      this.loadTodos();
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  toggleCompletion(todo: Todo): void {
    this.todoService.toggleCompletion(todo);
    this.loadTodos();
  }
}
