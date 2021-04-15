/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_AddTaskCardButton(param) {
    const {
        action,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='add-task-card-button'>
                <div class='add-task-card-button-plus'>&plus;</div>
                <div class='add-task-card-button-text'>Add task</div>
            </div>
        `,
        style: /*css*/ `
            #id.add-task-card-button {
                user-select: none;
                cursor: pointer;
                display: flex;
                justify-content: flex-start;
                width: 300px;
                padding: 10px 20px;
                margin: 20px 15px 20px 0px;
                background: white;
                border-radius: 4px;
                border: solid rgba(0,0,0,0.2) 1px;
            }

            #id.add-task-card-button:hover {
                background: light;
            }

            #id.add-task-card-button * {
                color: ${App.primaryColor};
            }

            #id .add-task-card-button-plus {
                cursor: pointer;
                font-size: 1.8em;
                line-height: .5;
                margin-right: 10px;
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
                        action();
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

    component.checked = (value) => {
        if (value) {
            component.get().classList.add('completed');
        } else {
            component.get().classList.remove('completed');
        }

        component.find('input[type="checkbox"]').checked = value;
    }

    component.value = (value) => {
        const field = component.find('.task-card-text');

        if (value !== undefined) {
            field.innerText = value;
        } else {
            return field.innerText;
        }
    }
    
    return component;
}