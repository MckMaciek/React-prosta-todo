import React from 'react';
import PropTypes from 'prop-types';
import "./style.css"


const Activity = props =>{
     return(
      <div className="activity-container">
          <div className="activity-container__item">
               <h3> {props.name} - {props.hour == "-1" ? "" : props.hour }:{props.minute == "-1" ? "" : props.minute} </h3>
               <div className="activity-container__item__delete">
                    <button onClick={() => props.deleteChange(props.id)} > DELETE </button> 
               </div>
               <div className="activity-container__item__change">
                    <button onClick={() => props.modifyElement(props.id)} > MODIFY </button> 
               </div>
               <div className="activity_container__time_added">
                    <p> Added on - {props.hourAdded}:{props.minuteAdded} </p>
               </div>


          </div>
          
     </div> 
     )
};


Activity.propTypes = {
     name : PropTypes.string,
     hour :PropTypes.number,
     minute : PropTypes.number,
     deleteChange : PropTypes.func,
     modifyElement : PropTypes.func
};

export default Activity;