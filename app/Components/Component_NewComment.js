/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_NewComment(param) {
    const {
        parent,
        position,
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='new-comment-container'>
                <div class='new-comment-text' contenteditable='true'></div>
                <div class='new-comment-button'></div>
            </div>
        `,
        style: /*css*/ `
            .new-comment-container {
                display: flex;
                width: 100%;
            }

            #id.form-field {
                margin: ${fieldMargin || '0px 0px 20px 0px'};
                ${!description ? 'width: 100%' : ''};
            }

            #id .form-field-label {
                font-size: 1.1em;
                font-weight: bold;
                /* padding-left: 5px;
                padding-top: 5px; */
                padding-bottom: 5px;
            }

            #id .form-field-description {
                font-size: 1em;
                font-weight: 400;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }

            #id .form-field-multi-line-text {
                font-size: .9em;
                font-weight: 500;
                margin-top: 2px;
                margin-bottom: 4px;
                min-height: ${minHeight || `300px`};
                width: ${width || 'unset'};
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .form-field-multi-line-text:active,
            #id .form-field-multi-line-text:focus {
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
        const field = component.find('.form-field-multi-line-text');

        field.focus();
    }

    component.value = (param) => {
        const field = component.find('.form-field-multi-line-text');

        if (param !== undefined) {
            field.innerText = param;
        } else {
            return field.innerText;
        }
    }

    return component
}