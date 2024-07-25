import { useState, useRef } from "react";

export default function Player() {
  //playername is a reference to the input element <input> in the DOM so that
  // we can access the values,methods and all  of the input element directly without using the event object.
  const playername = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  function handleClick() {
    //setSubmitted(true);
    //playername.current.focus(); //focus() method is used to set the focus on the input element
    setEnteredPlayerName(playername.current.value); //get the value of the input element using the ref
    playername.current.value = ""; //clear the input element
  }
  return (
    <section id="player">
      {/*<h2>Entered Player Name is {submitted ? enteredPlayerName: 'unknown name'}</h2> 
     or we can give like 
     means if enteredPlayerName is null or undefined then it will display 'unknown name'
     otherwise it will display enteredPlayerName
     <h2> Welcome {enteredPlayerName ?? 'unknown name'}</h2>*/}
      <h2> Welcome {enteredPlayerName ?? "unknown name"} </h2>
      <p>
        <input ref={playername} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
