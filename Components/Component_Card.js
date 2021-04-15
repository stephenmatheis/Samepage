/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Card(param) {
    const {
        innerHTML,
        parent,
        position,
        maxWidth
    } = param;

    return Core_Component({
        type: 'card',
        html: /*html*/ `
            <div class='card'>${innerHTML || ''}</div>
        `,
        style: /*css*/ `
            #id.card {
                ${maxWidth ? `max-width: ${maxWidth};` : ''}
                display: flex;
                flex-direction: column;
                background: white;
                width: 100%;
                min-height: 100px;
                margin-top: 20px;
                padding: 20px;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}