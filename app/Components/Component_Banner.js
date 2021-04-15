/** RHC-C G-6 SharePoint Team */

import Core_Component from '../Core/Core_Component.js'

export default function Component_Banner(param) {
    const {
        text,
        fixed,
        parent,
        position,
        size,
        margin,
        type
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='banner ${fixed ? 'fixed' : 'normal'} ${type || ''}'>${text}</div>
        `,
        style: /*css*/ `
            #id.banner {
                cursor: default;
                font-size: ${size || '1.5em'};
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id.fixed {
                background: lightyellow;
                border-left: solid 4px gold;
                position: fixed;
                top: 5px;
                right: 15px;
                padding: 5px;
            }

            #id.normal {
                display: inline-block;
                background: white;
                border-left: solid 10px ${App.primaryColor};
                margin: ${margin || '20px 0px'};
                padding: 10px;
            }

            #id.info {
                background: linen;
                border-left: solid 10px orange;
            }
        `,
        parent,
        position
    });

    return component;
}