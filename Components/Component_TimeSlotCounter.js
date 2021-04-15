/** (C) 2021 Stephen Matheis */

/* Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_TimeSlotCounter(param) {
    const {
        group,
        startTime,
        endTime,
        parent,
        position
    } = param;

    /** Get hour prefix as number */
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);

    const component = Core_Component({
        html: /*html*/ `
            <div class='time-slots-label'>
                <span>Create </span>
                <span class='time-slots-count'>${end - start}</span>
                <span>1 hour meetings for </span>
                <span class='time-slots-group'>${group}</span>
                <span>?</span>
            </div>
        `,
        style: /*css*/ `
            #id.time-slots-label {
                font-size: 1.1em;
                font-weight: 500;
            }

            #id .time-slots-count,
            #id .time-slots-group {
                background: ${App.secondaryColor};
                padding: 2px 10px;
                color: ${App.primaryColor};
                border-radius: 4px;
            }
        `,
        parent,
        position,
        events: [

        ]
    });

    component.updateCounter = (param) => {
        if (param) {
            const {
                startTime: newStartTime,
                endTime: newEndTime,
                count,
            } = param;

            let value = '';

            if (count !== undefined) {
                value = count;
            } else {
                const start = parseInt(newStartTime.split(':')[0]);
                const end = parseInt(newEndTime.split(':')[0]);

                value = end - start;
            }

            component.find('.time-slots-count').innerText = value;
        }
    }

    return component;
}