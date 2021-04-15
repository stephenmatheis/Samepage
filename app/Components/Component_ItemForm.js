/** RHC-C G-6 SharePoint Team */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_ItemForm(param) {
    const {
        parent,
        position,
        list,
        fields,
        item
    } = param;

    const component = Core_Component({
        type: 'itemform',
        html: /*html*/ `
            <div class='item-form' data-list=${list} ${item ? `data-itemid=${item.Id}` : ''}>
                ${createFormHTML()}
            </div>
        `,
        style: /*css*/ `
            @media (min-width: 1000px) {
                .item-form {
                    max-width: 865px
                }
            }

            /* Form */
            .item-form {
                margin-bottom: 20px;
            }

            /* Rows */
            .item-form-row {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
            }

            /* Labels */
            .item-form-label {
                font-size: 1em;
                font-weight: bold;
                padding-left: 5px;
            }

            /* Fields */
            .item-form-field {
                font-size: .9em;
                margin-top: 2px;
                margin-bottom: 4px;
                padding: 10px;
                background: white;
                border: solid 1px lightgray;
                border-radius: 4px;
                font-weight: 500;
            }

            .item-form-field:active,
            .item-form-field:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }
        `,
        parent: parent,
        position: position || 'beforeend',
        events: [

        ]
    });

    function createFormHTML() {
        let html = '';

        fields.forEach(field => {
            const {
                label,
                internalFieldName
            } = field;

            html += /*html*/ `
                <div class='item-form-row'>
                    <div class='item-form-label'>${label}</div>
                    <div class='item-form-field' contenteditable="true" data-internalfieldname=${internalFieldName}>${item ? item[internalFieldName] : ''}</div>
                </div>
            `;
        });

        return html;
    }

    component.getFormData = () => {
        console.log('get form data');
    }

    return component;
}