import { Button } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./Taskcard.css";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskCard = () => {

  const initialTasks = [
    "Complete mock-up for client website",
    // "Email mock-up to client for feedback",
    // "Update personal website header background image",
  ];
  const dragBucketItem = useRef();
  const dragBucketOverItem = useRef();
  const dragTaskItem = useRef();
  const dragTaskOverItem = useRef();
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [bucket, setBuckets] = useState([]);
  const [cards, setCards] = useState([]);

  const handleEditClick = (index) => {
    setEditingTaskIndex(index);
    setEditedTask(tasks[index]);
  };

  const handleEditChange = (event) => {
    setEditedTask(event.target.value);
  };
  //👇🏻 This function is the value of the onDragEnd prop
  const handleDragEnd = ({ destination, source }) => {


    console.log("source", source, "dest", destination)
    if (!destination) return;
    if (destination.index === source.index &&
      destination.droppableId === source.droppableId) return;
    if (destination) {
      const allcard = cards
      //👇🏻 Gets the item that was dragged
      const sourceItem = cards.find((card, index) => index === source.index
      );
      const destItem = cards.find((card, index) => index === destination.index
      );
      console.log("sourceItem", sourceItem)
      updateArray(destination);
      updateArray(source);
      //👇🏻 Removes the item from the its source
      allcard.splice(source.index, 1)
      console.log("all", allcard)

      //change the bucket name of source item
      sourceItem.bucketId = destItem.bucketId;
      console.log("source update", sourceItem)

      // push on destination place
      allcard.splice(destination.index, 0, sourceItem)
      console.log("sourceItem", allcard)
      setCards(allcard)

      // //👇🏻 Add the item to its destination using its destination index


    }
  };
  const updateArray = (destination) => {
    cards.map((obj, index) => obj.bucketId.bucketName === destination.droppableId ? { ...obj, rank: obj.rank++ } : obj
    );
    console.log("update", cards)
  }
  const handleDragEnd1 = ({ destination, source }) => {


    console.log("source", source, "dest", destination)
    if (!destination) return;
    if (destination.index === source.index &&
      destination.droppableId === source.droppableId) return;
    if (destination) {
      //👇🏻 Gets the item that was dragged

      const existingCartItem = tasks.find(
        obj => obj.title === source.droppableId
      );
      //👇🏻 Gets the item that was dragged
      const itemMoved = {
        ...existingCartItem.items[source.index],
      };
      //👇🏻 Removes the item from the its source
      existingCartItem.items.splice(source.index, 1)
      console.log("itemMoved", itemMoved)

      // //👇🏻 Add the item to its destination using its destination index
      tasks.map((obj) =>
        obj.title === destination.droppableId ?
          obj.items.splice(destination.index, 0, itemMoved) : obj
      );
    }
  };
  const handleSaveClick = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingTaskIndex] = editedTask;
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
    setEditedTask("");
  };


  useEffect(() => {

    getData();

  }, [])

  const getData = async () => {
    const response = await axios.get("localhost:8082/api/taskdeployer/bucket/getBucketByBoardId/6408642356f25841282ab225");
    console.log("response", response.data.allbuckets)
    setBuckets(response.data.allbuckets)

    try {
      const response = await axios.get("http://task.consdeployer.com/api/taskdeployer/card/getCardByBoardId/6408642356f25841282ab225");
      console.log("response card", response.data.allcards)
      setCards(response.data.allcards)
    } catch (error) {
      console.log("error in get card")
    }
  }
  const handleDeleteClick = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleAddCardClick = () => {
    const newTasks = ["New Card", ...tasks];
    setTasks(newTasks);
  };

  const taskItems = tasks.map((task, index) => (
    <li key={index}>
      {editingTaskIndex === index ? (
        <>
          <input
            type="text"
            value={editedTask}
            onChange={handleEditChange}
            className="p-1"
            style={{ width: "305px", padding: "1.25rem" }}
          />
          <Button onClick={handleSaveClick} className="btn m-2">
            Save <i className="fa-solid fa-floppy-disk"></i>
          </Button>
          {/* <Button onClick={handleCancelClick} className="btn btn-info m-2">Cancel <i className="fa-solid fa-xmark"></i></Button> */}
          <button
            onClick={() => handleDeleteClick(index)}
            className="btn btn-danger m-2"
          >
            Delete <i className="fa-solid fa-trash"></i>
          </button>
        </>
      ) : (
        <>
          {task}

          <span className="editanddelete_button">
            <i
              className="fa-regular fa-pen-to-square p-2 text-secondary "
              onClick={() => handleEditClick(index)}
            ></i>
          </span>

          {/* <i className="fa-solid fa-trash text-danger editanddelete_button" onClick={() => handleDeleteClick(index)} ></i> */}
        </>
      )}
    </li>
  ));


  const dragBucketStart = (e, position) => {
    dragBucketItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragBucketEnter = (e, position) => {
    dragBucketOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dropBucket = (e) => {
    console.log("id", dragBucketOverItem.current, dragBucketItem.current)
    const copyListItems = [...bucket];
    const dragItemContent = copyListItems[dragBucketItem.current];
    copyListItems.splice(dragBucketItem.current, 1);
    copyListItems.splice(dragBucketOverItem.current, 0, dragItemContent);
    dragBucketItem.current = null;
    dragBucketOverItem.current = null;
    setBuckets(copyListItems)
  };




  return (
    <>
      <div
        className="p-3 container-fluid horizontal-scrollable "
      >
        <div className="row">
          <DragDropContext onDragEnd={handleDragEnd}>

            {bucket && bucket.map((bucket, index) =>
            (

              <div className="col-xs-6 col-sm-3 col-md-3 col-3">
                <div className="card card-block">
                  <div className="list"
                    onDragStart={(e) => dragBucketStart(e, index)}
                    onDragEnter={(e) => dragBucketEnter(e, index)}
                    onDragEnd={dropBucket}
                    key={index}
                    draggable
                  >
                    <h3 className="list-title"> {bucket.bucketName}</h3>
                    <div className={`kanban__container`}>
                      <Droppable droppableId={bucket.bucketName}>
                        {(provided) => (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >

                              {cards && cards.map((card, index) => (
                                card.bucketId._id === bucket._id ?
                                  <Draggable
                                    key={card._id}
                                    draggableId={card._id}
                                    index={index}
                                  >
                                    {(provided) => (


                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="card_css"
                                      >
                                        <ul className="">{card.cardTitle} "rank" {card.rank}</ul>
                                      </div>
                                    )}
                                  </Draggable>
                                  : null
                              ))}
                              {provided.placeholder}
                            </div>
                          </>
                        )}
                      </Droppable>
                    </div>
                    <button
                      type="button"
                      className="add-card-btn"
                      onClick={handleAddCardClick}
                    >
                      +Add a Card
                    </button>
                  </div>
                </div>
              </div>

            ))}
          </DragDropContext>




          {/* <div className="col-xs-6 col-sm-3 col-md-3 col-3">
            <div className="card card-block">
              <div className="list">
                <h3 className="list-title">Completed Task</h3>
                <ul className="list-items">{taskItems}</ul>
                <button
                  type="button"
                  className="add-card-btn"
                  onClick={handleAddCardClick}
                >
                  +Add a Card
                </button>
              </div>
            </div>
          </div> */}



          {/* 
          <div className="col-3">
            <div className="card card-block">
              <button className="add-card-btn btn">Add more</button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
