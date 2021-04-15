/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_FieldMessage(param) {
    const {
        message,
        parent,
        margin,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='field-message'>
                <div>${message}</div>
            </div>
        `,
        style: /*css*/ `
            #id {
                display: flex;
                padding: 10px;
                margin: ${margin || '0px 10px'};
                font-size: .9em;
                font-weight: 500;
                background: pink;
                border: solid 1px transparent;
                border-left: solid 10px crimson;
                border-radius: 4px;
            }
        `,
        parent: parent,
        position,
        events: [

        ]
    });

    return component
}