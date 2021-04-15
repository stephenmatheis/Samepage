/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

export default function Component_Form(options) {
    const id = `${options.id}-form`;

    return Core_Component({
        type: 'form',
        html: /*html*/ `
            <div id=${id} class='form'></div>
        `,
        style: /*css*/ `
            /* Container */
            .form {
                padding: 30px 60px;
                margin: 40px;
                background: ${window.App.secondaryColor};
                border-radius: 4px;
                box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
                overflow: auto;
                /* overscroll-behavior: contain; /* Prevent parent scroll while cursor in card */
            }
        `,
        parent: options.parent,
        position: 'beforeend',
        events: [

        ]
    });
}