/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Timer(param) {
    const {
        parent,
        onStart,
        onStop,
        onReset,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div>
                <div class="stopwatch" id="stopwatch">00:00:00</div>
                <button class="start">Start</button>
                <button class="stop">Stop</button>
                <button class="reset">Reset</button>
            </div>
        `,
        style: /*css*/ `
            .stopwatch {
                margin: 20px 0px;
                font-size: 1.5em;
                font-weight: bold;
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: `#id .start`,
                event: 'click',
                listener: start
            },
            {
                selector: `#id .stop`,
                event: 'click',
                listener: stop
            },
            {
                selector: `#id .reset`,
                event: 'click',
                listener: reset
            }
        ]
    });

    let time;
    let ms = 0;
    let sec = 0;
    let min = 0;

    function timer() {
        ms++;
        
        if (ms >= 100){
            sec++
            ms = 0
        }

        if (sec === 60){
            min++
            sec = 0
        }

        if (min === 60){
            ms, sec, min = 0;
        }

        let newMs = ms < 10 ? `0${ms}`: ms;
        let newSec = sec < 10 ? `0${sec}` : sec;
        let newMin = min < 10 ? `0${min}` : min;

        component.find('.stopwatch').innerHTML = `${newMin}:${newSec}:${newMs}`;
    };
    
    function start(){
        time = setInterval(timer, 10);

        if (onStart) {
            onStart();
        }
    }
    
    function stop(){
        clearInterval(time)
        
        if (onStop) {
            onStop();
        }
    }
    
    function reset(){
        ms = 0;
        sec = 0;
        min = 0;

        component.find('.stopwatch').innerHTML = '00:00:00';

        if (onReset) {
            onReset();
        }
    }
    
    return component;
}