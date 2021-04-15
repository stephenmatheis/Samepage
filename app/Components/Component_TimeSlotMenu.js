/** RHC-C G-6 SharePoint Team */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_TimeSlotMenu(param) {
    const {
        parent,
        onYes,
        onNo,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='time-slot-menu'>
                <div>Accept this time slot?</div>
                <div class='time-slot-menu yes'>Yes</div>
                <div class='time-slot-menu no'>No</div>
            </div>
        `,
        style: /*css*/ `
            #id {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 10px 0px;
            }

            #id .time-slot-menu {
                cursor: pointer;
                border-radius: 4px;
                padding: 2px 10px;
                font-weight: 500;
            }

            #id .time-slot-menu.yes {
                margin-left: 20px;
                border: solid 2px ${App.primaryColor};
                background: ${App.primaryColor};
                color: white;
            }

            #id .time-slot-menu {
                margin-left: 10px;
                border: solid 2px ${App.primaryColor};
                color: ${App.primaryColor};
            }
        `,
        parent,
        position: position || 'afterend',
        events: [
            {
                selector: '#id .yes',
                event: 'click',
                listener(event) {
                    onYes(parent.dataset.itemid);
                }
            },
            {
                selector: '#id .no',
                event: 'click',
                listener(event) {
                    onNo();
                }
            }
        ]
    });

    component.getId = () => {
        return parent.dataset.itemid;
    }

    return component;
}