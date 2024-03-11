import { Component } from '@angular/core';
import { Services } from './Services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public service:Services ){
    
  }
  onGetToDoes(){
    this.service.GetToDo()
  }
  ngOnInit(){
    this.onGetToDoes()
  }
  title = 'ToDoList';
}
