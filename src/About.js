import React from 'react';
import { useState, useEffect } from 'react';

const About = () =>{

const [count, setCount] = useState({amount : 0, color : "blue", someMore : {id : 0}});


useEffect(()=>{
    console.log(count);

},  [count] )


const incCounter = () =>{
    setCount(prevState => ({
        ...prevState,
        amount : prevState.amount + 1,
        someMore : {...prevState.someMore, id : prevState.someMore.id + 1 }
    }))
}


const decCounter = () =>{

    setCount(prevState => ({
        ...prevState,
        amount : prevState.amount - 1,
        someMore : {...prevState.someMore, id : prevState.someMore.id - 1}
    }))
}



return(
        <div style={{color : 'green'}}> 
            <button onClick={() => incCounter()}> INC </button>
            <button onClick={() => decCounter()}> DEC </button>
        </div>
    );
}

export default About;