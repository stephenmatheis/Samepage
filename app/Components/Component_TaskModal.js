/** RHC-C G-6 SharePoint Team */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_TaskModal(param) {
    const {
        close,
        parent,
        position,
    } = param;

    const component = Core_Component({
        type: 'card',
        html: /*html*/ `
            <div class='task-modal'>
                <div class='task-modal-close'>
                    <svg class='icon'>
                        <use href='#icon-cross'></use>
                    </svg>
                </div>
            </div>
        `,
        style: /*css*/ `
            #id.task-modal {
                pointer-events: all;
                z-index: 1000;
                position: absolute;
                top: 7.5%;
                left: 0;
                right: 0;
                margin: auto;
                background: white;
                min-height: 500px;
                max-height: 90%;
                width: 80%;
                max-width: 700px;
                padding: 40px;
                border-radius: 4px;
                border: ${App.defaultBorder};
                /* box-shadow: 0px 5px 15px 1px rgb(0 0 0 / 15%); */
                box-shadow: 5px 5px 0px 0px rgb(0 0 0 / 20%);
                transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
                overflow: overlay;
            }

            #id.task-modal:hover {
                box-shadow: 7.5px 7.5px 0px 0px rgb(0 0 0 / 30%);
            }

            #id .task-modal-close {
                z-index: 1000;
                cursor: pointer;
                position: absolute;
                top: 20px;
                right: 40px;
            }

            #id .task-modal-close .icon {
                fill: ${App.primaryColor};
                stroke: ${App.primaryColor};
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id .task-modal-close',
                event: 'click',
                listener: close
            }
        ]
    });

    return component;
}