/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_ChartButtons(param) {
    const {
        parent,
    } = param;
    
    return Core_Component({
        html: /*html*/ `
            <div class='chart-buttons-container'>
                <div class='circle-chart-button chart-button'>
                    <svg class='icon'><use href='#icon-open-circle'></use></svg>
                </div>
                <div class='line-chart-button chart-button'>
                    <svg class='icon'><use href='#icon-stats-dots'></use></svg>
                </div>
                <div class='bar-chart-button chart-button'>
                    <svg class='icon'><use href='#icon-stats-bars'></use></svg>
                </div>
            </div>
        `,
        style: /*css*/ `
            .chart-buttons-container {
                margin-left: 10px;
            }

            .chart-button {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5em;
                padding: 15px;
                margin-bottom: 10px;
                background: white;
                border-radius: 4px;
                border:  ${App.defaultBorder};
            }

            .chart-button .icon {
                stroke: ${App.primaryColor};
                fill: ${App.primaryColor};
            }
        `,
        parent,
        position: 'beforeend',
        events: [
            
        ]
    });
}