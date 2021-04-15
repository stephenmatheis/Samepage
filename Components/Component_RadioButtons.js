/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_NewRequestForm(param) {
    const {
        label,
        description,
        buttons,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='form-field'>
                <div class='form-field-label'>${label}</div>
                ${description ? /*html*/`<div class='form-field-description'>${description}</div>` : ''}
                <div class='form-field-radio-options'>
                    ${createRadioOptions()}
                </div>
            </div>
        `,
        style: /*css*/ `
            .form-field {
                margin-bottom: 20px;
            }

            .form-field-label {
                font-size: 1.1em;
                font-weight: bold;
                padding-bottom: 5px;
            }

            #id .form-field-description {
                padding-bottom: 5px;
            }

            .form-field-radio-options {
                display: flex;
                flex-direction: row;
            }

            .radio {
                user-select: none;
                cursor: pointer;
                font-weight: 500;
                font-size: 1.2em;
                padding: 5px 10px;
                background: white;
                margin: 5px 10px;
                border-radius: 4px;
                border:  ${App.defaultBorder};
            }

            .radio:focus,
            .radio-active {
                outline: none;
                background: ${App.primaryColor};
                color: ${App.secondaryColor};
                transform: scale(1.2);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            }

            .radio-selected {
                background: ${App.primaryColor};
                color: ${App.secondaryColor};
                transform: scale(1.2);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: '#id .radio',
                event: 'click',
                listener: selectRadio
            }
        ]
    });

    function createRadioOptions() {
        let html = '';

        buttons.forEach(button => {
            const {
                id,
                value
            } = button;

            html += /*html */ `
                <div class='radio' data-itemid='${id}'>${value}</div>
            `;
        });

        return html;
    }

    function selectRadio (event) {
        const radioButtons = component.findAll('.radio');

        radioButtons.forEach(button => {
            button.classList.remove('radio-selected');
        });

        event.target.classList.add('radio-selected');
    }

    component.value = (param) => {
        const field = component.find('.radio-selected');

        if (param) {
            field.innerText = param;
        } else {
            return value;
        }
    }

    return component
}