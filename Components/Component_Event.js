/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Event(param) {
    const {
        event,
        parent,
        position
    } = param;

    const {
        Start,
        End,
        Claimed,
        FK_Command,
        FK_Group
    } = event;

    return Core_Component({
        type: 'card',
        html: /*html*/ `
            <div class='event'>
                <span class='event-day'>${new Date(Start).toLocaleDateString()}</span>    
                <span class='event-time'>${new Date(Start).toLocaleTimeString()} - ${new Date(End).toLocaleTimeString()}</span>
                <span class='event-claimed'>${Claimed === 'No' ? 'Open' : 'Taken'}</span>
                <span class='event-command'>${FK_Command || ''}</span>
                <span class='event-group'>${FK_Group || ''}</span>
            </div>
        `,
        style: /*css*/ `
            #id {
                background: white;
                width: 100%;
                /* width: 450px; */
                margin: 10px 0px;
                padding: 10px;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .event-day {
                font-weight: 500;
            }

            #id span:not(:last-child) {
                margin-right: 15px;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}