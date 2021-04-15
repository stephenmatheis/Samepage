/** RHC-C G-6 SharePoint Team */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_ReportButton(param) {
    const {
        text,
        parent,
        action,
        color,
        background,
        margin,
        padding
    } = param;
    
    const component = Core_Component({
        html: /*html*/ `
            <div class='report-button'>${text}</div>
        `,
        style: /*css*/ `
            #id.report-button {
                width: 100%;
                cursor: pointer;
                margin: ${margin || '0px 10px 10px 0px'};
                padding: ${padding || '5px 10px'};
                text-align: center;
                font-size: 1em;
                background: ${background};
                color: ${color};
                border-radius: 4px;
                border:  ${App.defaultBorder};
            }

            #id.report-button.selected {
                color: ${background};
                background: ${color};
            }
        `,
        parent,
        position: 'beforeend',
        events: [
            {
                selector: '#id.report-button',
                event: 'click',
                listener: action
            }
        ]
    });

    component.select = () => {
        component.get().classList.add('selected');
    }

    component.deSelect = () => {
        component.get().classList.remove('selected');
    }

    return component;
}