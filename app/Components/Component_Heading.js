/** RHC-C G-6 SharePoint Team */

import Core_Component from '../Core/Core_Component.js'

export default function Component_Heading(param) {
    const {
        text,
        margin,
        padding,
        parent,
        align,
        size
    } = param;

    return Core_Component({
        html: /*html*/ `
            <div class='heading'>
                <h1>${text}</h1>
            </div>
        `,
        style: /*css*/ `
            #id.heading h1{
                font-size: ${size || '2em'};
                font-weight: 400;
                color: ${window.App.primaryColor};
                margin: ${margin || '50px 0px 20px 0px'};
                padding: ${padding || '0px'};
                text-align: ${align || 'left'};
            }
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            
        ]
    });
}