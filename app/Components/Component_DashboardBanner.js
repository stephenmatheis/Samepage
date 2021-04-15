/** RHC-C G-6 SharePoint Team */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_DashboardBanner(param) {
    const {
        data,
        margin,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='dashboard-banner'>
                ${buildDashboard()}
            </div>
        `,
        style: /*css*/ `
            #id {
                margin: ${margin || '20px'};
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
                /* display: flex; */
                display: flex;
                justify-content: space-between;
            }

            #id .dashboard-banner-group {
                flex: 1;
                padding: 10px 15px;
                border-radius: 4px;
            }

            #id .dashboard-banner-group:not(:last-child) {
                margin-right: 10px;
            }

            #id .dashboard-banner-label,
            #id .dashboard-banner-description {
                white-space: nowrap;
                font-size: .9em;
            }

            #id .dashboard-banner-value {
                font-size: 2.5em;
                font-weight: 500;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [

        ]
    });

    function buildDashboard() {
        let html = '';

        data.forEach(item => {
            const {
                label,
                value,
                description,
                color,
                background
            } = item;

            html += /*html*/ `
                <div class='dashboard-banner-group' style='background: ${background || 'transparent'}'>
                    <div class='dashboard-banner-label' style='color: ${color || App.defaultColor}'>${label}</div>
                    <div class='dashboard-banner-value' style='color: ${color || App.defaultColor}'>${value}</div>
                    <div class='dashboard-banner-description' style='color: ${color || App.defaultColor}'>${description || ''}</div>
                </div>
            `;
        });
        
        return html;
    }

    return component;
}