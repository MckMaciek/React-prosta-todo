import React from 'react';
import { useState, useEffect } from 'react';

const About = () =>{

return(
        <div style={{color : 'green'}}> 
            <button onClick={() => incCounter()}> INC </button>
            <button onClick={() => decCounter()}> DEC </button>
        </div>
    );
}

export default About;
