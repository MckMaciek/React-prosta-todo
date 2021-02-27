import React from 'react';
import "./style.css"
import validateHour from './validateUtils';

const EditEvent = ({eventTimeChangeHour, eventTimeChangeMinute,eventTimeChangeSeconds, eventChangeDate, eventChange, eventSubmit}) =>{
    return(
        <div className="flex-container">
            <div className="flex-container__userInput-wrapper"> 
            <div className="flex-container__userInput">
                <div className="flex-container-inputs__userInput">
                    <input autoComplete="off" onChange={e => eventChangeDate(e)} placeholder="Czynność" type="text" id="actvityName"/>
                    <input autoComplete="off" onChange={e => eventChange(e)} placeholder="Godzina"type="text" id="hour"/>
                    <input autoComplete="off" onChange={e => eventChange(e)} placeholder="Minuta" type="text" id="minute"/>
                    <input onChange={(e) => eventChangeDate()} type="date" id="start" name="trip-start"/>
                </div>
                <div className="flex-container__submit">
                    <button onClick={() => eventSubmit()}>ADD</button>
                </div>
            </div>
            </div>
      
            <div className="display-time__flex-container">
                <p> Clock - {eventTimeChangeHour < 10 ? "0" + eventTimeChangeHour : eventTimeChangeHour }
                :{eventTimeChangeMinute < 10 ? "0" + eventTimeChangeMinute : eventTimeChangeMinute}
                :{eventTimeChangeSeconds < 10 ? "0" +eventTimeChangeSeconds : eventTimeChangeSeconds} </p>
            </div>
        
        </div>

    )
}

export default EditEvent;