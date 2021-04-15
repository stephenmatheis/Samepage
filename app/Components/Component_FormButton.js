/** RHC-C G-6 SharePoint Team */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_FormButton(param) {
    const {
        type,
        value,
        display,
        margin,
        parent,
        action,
    } = param;

    return Core_Component({
        html: /*html*/ `
            <div class="form-button ${type}-button">${value}</div>
        `,
        style: /*css*/ `
            .form-button {
                cursor: pointer;
                display: ${display || 'inline-block'};
                margin: ${margin || '0px 20px 0px 0px'};
                padding: 5px 10px;
                font-weight: bold;
                text-align: center;
                border-radius: 4px;
            }

            .normal-button {
                color: white;
                background: ${App.primaryColor};
                border: solid 2px ${App.primaryColor};
            }

            .back-button,
            .hollow-button {
                color: ${App.primaryColor};
                background: ${App.secondaryColor};
                border: solid 2px ${App.primaryColor};
            }

            .cancel-button {
                color: ${App.defaultColor};
                background: transparent;
                border: solid 2px ${App.defaultColor};
            }

            .create-button,
            .update-button {
                color: ${App.secondaryColor};
                background: mediumseagreen;
                border: solid 2px seagreen;
            }

            .stop-button {
                color: ${App.secondaryColor};
                background: crimson;
                border: solid 2px firebrick;
            }

            .delete-button {
                color: firebrick;
                text-decoration: underline;
                font-size: .9em;
            }

            /* .delete-button {
                color: ${App.secondaryColor};
                background: firebrick;
                border: solid 2px firebrick;
                box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
            } */
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            {
                selector: '#id.form-button',
                event: 'click',
                listener: action
            }
        ]
    });
}