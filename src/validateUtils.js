export function validateHour(hour){
 
    if(typeof(hour) === String) return false;
    else if(!(hour >= 0 && hour <=24)) return false;
    
    return true;
}

export function validateMinute(minute){
 
    if(typeof(minute) === String) return false;
    else if(!(minute >= 0 && minute <=60)) return false;
    
    return true;
}

export function validateActivity(activity){
    if(activity === "") return false;

    return true;
}