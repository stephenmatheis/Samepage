/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

export default function Component_Heading(options) {
    const {
        id,
        parent,
        text,
    } = options;

    const componentId = `${id}-message`;

    return Core_Component({
        type: 'message',
        html: /*html*/ `
            <div id=${componentId} class='message'>
                <div>${text}</div>
            </div>
        `,
        style: /*css*/ `
            .message {
                padding: 10px;
                border-radius: 4px 4px 0px 0px;
            }

            .message > div {
                font-size: 1.2em;
                text-align: center;
                font-weight: 500;
                color: ${window.App.defaultColor};
            }
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            
        ]
    });
}