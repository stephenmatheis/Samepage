/* RHC-C SharePoint Team | Individual Critical Tasks List (ICTL) */

/* Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Modal(param) {
    const {
        title,
        addContent,
        buttons,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <!-- Modal -->
            <div class='modal fade' tabindex='-1' role='dialog' aria-hidden='true'>
                <div class='modal-dialog modal-lg' role='document'>
                    <div class='modal-content'>
                        <div class='modal-header'>
                            <h5 class='modal-title'>${title}</h5>
                            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div class='modal-body'>
                            <!-- Form elements go here -->
                        </div>
                        <div class='modal-footer hidden'>
                            ${addFooterButtons()}
                        </div>
                    </div>
                </div>
            </div>
        `,
        style: /*css*/ `
            #id .modal-title {
                color: ${App.primaryColor};
            }

            /** Button color */
            #id .btn-primary {
                background: mediumseagreen;
                border: solid 1px mediumseagreen;
            }

            /** Button focus */
            #id .btn:focus {
                box-shadow: none;
            }

            /** Footer */
            #id .modal-footer.hidden {
                display: none;
            }
        `,
        parent,
        position,
        events: [
            {
                selector: `#id .btn`,
                event: 'click',
                listener(event) {
                    const button = buttons.footer.find(item => item.value === event.target.dataset.value);

                    if (button && button.onClick) {
                        button.onClick(event);
                    }
                }
            }
        ],
        onAdd() {
            $(`#${component.get().id}`).modal();

            if (addContent) {
                addContent(component.getModalBody());
            }
        }
    });

    function addFooterButtons() {
        let html = '';

        if (buttons && buttons.footer && Array.isArray(buttons.footer) && buttons.footer.length > 0) {
            buttons.footer.forEach(button => {
                const {
                    value,
                    data,
                    classes,
                    inlineStyle
                } = button;

                html += /*html*/ `
                    <button ${inlineStyle ? `style='${inlineStyle}'` : ''} type='button' class='btn ${classes}' ${buildDataAttributes(data)} data-value='${value}'>${value}</button>
                `;
            });
        }

        return html;
    }

    function buildDataAttributes(data) {
        if (!data) {
            return '';
        }

        return data
            .map(attr => {
                const {
                    name,
                    value
                } = attr;

                return `data-${name}='${value}'`
            })
            .join(' ');
    }

    component.getModalBody = () => {
        return component.find('.modal-body');
    }

    component.hideFooter = () => {
        component.find('.modal-footer').classList.add('hidden');
    }

    component.showFooter = () => {
        component.find('.modal-footer').classList.remove('hidden');
    }
    component.getModal = () => {
        return $(`#${component.get().id}`);
    }

    return component;
}