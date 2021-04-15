/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_StickyToolbar(param) {
    const {
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='sticky-toolbar'></div>
        `,
        style: /*css*/ `
            .sticky-toolbar {
                position: sticky;
                top: 0;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                background: ${App.secondarColor};
                border-bottom: solid 2px ${App.primaryColor};
            }
        `,
        parent,
        position,
        events: [

        ]
    });

    return component
}