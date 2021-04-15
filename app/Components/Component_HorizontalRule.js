/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_HorizontalRule(param) {
    const {
        parent,
        position,
        margin,
        height,
        color,
        width,
        padding
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='horizontal-rule-container'>
                <div class='horizontal-rule'></div>
            </div>
        `,
        style: /*css*/ `
            #id.horizontal-rule-container {
                margin: ${margin || '20px 40px'};
                padding: ${padding || '0px'};
                width: ${width || '100%'};
                display: flex;
                align-items: center;
                justify-content: center;
            }
        
            #id .horizontal-rule {
                height: ${height || '3px'};
                width: 90%;
                background: ${color || App.primaryColor};
            }
        `,
        parent: parent,
        position,
        events: [

        ]
    });

    return component
}