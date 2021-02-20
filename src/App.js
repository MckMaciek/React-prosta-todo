import React, {Component} from 'react';
import Activity from './Activity';
import EditEvent from './EditEvent';
import uniqid from "uniqid"
import PropTypes from 'prop-types';


class App extends Component{
    constructor(props){
        super(props);

        this.state = {

            nowTime : {
                hour : new Date().getHours(),
                minute : new Date().getMinutes(),
                seconds : new Date().getSeconds()
            },
            activity : [
                {id : uniqid(), actvityName : "Sprzątanie", hour : 12, minute : 22, addedOn : {hour : 0, minute : 0 }},
                {id : uniqid(), actvityName : "Gotowanie", hour : 13, minute : 55,  addedOn : {hour : 0, minute : 0 }},
                {id : uniqid(), actvityName : "Pranie", hour : 18, minute : 32,     addedOn : {hour : 0, minute : 0 }}
            ],
            editedActivity : { id : uniqid(), actvityName : "",  hour : -1, minute : -1, addedOn : {hour : 0, minute : 0 } }
        };


        this.eventOnChange = this.eventOnChange.bind(this);
        this.eventOnSubmit = this.eventOnSubmit.bind(this);
        this.eventDelete = this.eventDelete.bind(this);
        this.modifyElementToChange = this.modifyElementToChange.bind(this);

    }


    componentDidMount(){

        setInterval(()=>{
            this.setState(prevState =>{
                return{
                    nowTime : {
                        hour : new Date().getHours(),
                        minute : new Date().getMinutes(),
                        seconds : new Date().getSeconds() 
                    } 
                }
            })
        },1000)

        console.log(this.state);

        this.setState(JSON.parse(localStorage.getItem("activity")));    
    }


    eventOnChange(e){

        let element1;

        console.log(this.state.nowTime);

        (e.target.id !== "actvityName") ? element1 = parseInt(e.target.value) : element1 = String(e.target.value);
        let element2 = e.target.id;
        
        let element = {[element2] : element1};

        this.setState(prevState =>{
                return{
                editedActivity : Object.assign(prevState.editedActivity, element)
            }
        });
        this.setState(prevState =>{
            return{
            editedActivity : {...prevState.editedActivity, addedOn : {hour : this.state.nowTime.hour, minute : this.state.nowTime.minute}}
        }
    },() => console.log(this.state.editedActivity));

    }

    modifyElementToChange(elementID){


        this.setState(prevState =>{ 
            activity : prevState.activity.map(el => {
                if(el.id === elementID){
                    return Object.assign(el, prevState.editedActivity)
                }
            })
        },() => localStorage.setItem("activity", JSON.stringify(this.state)))

        this.setState(prevState =>{ 
            return {editedActivity :  { id : uniqid(), actvityName : "",  hour : -1, minute : -1, addedOn : {hour : 0, minute : 0 } }}
        }, () => localStorage.setItem("activity", JSON.stringify(this.state)))

        document.getElementById("actvityName").value = "";;
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";

    }


    eventOnSubmit(){

            this.setState(prevState =>{
                    return{    
                    activity : [...prevState.activity, prevState.editedActivity],
                    editedActivity :  { id : uniqid(), actvityName : "",  hour : -1, minute : -1, addedOn : {hour : 0, minute : 0 } },
                }
            },() => {localStorage.setItem("activity", JSON.stringify(this.state)); console.log(this.state.activity)});


            document.getElementById("actvityName").value = "";;
            document.getElementById("hour").value = "";
            document.getElementById("minute").value = "";
    }

    eventDelete(elementToBeDeleted){

        this.setState(prevState =>{
            return{
            activity :  prevState.activity.filter(element => element.id !== elementToBeDeleted)
        }
        },() => localStorage.setItem("activity", JSON.stringify(this.state)))
        console.log(this.state);

    }


    render(){

        const listOfActivity = this.state.activity.map( 
                element => {

                    return(
                    <Activity key={element.id}
                    deleteChange={(element) => this.eventDelete(element)}
                    modifyElement={(element) => this.modifyElementToChange(element)}
                    realTime = {this.state.nowTime}
                    id={element.id}
                    name={element.actvityName} 
                    hour={element.hour}  
                    minute={element.minute}
                    hourAdded={element.addedOn.hour}
                    minuteAdded={element.addedOn.minute}
                    
                    />
                    );
                }
            );

        return (
            <div className="main">
 
                <EditEvent  eventTimeChangeHour={this.state.nowTime.hour} 
                eventTimeChangeMinute={this.state.nowTime.minute} 
                eventTimeChangeSeconds={this.state.nowTime.seconds} 

                eventChange={(e) => this.eventOnChange(e)} eventSubmit={() => this.eventOnSubmit()}></EditEvent>
                {listOfActivity}


            </div>
        )
    };
}
export default App;

App.propTypes = {
    id : PropTypes.string,
    actvityName : PropTypes.string,
    hour : PropTypes.number,
    minute : PropTypes.number,
    eventOnSubmit : PropTypes.func,
    eventDelete: PropTypes.func,
    modifyElementToChange : PropTypes.func,
    eventOnChange : PropTypes.func
};
