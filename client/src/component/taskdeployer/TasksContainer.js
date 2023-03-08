import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import socketIO from "socket.io-client";
import './TaskContainer.css';
import {Data} from './data';
import axios from "axios";

import AddNewCardModal from './addNewCardModal'
// const socket = socketIO.connect("http://localhost:4000");

const TasksContainer = () => {
    const [tasks, setTasks] = useState(Data);
    const [show,setShow]= useState(false);
    const [showlane,setShowlane]= useState(false);

    const [allTask,setAllTask]=useState({});
    const [title,setTitle]= useState();
    const [column,setColumn]=useState();
    const [buckets, setBuckets] = useState([]);
    const [cards, setCards] = useState([]);
    const handleAddTitle =(e) =>{
        const update={
                items:[],
                title:title
        }
        console.log("update",update)
        setTasks([...tasks,update])
    }
    
  useEffect(() => {

    getData();

  }, [])

  const getData = async () => {
    const response = await axios.get("http://task.consdeployer.com/api/taskdeployer/bucket/getBucketByBoardId/6405b9760275e03e99e82439");
    console.log("response", response.data.allbuckets)
    setBuckets(response.data.allbuckets)

    try {
      const response = await axios.get("http://task.consdeployer.com/api/taskdeployer/card/getCardByBoardId/6405b9760275e03e99e82439");
      console.log("response card", response.data.allcards)
      setCards(response.data.allcards)
    } catch (error) {
      console.log("error in get card")
    }
  }
    //👇🏻 This function is the value of the onDragEnd prop
    const handleDragEnd = ({ destination, source }) => {
        if (!destination) return;
        if (destination.index === source.index &&
            destination.droppableId === source.droppableId) return;
        if(destination){ 
            //👇🏻 Gets the item that was dragged

            const existingCartItem = tasks.find(        
            obj =>obj.title ===source.droppableId  
            );
            //👇🏻 Gets the item that was dragged
            const itemMoved = {
                ...existingCartItem.items[source.index],
            };
            //👇🏻 Removes the item from the its source
            existingCartItem.items.splice(source.index, 1)
            console.log("itemMoved",itemMoved)
            
            // //👇🏻 Add the item to its destination using its destination index
            tasks.map((obj)=>
            obj.title===destination.droppableId ? 
               obj.items.splice(destination.index, 0, itemMoved): obj
            );  
        } 
    };
 
    console.log("alltasks",tasks)

    const generaterandomString =()=>{
     const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = ' ';
        const charactersLength = characters.length;
        for(let i = 0; i < 7; i++) {
            result += 
            characters.charAt(Math.floor(Math.random() * charactersLength));
        }
            return result;        
    }
    const handleAddCard = (column,newCardData) =>{


        const {title}=newCardData
        const randomSTR=generaterandomString();
        console.log(column,"column")
        const newCardValue={
            comments:[],
            id:randomSTR,
            title,
         }
        const dataToUpdate=tasks;
        const existingCartItem = dataToUpdate.find(        
             obj =>obj.title ===column  
        );
    
        const data=existingCartItem.items.push(newCardValue)
        console.log(existingCartItem,"updated")
        const updatetask = tasks.map((items)=>
        items.title===existingCartItem.title?existingCartItem:items
        )
        setTasks(updatetask);
    }
    const handleNewCardPopup = (column) =>{
        setShow(true)
        setColumn(column)
    }
    return (
        <>
        {show?<AddNewCardModal 
        column={column}
        handleAddCard={handleAddCard}
     /> :null} 
        <div className='container'>
            
            {showlane ?<>
             <input type="text" 
               value={title}
               onChange={(e)=>setTitle(e.target.value)}/>
               <button onClick={(e)=>handleAddTitle(e)}>ADD</button></>
            :<button 
               onClick={()=>setShowlane(!show)}
               > Add more </button>
            }
        <DragDropContext onDragEnd={handleDragEnd}>
            {buckets && buckets.map((bucket,index) => (
                <div
                    className={`kanban__wrapper`}
                    key={index}
                >
                    
                <h3>{bucket.bucketName} Tasks</h3>     {/*  bucket name*/ }
                    <div 
                    // className={`kanban__container`}
                    >    
                        <Droppable droppableId={bucket._id}>
                            {(provided) => (
                                <>
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {cards.map((card, idx) => (
                                        <Draggable
                                            key={card._id}
                                            draggableId={card._id}
                                            index={idx}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    // className={`kanban__items`}
                                                >
                                                     {card.bucketId._id === bucket._id ?
                                                      <p>{card.cardTitle}</p>
                                                            : null}
                                                    {/* <p>{card.cardTitle}</p> */}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-toggle="modal"
                                    data-target=".bd-example-modal-lg"
                                    onClick={()=>handleNewCardPopup(bucket._id)}
                                >  add new card
                                </button>                           
                                {/* <button className="btn btn-secondary">add new card</button> */}
                                </>
                            )}
                        </Droppable>
                    </div>
                </div>
            ))}
        </DragDropContext>
    </div>
    </>
);
};
export default TasksContainer;
