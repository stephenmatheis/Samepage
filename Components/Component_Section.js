/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Section(param) {
    const {
        title,
        display,
        direction,
        parent,
        align,
        width,
        minWidth,
        minHeight,
        padding,
        description,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='section-container'>
                <div class='section-title'>${title}</div>
                ${description ? /*html*/`<div class='section-description'>${description}</div>` : ''}
            </div>
        `,
        style: /*css*/ `
            #id.section-container {
                display: ${display || 'flex'};
                flex-direction: ${direction || 'column'};
                align-items: ${align || 'flex-start'};
                position: relative;
                border-radius: 4px;
                /* padding: ${padding || '10px 0px 0px 0px'}; */
                padding: ${padding || '0px'};
                min-height: ${minHeight || 'unset'};
                min-width: ${minWidth || 'unset'};               
                margin-bottom: 30px;
                width: ${width || '100%'};
            }

            #id .section-title {
                font-size: 1.5em;
                color: ${App.primaryColor};
                background: ${App.secondaryColor};
                /* position: absolute; 
                top: -20px;
                left: 5px; */
                padding: 0px 5px;
            }

            #id .section-description {
                font-size: 1em;
                font-weight: 400;
                padding-left: 5px;
                padding-top: 5px;
                margin-bottom: 15px;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });

    return component;
}