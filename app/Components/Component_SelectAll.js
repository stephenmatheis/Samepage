/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_SelectAll(options) {
    const {
        id,
        root,
        parent,
        position,
        tables
    } = options;

    const componentId = `${id}-select-all`;

    const component = Core_Component({
        type: 'select-all',
        html: /*html*/ `
            <div class="select-all-container">
                <label class="select-all">
                    <input type="checkbox"  id=${componentId} />
                    <span class="toggle"></span>
                </label>
            </div>
        `,
        style: /*css*/ `
            .select-all-container {
                display: inline-flex;
                flex-direction: row;
                justify-content: flex-end;
                border-radius: 4px;
                /* padding: 10px; */
                margin: 20px 0px;
                background: white;
                border:  ${App.defaultBorder};
            }

            .select-all {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 1.5em;
                margin: 0px 20px;
                /* padding: 10px; */
            }

            .select-all input[type='checkbox'] {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            .select-all input[type='checkbox'] ~ .toggle {
                width: 20px;
                height: 20px;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                /* border: solid 2px seagreen; */
                border: solid 2px lightgray;
                border-radius: 4px;
                cursor: pointer;
            }

            .select-all input[type='checkbox']:hover ~ .toggle {
                border-color: mediumseagreen;
            }
            

            .select-all input[type='checkbox']:checked ~ .toggle {
                border: solid 2px mediumseagreen;
                background: mediumseagreen url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
            }
        `,
        parent: parent,
        root: root,
        position: position || 'beforeend',
        events: [
            {
                selector: `.select-all input[type='checkbox']`,
                event: 'change',
                listener: selectAll
            }
        ]
    });

    let currentTables = tables;

    function selectAll(event) {
        currentTables.forEach(table => table.selectAll(this.checked));
    }

    component.removeTable = (tableToRemove) => {
        currentTables = currentTables.filter(table => table !== tableToRemove);
    }

    component.getStartingTableCount = () => {
        return tables.length;
    }

    component.getCurrentTableCount = () => {
        return currentTables.length;
    }

    return component;
}