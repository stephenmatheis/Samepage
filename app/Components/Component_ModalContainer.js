/** RHC-C G-6 SharePoint Team */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_ModalContainer(param) {
    const {
        parent,
        position,
        onClick
    } = param;

    const component = Core_Component({
        type: 'card',
        html: /*html*/ `
            <div class='modal-container'></div>
        `,
        style: /*css*/ `
            #id.modal-container {
                pointer-events: none;
                z-index: 1000;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id',
                event: 'click',
                listener: onClick
            }
        ]
    });

    return component;
}