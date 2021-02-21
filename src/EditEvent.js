import React from 'react';
import "./style.css"
import validateHour from './validateUtils';

const EditEvent = props =>{
    return(
        <div className="flex-container">
            <div className="flex-container__userInput-wrapper"> 
            <div className="flex-container__userInput">
                <input autoComplete="off" onChange={e => props.eventChange(e)} placeholder="Czynność" type="text" id="actvityName"/>
                <input autoComplete="off" onChange={e => props.eventChange(e)} placeholder="Godzina"type="text" id="hour"/>
                <input autoComplete="off" onChange={e => props.eventChange(e)} placeholder="Minuta" type="text" id="minute"/>
                <div className="flex-container__submit">
                    <button onClick={() => props.eventSubmit()}>ADD</button>
                </div>
            </div>
            </div>
      
            <div className="display-time__flex-container">
                <p> Clock - {props.eventTimeChangeHour}:{props.eventTimeChangeMinute}:{props.eventTimeChangeSeconds} </p>
            </div>
        
        </div>

    )
}

export default EditEvent;