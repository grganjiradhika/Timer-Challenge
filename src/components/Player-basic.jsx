
import{ useState } from 'react';

export default function Player() {
  const [enteredPlayerName,setEnteredPlayerName] = useState('');
  const [submitted,setSubmitted] = useState(false);
 
  function handlechange(e){    
    setEnteredPlayerName(e.target.value);    
  }
  function handleClick(){   
    setSubmitted(true);  
    }

  return (
    <section id="player">
      <h2>Entered Player Name is {submitted ? enteredPlayerName: 'unknown name'}</h2>
      <p>
        <input type="text" onChange={handlechange} value={enteredPlayerName}/>        
        <button onClick={handleClick}>Set Name</button>        
      </p>
    </section>
  );
}
