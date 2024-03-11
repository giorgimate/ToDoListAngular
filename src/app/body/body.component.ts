import { Component, OnInit } from '@angular/core';
import { Services } from '../Services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
constructor(public services:Services){
  
}



ngOnInit(){
}

deleteTask(id:any){
  this.services.DeleteToDo(id).subscribe((result:any)=>{
    if(result.statusCode == 200){
      Swal.fire({
        title: "ტასკი წაიშალა",
        icon: "success",
        timer: 2000
      });
      this.services.GetToDo()
    }
    else{
      Swal.fire({
        title: "მოხდა შეცდომა",
        icon: "error",
        timer: 2000
      });
    }
  })
}
}

