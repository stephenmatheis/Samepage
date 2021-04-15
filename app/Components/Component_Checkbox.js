/** RHC-C G-6 SharePoint Team */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Checkbox(param) {
    const {
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <span data-checked='false'>
                <svg class='icon'>
                    <use href='#icon-checkbox-unchecked'></use>
                </svg>
            </span>
        `,
        style: /*css*/ `
            #id .icon {
                fill: white;
                stroke: white;
            }

            #id .task-card-text-container {
                margin-left: 15px;
            }

            #id .task-card-text {
                font-weight: 400;
                font-size: 1;
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