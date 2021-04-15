/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_DateField(param) {
    const {
        label,
        labelWeight,
        background,
        date,
        parent,
        position,
        onFocusout
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='form-field'>
                <div class='form-field-label'>${label}</div>
                <input class='form-field-date' type='date' ${date ? `value=${date.toISOString().split('T')[0]}` : ''}>
            </div>
        `,
        style: /*css*/ `
            /* Rows */
            #id.form-field {
                margin-bottom: 20px;
                
            }

            /* Labels */
            #id .form-field-label {
                font-size: 1.1em;
                font-weight: ${labelWeight || 'bold'};
                padding-bottom: 5px;
            }

            #id .form-field-date {
                font-size: .9em;
                font-weight: 500;
                margin-top: 2px;
                margin-bottom: 4px;
                padding: 9px;
                background: ${background || 'white'};
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .form-field-date:active,
            #id .form-field-date:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: '#id .form-field-date',
                event: 'focusout',
                listener: onFocusout
            }
        ]
    });

    component.value = (param) => {
        const field = component.find('.form-field-date');

        if (param) {
            field.value = new Date(param).toISOString().split('T')[0];
        } else {
            return field.value;
        }
    }

    return component
}