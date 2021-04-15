/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_RoundSquareCard(param) {
    const {
        action,
        title,
        total,
        completed,
        parent,
        position,
    } = param;

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const component = Core_Component({
        html: /*html*/ `
            <div class='card'>
                <!-- Card Label -->    
                <div class='card-title'>
                    <span class='card-title-text'>${title}</span>
                </div>
                <!-- Status container -->
                <div class='tasks-status-container'>
                    <div class='total'>
                        <div>Tasks</div>
                        <div>${completed} / ${total}</div>
                    </div>
                    <div class='percent-complete-container'>
                        <div class='percent-complete-status' style='height: 8px; width:${percent}%'></div>
                    </div>
                    <div class='percent-complete-text'>${percent}% complete</div>
                </div>
            </div>
        `,
        style: /*css*/ `
            #id.card {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                position: relative;
                /* width: 200px; */
                height: 150px;
                padding: 5px 10px;
                margin: 15px 15px 0px 0px;
                background: white;
                border-radius: 5px;
                border: solid rgba(0,0,0,0.2) 1px;
                box-shadow: 5px 5px 0px 0px rgb(0 0 0 / 20%);
                /* box-shadow: 3px 3px 0px 2px ${App.primaryColor}; */
                transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            #id.card:hover {
                cursor: pointer;
                /* box-shadow: 3px 3px 0px 2px rgb(0 0 0 / 40%); */
                box-shadow: 7.5px 7.5px 0px 0px ${App.primaryColor};
            }

            #id .card-title {
                font-weight: 600;
                font-size: 1.2em;
                /* padding-bottom: 10px; */
                white-space: nowrap;
                /* overflow: hidden; */
                text-overflow: ellipsis;
            }

            #id .new-bubble {
                z-index: 100;
                position: absolute;
                top: -12px;
                right: -12px;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                margin: 5px;
                background: red;
                display: grid;
                place-content: center;
            }

            #id .new-bubble span {
                color: white;
                font-weight: 700;
            }

            #id .tasks-status-container {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            #id .total {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            #id .percent-complete-container {
                margin: 15px 0px 10px 0px;
                background: lightgray;
                border-radius: 2px;
            }

            #id .percent-complete-status {
                background: lightslategray;
                border-radius: 2px;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id',
                event: 'click',
                listener(event) {
                    if (action) {
                        action(event);
                    }
                }
            }
        ]
    });

    function testFunc(event) {
        console.log(event, this);
    }

    component.addBubble = (count) => {
        if (count > 0) {
            const html = /*html*/ `
                <div class='new-bubble'>
                    <span>${count}</span>
                </div>
            `;

            component.get().insertAdjacentHTML('afterbegin', html);
        }
    }
    
    return component;
}