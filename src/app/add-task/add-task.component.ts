import { Component } from '@angular/core';
import { Services } from '../Services.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  todoFG:FormGroup= new FormGroup({nameControl:new FormControl("",Validators.required),statuscontrol:new FormControl("",Validators.required)})
  constructor(public services:Services){

  }
  statusoptions:any = [{label:"მიმდინარე სტატუსი", value:false, color:"yellow-text"}, {label:"დასრულებული სტატუსი", value:true,color:"green-text"}]
 
ngOnInit(){
  this.patchvalue()
}
dropdownChange(e:any){
console.log(e)
}
patchvalue(){
  this.services.iseditValue$.subscribe((edit:boolean)=>{
    if(edit){
      this.todoFG.patchValue({nameControl:this.services.edititem?.name,statuscontrol:this.services.edititem?.isFinished ? this.statusoptions[1].value : this.statusoptions[0].value})
    }
    else{
      this.todoFG.reset()
      console.log(edit)
      console.log(this.todoFG.value)
    }
  })
}
getstatusvalue(id:string){
console.log(id)
}
addorupdatetask(){
  let params = {
    name:this.todoFG.value.nameControl,
    isFinished:this.todoFG.value.statuscontrol,
  }
 


  if(this.todoFG.valid){
    if(this.services.isedit){
     let updateparams={...params,id:this.services.edititem.id}
      this.services.UpdateToDo(updateparams).subscribe((result:any)=>{
        if(result.statusCode == 200){
          this.todoFG.reset()
          this.services.GetToDo()
          this.services.isedit = false

          Swal.fire({
            title: "ტასკი წარმატებით შეიცვალა",
            icon: "success",
            timer: 2000
          });
          this.services.edititem = {
            id:0,
            isFinished:undefined,
            name:""
          }
           }
      })
    }
    else{
      this.services.AddToDo(params).subscribe((result:any)=>{
  
        if(result.statusCode == 200){
          this.todoFG.reset()
          this.services.GetToDo()
          Swal.fire({
            title: "ტასკი წარმატებით დაემატა",
            icon: "success",
            timer: 2000
          });
           }
      })
    }
  }
  else{
    Swal.fire({
      title: "სახელი ან სტატუსი ცარიელია",
      icon: "error",
      timer: 2000
    });
  }
}
}
