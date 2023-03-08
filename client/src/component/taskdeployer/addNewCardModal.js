import { useState } from "react"

const AddNewCardModal = ({ column, handleAddCard }) => {
  const [inputValue, setInputValue] = useState({
    title:"",
    comments:"",
  });
 
  const handleChange = (e) =>{
    const  name = e.target.name;
    const  value = e.target.value;
    setInputValue ((cur)=>{
      return{
      ...cur,
      [name]:value
      }
    })
  }

  const handleSave = () => {

    handleAddCard(column,inputValue)
  }

  return (
    <>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >  add new card
      </button>
      <div class="modal fade bd-example-modal-lg"
        tabIndex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Title</label>
                  <input type="text" class="form-control" id="recipient-name" 
                    name="title"
                  onChange={handleChange.bind()} />
                </div>
                {/* <div class="form-group">
                  <label for="message-text" class="col-form-label">comment:</label>
                  <textarea class="form-control" id="message-text"
                  name="comments"
                    onChange={ handleChange.bind()} ></textarea>
                </div> */}
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={() => handleSave()}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewCardModal