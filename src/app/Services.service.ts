import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
interface ToDoModel{
    id?:number;
    isFinished:boolean|undefined;
    name:string|undefined;
}

@Injectable({providedIn : "root"})
export class Services{
    todosnotfinished:ToDoModel[] = []
    todosfinished:ToDoModel[] = []
constructor(private http:HttpClient){
    
}
public iseditSub = new BehaviorSubject<any>(false);
public iseditValue$ = this.iseditSub.asObservable();

isedit: boolean = false;
edititem: ToDoModel = {
id: 0,
isFinished: undefined,
name: undefined
};

statusedit(item: ToDoModel) {

if (this.isedit) {
if (item.id === this.edititem?.id) {
// If the clicked item is the same as the currently edited item, toggle isedit to false
this.isedit = !this.isedit;
this.edititem = {
id: 0,
isFinished: undefined,
name: undefined
};
} else {
// If a different item is clicked, update edititem
this.edititem = item;
this.iseditable(true);
}
} else {
// If isedit is false, set it to true and update edititem
this.isedit = true;
this.edititem = item;
this.iseditable(true);
}
if(this.isedit == false){
  this.iseditable(false)
}
}
GetToDo(){
  this.http.get("prod/api/Task").subscribe((result:any) => {
        this.todosfinished=result.filter((todo:ToDoModel)=>{
            if(todo.isFinished){
              return todo
            }
            return null
        })
        this.todosnotfinished=result.filter((todo:ToDoModel)=>{
          if(!todo.isFinished){
            return todo
          }
          return null
      })

  })
}
AddToDo(params:ToDoModel){
 return this.http.post("prod/api/Task/save",params)
}
UpdateToDo(params:any){
 return this.http.put("prod/api/Task/update",params)
}
DeleteToDo(id:any){
    return this.http.delete(`prod/api/Task/delete?id=${id}`)
}




  iseditable(edit:boolean) {
    this.iseditSub.next(edit);
    
    }


}
