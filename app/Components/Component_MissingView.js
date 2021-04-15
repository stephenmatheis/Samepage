/** RHC-C G-6 SharePoint Team */

import Core_Component from '../Core/Core_Component.js'

export default function Component_MissingView(options) {
    const {
        parent,
        position
    } = options;

    return Core_Component({
        html: /*html*/ `
            <div>404</div>
        `,
        style: /*css*/ `
            
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}