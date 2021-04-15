/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Button(options) {
    const {
        color,
        margin,
        padding,
        disabled,
        icon,
        root,
        parent,
        position,
        action
    } = options;


    const component = Core_Component({
        html: /*html*/ `
            <span class='button ${color || ''} ${disabled ? 'disabled' : ''}' >
                ${icon}
            </span>
        `,
        style: /*css*/ `
            /* Default style */
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 1.5em;
                margin: ${margin || '0px 10px'};
                padding: ${padding || '10px'};
            }

            .button .icon {
                stroke: ${App.primaryColor};
                fill: ${App.primaryColor};
            }

            /* Colors */
            .button.green .icon {
                stroke: mediumseagreen;
                fill: mediumseagreen;
            }

            /* Disabled */
            .button.disabled {
                pointer-events: none;
            }
            
            .button.disabled .icon {
                pointer-events: none;
                stroke: lightgray;
                fill: lightgray;
            }
        `,
        parent: parent,
        root: root,
        position: position || 'beforeend',
        events: [
            {
                selector: `#id`,
                event: 'click',
                listener: runAction
            }
        ]
    });

    function runAction(event) {
        if (action) {
            action(event);
        }
    }

    component.enable = () => {
        const button = component.get();

        button.classList.remove('disabled');
    }

    component.disable = () => {
        const button = component.get();

        button.classList.add('disabled');
    }

    return component;
}