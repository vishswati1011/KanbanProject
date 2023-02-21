import * as React from 'react';
import './view.css'



export default function RowAndColumnSpacing() {

   return (
      <>
      
         <div className="parent">
           
            <div className="child">
            <label> Tasks </label>
               <div className='child_card'>
                  <label className='title_card'> start kanban task</label>
                  <br />
                  <label className='label_card'> Low</label>
               </div>
               <button className='btn btn-secondary add_more_button'>+ Add new card</button>
            </div>
            <div className="child">
            <label> To Do  card</label>
               <div className='child_card '>
                  <label className='title_card'> start kanban task</label>
                  <br />
                  <label className='label_card'> Low</label>
               </div>
               <button className='btn btn-secondary add_more_button'>+ Add new board</button>
            </div>
               <button className='btn btn-secondary add_more_button2'>+ Add new Column</button>
            

         </div>
          
      </>
   );
}
