import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props)=>{
    const host = "https://inotebookbackend-huso.onrender.com"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [user, setUser] = useState(notesInitial);
    const [singlenote, setSinglenote] = useState(notesInitial);

      //Get all Notes
      const getNotes = async() =>{
       // API call
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
            }
          });
        const json = await response.json()             
        setNotes(json)      
      }


      
      
      
      
      //Add a Note
      const addNote = async(title,description,tag) =>{
        //TODO: API call
        //API call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description,tag})
        });
        
        const note = await response.json(); 
        setNotes(notes.concat(note));
        console.log("Adding a new note")
        
      }
      


      //Delete a Note
      const deleteNote = async(id) =>{
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json(); 
        console.log(json)

        const newNotes = notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes);
      }
      //Edit a Note
      const editNote = async(id, title, description, tag) =>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag})
        });
        const json = await response.json();
        console.log(json) 

        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let i = 0; i < newNotes.length; i++) {
          const element = newNotes[i];
          if(element._id ===id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          } 
        }
        setNotes(newNotes);
      }


      const getUser = async () => {
        try {
          // API call
          const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
      
          const json = await response.json();
          setUser(json);
        } catch (error) {
          // Handle the error here
          console.error("Error fetching user:", error);
          // You can add more error handling logic here if needed
        }
      };
      

      const editUser = async (id, name, email) => {
        // API call
        const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({ name, email })
        });
        const json = await response.json();
        console.log(json);
        
      };
      


      
  
      const getNoteDetails = async (id) => {
        try {
          // API call
          const response = await fetch(`${host}/api/notes/getnote/${id}`, {
            method: "GET",
            headers: {
              "auth-token": localStorage.getItem('token'),
              "Content-Type": "application/json"
            },
          });
    
         const noteDetails = await response.json();
         setSinglenote(noteDetails);
        } catch (error) {
          console.error("Error fetching note details:", error);
          return null;
        }
      }



    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes,getUser,user,singlenote,getNoteDetails,editUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
