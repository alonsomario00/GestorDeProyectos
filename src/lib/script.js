var InicTime;
var ActualTime;
var nombreExp;
var AuxTime=new Date();
var Old=new Date();
Old.setTime(0);
Old.setHours(0,0,0,0);
var run = false;
var Hours = 0, Minutes = 0,Seconds =0,Milliseconds=0;
 
function showClock( )
{
    if(run)
    {
        ActualTime = new Date();
        AuxTime.setHours(0,0,0);
        AuxTime.setTime(ActualTime.getTime() - InicTime.getTime() + Old.getTime());
        Seconds = (AuxTime.getSeconds());
        Minutes = (AuxTime.getMinutes());
        Hours = (AuxTime.getHours());
 
        document.getElementById("Hours").innerHTML = Hours;
        document.getElementById("Minutes").innerHTML = Minutes;
        document.getElementById("Seconds").innerHTML =  Seconds;
 
        setTimeout("showClock()", 50);
    }
}
 
function pauseClock( ){
    if(!run){
        run = true;
        InicTime = new Date();
        ActualTime = InicTime;
        showClock();
    }
    else{
        run = false;
        saveOld();
    }
}
 
function resetClock(){
    if(run){
        run = false;
    }
 
    Hours = 0;
    Minutes = 0;
    Seconds = 0;
    Old.setTime(0);
    Old.setHours(0,0,0,0);
 
    document.getElementById("Hours").innerHTML = '0';
    document.getElementById("Minutes").innerHTML = '0';
    document.getElementById("Seconds").innerHTML = '0';
    document.getElementById("botonClock").innerHTML = 'Iniciar ';
}
 
function saveOld()
{
    Old.setTime(ActualTime.getTime() - InicTime.getTime()+ Old.getTime());
    Hours=0;
    Minutes=0;
    Seconds=0;
}
 
function saveClock(){
 
}
 
function initClock(){
    time = InicTime = new Date();
    document.getElementById("Hours").innerHTML = '0';
    document.getElementById("Minutes").innerHTML = '0';
    document.getElementById("Seconds").innerHTML = '0';
    document.getElementById("botonClock").innerHTML = 'Iniciar ';
}