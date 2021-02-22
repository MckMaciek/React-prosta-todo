import React, {Component} from 'react';
import Activity from './Activity';
import EditEvent from './EditEvent';
import uniqid from "uniqid"
import PropTypes from 'prop-types';
import {validateActivity, validateHour, validateMinute} from './validateUtils';


class App extends Component{
    constructor(props){
        super(props);

        this.state = {

            nowTime : {

                day : new Date().getDate(),
                month : new Date().getMonth() + 1,
                year : new Date().getFullYear(),
                hour : new Date().getHours(),
                minute : new Date().getMinutes(),
                seconds : new Date().getSeconds()
            },
            activity : [
                {id : uniqid(), actvityName : "Sprzątanie", hour : 12, minute : 22, 
                addedOn : {day: 0, month: 0, year: 0, hour : 0, minute : 0 }},
                {id : uniqid(), actvityName : "Gotowanie", hour : 13, minute : 55,  
                addedOn : {day: 0, month: 0, year: 0, hour : 0, minute : 0 }},
                {id : uniqid(), actvityName : "Pranie", hour : 18, minute : 32,     
                addedOn : {day: 0, month: 0, year: 0, hour : 0, minute : 0 }}
            ],
            editedActivity : { id : uniqid(), actvityName : "",  hour : -1, minute : -1, addedOn : {day: 0, month: 0, year: 0,  hour : 0, minute : 0 } }
        };


        this.eventOnChange = this.eventOnChange.bind(this);
        this.eventOnSubmit = this.eventOnSubmit.bind(this);
        this.eventDelete = this.eventDelete.bind(this);
        this.modifyElementToChange = this.modifyElementToChange.bind(this);
        this.sortElementsByHour = this.sortElementsByHour.bind(this);
        this.hideOrShowElementsOnSort = this.hideOrShowElementsOnSort.bind(this);
        this.sortElementsByName = this.sortElementsByName.bind(this);
        this.sortElementsByDate = this.sortElementsByDate.bind(this);

    }


    componentDidMount(){

        setInterval(()=>{
            this.setState(prevState =>{
                return{
                    nowTime : {
                        day : new Date().getDate(),
                        month : new Date().getMonth() + 1,
                        year : new Date().getFullYear(),
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
            editedActivity : {...prevState.editedActivity, addedOn : {day : this.state.nowTime.day , month : this.state.nowTime.month, year: this.state.nowTime.year, hour : this.state.nowTime.hour, minute : this.state.nowTime.minute}}
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
            return {editedActivity :  { id : uniqid(), actvityName : "",  hour : -1, minute : -1, addedOn : {day: 0, month: 0, year: 0, hour : 0, minute : 0 } }}
        }, () => localStorage.setItem("activity", JSON.stringify(this.state)))

        document.getElementById("actvityName").value = "";;
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";

    }


    eventOnSubmit(){


        if (validateHour(this.state.editedActivity.hour) && 
            validateMinute(this.state.editedActivity.minute) &&
            validateActivity(this.state.editedActivity.actvityName)){

            this.setState(prevState =>{
                    return{    
                    activity : [...prevState.activity, prevState.editedActivity],
                    editedActivity :  { id : uniqid(), actvityName : "",  hour : -1, minute : -1, addedOn : {day: 0, month: 0, year: 0, hour : 0, minute : 0 } },
                }
            },() => {localStorage.setItem("activity", JSON.stringify(this.state)); console.log(this.state.activity)});

         }
         document.getElementById("actvityName").value = "";;
         document.getElementById("hour").value = "";
         document.getElementById("minute").value = "";
    }

    hideOrShowElementsOnSort(){
        let listed_menu =  document.getElementById("listed_menu");
        listed_menu.style.display == "flex" ? listed_menu.style.display = "none" : listed_menu.style.display = "flex";
    }

    sortElementsByHour(){

        this.setState(prevState=>{
            return{
                activity : prevState.activity.sort((a,b) => a.hour - b.hour)
            }
        },() => localStorage.setItem("activity", JSON.stringify(this.state)))

        this.hideOrShowElementsOnSort();
    }

    sortElementsByName(){
        this.setState(prevState=>{
            return{
                activity : prevState.activity.sort((a,b) =>{
                if(a.actvityName.toUpperCase() < b.actvityName.toUpperCase()) { return -1; }
                if(a.actvityName.toUpperCase() > b.actvityName.toUpperCase()) { return 1; }
                return 0;  
            })
            }
        },() => localStorage.setItem("activity", JSON.stringify(this.state)))

        this.hideOrShowElementsOnSort();
    }

    sortElementsByDate(){
        
        this.setState(prevState=>{
            return{
                activity : prevState.activity.sort((a,b)=>{


                })
            }
        })

        this.hideOrShowElementsOnSort();
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
                    dayAdded={element.addedOn.day}
                    monthAdded={element.addedOn.month}
                    yearAdded={element.addedOn.year}
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
                <div className="sort-elements__main">
                    <button onClick={() => this.hideOrShowElementsOnSort()}>SORT</button>
                    <div className="listed-menu" id="listed_menu">
                        <button onClick={() => this.sortElementsByHour()}>by hour</button>
                        <button onClick={() => this.sortElementsByName()}>by name</button>
                        <button onClick={() => this.sortElementsByDate()}>by date</button>
                    </div>
                </div>
                {listOfActivity}e


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
