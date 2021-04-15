/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Text(param) {
    const {
        text,
        parent,
        position,
        margin,
        padding,
        height,
        display
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='center'>
                ${text}
            </div>
        `,
        style: /*css*/ `
            #id {
                margin: ${margin || '0px'};
                padding: ${padding || '0px'};
                height: ${height || 'unset'};
                display: ${display || 'flex'};
                align-items: center;
                justify-content: center;
            }

            #id.center {
                font-size: 1.5em;
                font-weight: 500;
                display: flex;
                justify-content: center;
                width: 75%;
                height: 25%;
                margin: auto;
                position: fixed;
                top: 0; 
                left: 0; 
                bottom: 0; 
                right: 0;
            }
        `,
        parent: parent,
        position,
        events: [

        ]
    });

    return component
}