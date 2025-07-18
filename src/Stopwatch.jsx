import React,{useState,useEffect,useRef} from 'react';
function Stopwatch(){
    const [isrunning,setisrunning]=useState(false);
    const [elapsed,setelapsed] = useState(0);
    const intervalidref = useRef(null);
    const starttimeref=useRef(0);
    useEffect(
        ()=>{
            if(isrunning){
                intervalidref.current= setInterval(
                    ()=>{
                        setelapsed(Date.now()-starttimeref.current);
                    },10
                );
            }
            return ()=>{
                clearInterval(intervalidref.current);
            }
        },[isrunning]
    );
    function start(){
        setisrunning(true);
        starttimeref.current=Date.now()-elapsed;
    }
    function stop(){
        setisrunning(false);
    }
    function reset(){
        setelapsed(0);
        setisrunning(false);
    }
    function formatTime(){
        let hours=Math.floor(elapsed / (1000*60*60));
        let minutes= Math.floor(elapsed/(1000*60)%60);
        let seconds = Math.floor(elapsed/(1000)%60);
        let milliseconds = Math.floor((elapsed%1000)/10);
        hours = String(hours).padStart(2,"0");
        minutes=String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");
        return `${minutes}:${seconds}:${milliseconds}`;
    }
    return(
        <div className="stopwatch">
            <div className="display">
                {formatTime()}
            </div>
            <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>

            </div>
        </div>
    )
}
export default Stopwatch;