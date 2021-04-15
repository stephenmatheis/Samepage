/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Email(param) {
    const {
        label,
        description,
        value,
        readOnly,
        parent,
        position,
        width,
        margin,
        flex,
        maxWidth,
        fieldMargin,
        keypress,
    } = param;

    let events = [];

    if (keypress) {
        events.push({
            selector: '#id .form-field-email',
            event: 'keydown',
            listener(event) {
                keypress(event);
            }
        });
    }

    const component = Core_Component({
        html: /*html*/ `
            <div class='form-field'>
                <div class='form-field-label'>${label || 'Email'}</div>
                ${description ? /*html*/`<div class='form-field-description'>${description}</div>` : ''}
                ${readOnly ? /*html*/ `<div class='form-field-email readonly'>${value || ''}</div>` : /*html*/ `<div class='form-field-email editable' contenteditable='true'>${value || ''}</div>`}
            </div>
        `,
        style: /*css*/ `
            #id.form-field {
                margin: ${fieldMargin || '0px 0px 20px 0px'};
                ${flex ? `flex: ${flex}` : ''}
                max-width: ${maxWidth || 'unset'};
            }

            #id .form-field-label {
                font-size: 1.1em;
                font-weight: bold;
                padding-bottom: 5px;
            }

            #id .form-field-description {
                padding-bottom: 5px;
            }

            #id .form-field-email {
                width: ${width || 'unset'};
                min-height: 42px;
                font-size: .9em;
                font-weight: 500;
                margin: ${margin || '2px 0px 4px 0px'};
                padding: 10px;;
                border-radius: 4px;
                background: white;
                border: ${App.defaultBorder};
            }

            #id .form-field-email.readonly {
                user-select: none;
                background: transparent;
                border: solid 1px transparent;
            }

            #id .form-field-email.editable:active,
            #id .form-field-email.editable:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }
        `,
        parent: parent,
        position,
        events
    });

    component.focus = () => {
        const field = component.find('.form-field-email');

        field.focus();
    }

    component.value = (param) => {
        const field = component.find('.form-field-email');

        if (param !== undefined) {
            field.innerText = param;
        } else {
            return field.innerText;
        }
    }

    return component
}