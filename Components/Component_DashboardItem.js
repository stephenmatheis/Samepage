/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_DashboardLongCard(param) {
    const {
        title,
        subTitle,
        text,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='dashboard-item'>
                <div class='dashboard-item label'>${title}</div>
                <div class='dashboard-item bold'>${subTitle}</div>
                <div class='dashboard-item normal'>${text}</div>
            </div>
        `,
        style: /*css*/ `
            #id {
                /* margin: 20px; */
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
                display: flex;
                align-items: center;
                /* flex: 1; */
            }

            #id .dashboard-item:not(:last-child) {
                margin-right: 20px;
            }

            #id .dashboard-item.label {
                font-size: 1.2em;
                color: ${App.primaryColor};
                font-weight: 500;
            }

            #id .dashboard-item.bold {
                font-weight: 500;
            }

            #id .dashboard-item.normal {
                font-weight: 400;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [

        ]
    });

    return component;
}