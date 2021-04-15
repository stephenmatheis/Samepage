/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_MultiSelectCheckbox(param) {
    const {
        label,
        labelWeight,
        options,
        onCheck,
        direction,
        wrap,
        parent,
        width,
        position,
        margin,
        padding,
        fieldMargin,
        onAddNewItem
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='form-field'>
                ${label ? /*html*/ `<div class='form-field-label'>${label}</div>` : ''}
                ${createChoiceGroups()}
            </div>   
        `,
        style: /*css*/ `
            #id.form-field {
                margin: ${fieldMargin || '0px 0px 20px 0px'};
            }

            #id .form-field-label {
                font-size: 1.1em;
                font-weight: ${labelWeight || 'bold'};
                padding-bottom: 5px;
            }

            #id .form-field-multi-select-container {
                display: flex;
                flex-direction: ${direction || 'column'};
                flex-wrap: ${wrap || 'wrap'};
                user-select: none;
                /*margin: 2px 20px;*/
                padding: ${padding || '0px 0px 20px 0px'};
                margin: ${margin || '0px'};
            }

            #id .form-field-multi-select-row {
                width: ${width || '120px'};
                /* margin-left: 20px; */
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            #id .form-field-multi-select-row:first-child {
                margin-top: 5px;
            }

            #id .form-field-multi-select-row:not(:last-child) {
                margin-bottom: 10px;
            }

            #id .form-field-multi-select-row.flex-start {
                width: ${width || '120px'};
                margin-left: 20px;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
            }

            #id .form-field-multi-select-row.flex-start .form-field-multi-select-value,
            #id .form-field-multi-select-row.flex-start .select-all-title {
                margin-top: 2px;
            }

            ${direction === 'row' ?
                /*css*/`
                    #id .form-field-multi-select-row {
                        margin-left: 20px;
                        margin-bottom: 10px;
                    }
                ` :
                ''
            }

            #id .form-field-multi-select-value,
            #id .select-all-title {
                white-space: nowrap;
                margin-left: 5px;
                padding: 0px;
                font-size: 1em;
                border: none;
                outline: none;
            }

            #id .select-all-title {
                color: ${App.primaryColor};
                font-weight: 500;
                padding: 5px 0px;
            }

            #id input[type='checkbox'] {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            #id input[type='checkbox'] ~ .toggle {
                width: 20px;
                height: 20px;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                background: white;
                border: solid 2px lightgray;
                border-radius: 4px;
                cursor: pointer;
            }

            #id input[type='checkbox']:hover ~ .toggle {
                border-color: mediumseagreen;
            }

            #id input[type='checkbox']:checked ~ .toggle {
                border: solid 2px mediumseagreen;
                background: mediumseagreen url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
            }

            /** List Styles */
            #id ul {
                margin: 0px;
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: '#id  input.select-all',
                event: 'change',
                listener: selectAll
            },
            {
                selector: '#id input:not(.select-all)',
                event: 'change',
                listener: toggleSelectALL
            },
            {
                selector: '#id .form-field-multi-select-value.add-an-item',
                event: 'keypress',
                listener(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();

                        /** Runtime */
                        if (onAddNewItem) {
                            onAddNewItem(event);
                        }

                        return false;
                    }
                }
            },
            {
                selector: '#id .form-field-multi-select-value.add-an-item',
                event: 'focusout',
                listener: onAddNewItem
            }
        ]
    });

    function createChoiceGroups() {
        let html = ''

        options.forEach(group => {
            const {
                title,
                items,
                align
            } = group;

            html += /*html*/ `
                <div class='form-field-multi-select-container' data-group='${title}'>
            `;

            if (title !== '') {
                html += /*html*/ `
                    <div class='form-field-multi-select-row ${align}'>
                        <label>
                            <input type='checkbox' class='select-all' data-group='${title}'>
                            <span class='toggle'></span>
                        </label>
                        <span class='select-all-title'>${title}</span>
                    </div>
                `;
            }

            items.forEach(item => {
                html += rowTemplate(item, title, align);
            });

            html += /*html*/ `
                    <div class='form-field-multi-select-row'>
                        <label>
                            <input type='checkbox' disabled>
                            <span class='toggle'></span>
                        </label>
                        <input type='text' class='form-field-multi-select-value add-an-item' placeholder='Add an item'>
                    </div>
                </div>
            `;
        });

        return html;
    }

    function rowTemplate(item, group, align) {
        const {
            id,
            value,
            checked,
            CompletedBy,
            CompletedDate
        } = item;

        console.log(id, CompletedBy);

        return /*html*/ `
            <div class='form-field-multi-select-row ${align}'>
                <label>
                    <input type='checkbox' data-group='${group}' data-itemid='${id}'${checked ? ' checked' : ''}>
                    <span class='toggle'></span>
                </label>
                <span class='form-field-multi-select-value'>${value}</span>
                <!-- If Completed, show name -->
                <!-- <span class="assigned-name" data-account="stephen.matheis"></span> -->
            </div>
        `;
    }

    /** Select all Radio buttons in group */
    function selectAll(event) {
        const group = this.dataset.group;
        const state = this.checked;
        const radioButtons = component.findAll(`input[data-group='${group}']`);

        radioButtons.forEach(button => {
            button.checked = state;
        });
    }

    /** Auto toggle Group Title Radio button */
    function toggleSelectALL(event) {
        const group = this.dataset.group;
        const all = component.findAll(`input[data-group='${group}']:not(.select-all)`).length;
        const checked = component.findAll(`input[data-group='${group}']:not(.select-all):checked`).length;
        const state = all === checked ? true : false;

        const selectAll = component.find(`input.select-all[data-group='${group}']`);

        if (selectAll) {
            selectAll.checked = state;
        }

        if (onCheck) {
            onCheck(event);
        }
    }

    component.setValue = (itemId, value) => {
        const checkbox = component.find(`input[data-itemid='${itemId}']`);

        if (checkbox) {
            checkbox.checked = value;
        }
    }

    component.addOption = (param) => {
        const {
            option,
            group
        } = param;

        const container = component.find(`.form-field-multi-select-container[data-group='${group}']`);

        container.insertAdjacentHTML('beforeend', rowTemplate(option, group, true));

        const node = component.find(`input[data-group='${group}'][data-itemid='${itemToAdd.id}']`);

        if (node) {
            node.addEventListener('change', toggleSelectALL);
        }
    }

    component.addItemAbove = (param) => {
        const {
            group,
            itemToAdd,
            item
        } = param;

        const row = item.closest('.form-field-multi-select-row');

        row.insertAdjacentHTML('beforebegin', rowTemplate(itemToAdd, group, true));

        const node = component.find(`input[data-group='${group}'][data-itemid='${itemToAdd.id}']`);

        if (node) {
            node.addEventListener('change', toggleSelectALL);
        }

        item.value = '';
    }

    component.value = (type) => {
        const rows = component.findAll('.form-field-multi-select-row input:checked');

        return [...rows].map(item => {
            if (type === 'id') {
                return parseInt(item.dataset.itemid);
            } else {
                const value = item.closest('.form-field-multi-select-row').querySelector('.form-field-multi-select-value')

                return value.innerText;
            }
        });
    }

    return component
}