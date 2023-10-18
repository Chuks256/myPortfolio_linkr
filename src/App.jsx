import "./App.css"
import './NavBarStyle.css'
import ProfileComponent from "./components/ProfileComponent"
import LinkComponent from "./components/LinkComponent"
import { useState } from "react"
import "./ModalStyle.css"
import ding from "./assets/ding.mp3"

function App(){
  
  let [modal,set_Modal]=useState("none")
  let [reactionToggle,setReactionModalStyle]=useState("flex")  
  let [Reaction,setReaction]=useState(0);
  let [react_color,setColor]=useState("rgba(253, 252, 252, 0.76)")


  function showModal(){
    set_Modal("flex")
    let getTrackingId=localStorage.getItem("tracking_id");
    if(getTrackingId != null){
      setReactionModalStyle("none")
    }
    else{
      if(getTrackingId==null){
        setReactionModalStyle("flex");
        setReaction(0)  
        setColor("rgba(253, 252, 252, 0.76)")              
      }
    }
    
  }

  function closeModal(){
    set_Modal("none")
  }

    
    
    let modal_style={
        display:modal
    }

    let reaction_statement={
        nameType:"Reaction"
    }


    
    // if reaction is more than 0 change from reaction to reactions
    Reaction>1 ? 
    reaction_statement.nameType="Reactions"
    :
    reaction_statement.nameType="Reaction"
    

    function user_react(){
      
      let get_item=localStorage.getItem("tracking_id");
      if(get_item=="" || get_item==undefined){
        localStorage.setItem("tracking_id",Math.random())
        setReaction(Reaction+1)
        setColor("rgb(253, 38, 38)")
        let aud=new Audio(ding);
        aud.play()
         // send data to broadcaster server 
      let wshClient=new WebSocket("ws://localhost:3366")
      let sanitizeData={type:"0X_REACT"}
      wshClient.onopen=function(){
      wshClient.send(JSON.stringify(sanitizeData))
      }
      }
   
    }

    

return(
  <>
  <div className="contentContainer">
    
    {/* modal section  */}
   <div className="modalContainer" style={modal_style}>
            <div className="modalBox">
            <div className="shareContainer">
            <svg className="shareIcon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40m160-64l-80-80l-80 80m80 193V48"/></svg>
            Share   
            </div>
            <div className="reactionContainer" style={{display:reactionToggle}}>
            <svg style={{color:react_color}} onClick={user_react} className="heartIcon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558a5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"/></svg>
            {Reaction} 
            <span className="reactionTxt">{reaction_statement.nameType}</span>
            </div>
            <button onClick={closeModal} className='cancelBtn'>Cancel</button>
            </div>
        </div>
         {/* end of modal box */}

  <div className="navChildContainer">
            <div className="logoContainer">
            <svg className="logo_icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m5.67 9.914l3.062-4.143c1.979-2.678 2.969-4.017 3.892-3.734c.923.283.923 1.925.923 5.21v.31c0 1.185 0 1.777.379 2.148l.02.02c.387.363 1.003.363 2.236.363c2.22 0 3.329 0 3.704.673l.018.034c.354.683-.289 1.553-1.574 3.29l-3.062 4.144c-1.98 2.678-2.969 4.017-3.892 3.734c-.923-.283-.923-1.925-.923-5.21v-.31c0-1.185 0-1.777-.379-2.148l-.02-.02c-.387-.363-1.003-.363-2.236-.363c-2.22 0-3.329 0-3.704-.673a1.084 1.084 0 0 1-.018-.034c-.354-.683.289-1.552 1.574-3.29Z"/></svg>
            <h3 className="logo_name">Dolt</h3>
            </div>
            <svg  onClick={showModal} className="menu_icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>
        </div>
  <ProfileComponent />
  <LinkComponent/>
  </div>
  </>
)
}

export default App