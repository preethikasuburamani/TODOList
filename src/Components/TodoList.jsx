
import "./TodoList.css"
import { useEffect, useState } from 'react'

//localStorage


const TodoList = () => {


    //complet list state
    const[list,setList] = useState(()=>{
        const savedList = localStorage.getItem("todoList");
        return savedList
        ? JSON.parse(savedList)
        : 
        [
        {id:1,lable:"HTML",checked:true},
        {id:2,lable:"SQL",checked:false}

        ]})

    //current list
    const[current,setCurrent]= useState("")

    //update and add button state
    const[updatebtn,SetUpdatebtn] = useState(true)

    //currect update task 
    const[currrentUpdateId,setCurrentUpdateId]= useState(null)

    //pending task state
    let pending = list.filter((item)=>item.checked===false)
    //completed task state
    let completed= list.filter((item)=>item.checked===true)

    //localstorage to set items
    useEffect(() => {
  localStorage.setItem("todoList", JSON.stringify(list));
}, [list]);
  
    //AddTask function
    let AddTask = ()=>{
        if(updatebtn){

            if(current ==""){
            console.log("Enter a valid Task")
            }else{
                setList([...list,{id:list.length+1,lable:current,checked:false}])
                setCurrent("")
            }
 }
        else{

            let updatedList = list.map((task)=>{ return task.id=== currrentUpdateId? {...task,lable: current}: task})
            
            setList(updatedList)
            SetUpdatebtn(true)
            setCurrentUpdateId(null)
            setCurrent("")
        }
    }

    //DeletTask function
    const DeleteTask =(id)=>{
       let newList  = list.filter((task)=>task.id!=id)
       .map((task,index)=>{return{...task,id:index+1}})
       setList(newList)
    }

    //CheckBox Function
    let HandelChecked =(id)=>{

        let newList = list.map((task)=>{ return task.id ===id? {...task,checked:!task.checked}:task })
        setList(newList)

    }

    //UpdateTask function
    let UpdateTask=(id)=>{
        SetUpdatebtn(false)
        setCurrentUpdateId(id)

        //find method to find the updated task
        let newUpdateTask = list.find((task)=> task.id===id)
        setCurrent(newUpdateTask.lable)
    }


  return (
    <div className="box-container">

        <div className="box-heading">
            <h1 className='Heading'>To-Do List</h1>
        </div>
    
        <div className="input-box">
            <input  className='input-task'
            type='text' 
            value={current} onChange={(e)=>setCurrent(e.target.value)}placeholder='Enter your Task'/>
            <button className='btn addbtn'onClick={AddTask} > {updatebtn? "Add Task": "update"} </button>
        </div>
        {/*Pending task*/}
       <div className="tasklist pending-task">
        <h2>Pending Tasks</h2><hr/>
        {
            pending.map((item)=>(
                <div  key ={item.id}>
                        <input  className='checkBox'
                        type='checkbox' 
                        checked={item.checked} 
                        onChange={()=>{HandelChecked(item.id)}}
                                
                    /> 
                    {item.lable} 
                    <button className="btn deletebtn" onClick={()=>{DeleteTask(item.id)}}> Delete</button>
                    <button className='btn updatebtn' onClick={()=>{UpdateTask(item.id)}}>Update</button>
                </div>
            ))
        }
        </div>

         {/*Completed task*/}
        <div className="tasklist complete-task">
            <h2>Completed Tasks</h2> <hr/>
            {
               completed.map((item)=>(

                 <div key={item.id} className="task-left">

                     <input  className='checkBox'
                    type='checkbox' 
                    checked={item.checked} 
                    onChange={()=>{HandelChecked(item.id)}}
                 /> 
                 {item.lable} 
                  <button className="btn deletebtn" onClick={()=>{DeleteTask(item.id)}} >   Delete</button>
                  <button className='btn updatebtn' onClick={()=>{UpdateTask(item.id)}}>Update</button>


                </div>
               ))

            }

        </div>
        

    </div>
  )
}

export default TodoList