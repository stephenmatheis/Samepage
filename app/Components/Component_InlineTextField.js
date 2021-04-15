/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_InLineTextField(param) {
    const {
        before,
        after,
        parent,
        position,
        width
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='form-field'>
                <div>${before}</div>
                <div class='form-field-in-line-text' contenteditable='true'></div>
                <div>${after}</div>
            </div>
        `,
        style: /*css*/ `
            #id.form-field {
                margin: 0px;
                display: flex;
                align-items: center;
            }

            #id .form-field-in-line-text {
                width: ${width || 'unset'};
                font-size: .9em;
                font-weight: 500;
                margin: 0px 5px;
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .form-field-in-line-text:active,
            #id .form-field-in-line-text:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }
        `,
        parent: parent,
        position,
        events: [

        ]
    });

    component.focus = () => {
        const field = component.find('.form-field-in-line-text');

        field.focus();
    }

    component.value = (param) => {
        const field = component.find('.form-field-in-line-text');

        if (param) {
            field.innerText = param;
        } else {
            return field.innerText;
        }
    }

    return component
}