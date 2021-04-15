/** RHC-C G-6 SharePoint Team */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_FloatingPalette(param) {
    const {
        parent,
        sections,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='palette-container'>
                <div class='palette-text'>Jump to section</div>
                <div class='palette-item-container'>
                    ${createHTML()}
                </div>
            </div>
        `,
        style: /*css*/ `
            .palette-container {
                display: flex;
                flex-direction: column-reverse;
                align-items: flex-end;
                margin: 10px;
                position: fixed;
                bottom: 0px;
                right: 0px;
                height: 100%;
                transition: flex 300ms ease-in-out;
            }

            .palette-item-container {
                flex: 0;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                overflow: auto;
                height: auto;
                padding: 0px 10px;
                transition: flex 300ms ease-in-out;
            }

            .palette-item {
                cursor: pointer;
                font-size: 1.5em;
                padding: 10px;
                margin: 10px 0px;
                color: ${App.primaryColor};
                background: white;
                border-radius: 4px;
                border-left: solid 5px ${App.primaryColor};
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }

            .palette-text {
                cursor: pointer;
                font-size: 1.5em;
                padding: 10px;
                margin: 10px;
                color: white;
                background: ${App.primaryColor};
                border-radius: 4px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            }

            .palette-text:hover ~ .palette-item-container {
                flex: 1;
            }

            .palette-item-container:hover {
                flex: 1;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [

        ]
    });

    function createHTML() {
        let html = '';

        sections.forEach(section => {
            html += /*html*/ `
                <div class='palette-item'>${section}</div>
            `;
        });

        return html;
    }

    return component;
}