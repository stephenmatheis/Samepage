/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

export default function Component_Title(param) {
    const {
        title,
        subTitle,
        margin,
        parent,
        date,
        type
    } = param;

    /**
     * @todo show ticking time
     */
    
    const component = Core_Component({
        html: /*html*/ `
            <div class='title ${type || ''}'>
                <h1>${title}</h1>
                <h2>${subTitle || ''}</h2>
                ${date ? `<h3>${date}</h3>` : ''}
            </div>
        `,
        style: /*css*/ `
            #id {
                margin: ${margin || '0px'};
                width: 100%;
            }

            #id.title h1 {
                font-size: 2.5em;
                font-weight: 300;
                color: ${App.primaryColor};
                margin-top: 0px;
                margin-bottom: 10px;
            }

            #id.title h2 {
                font-size: 1.8em;
                font-weight: 400;
                color: ${App.primaryColor};
                margin: 0px;
            }

            #id.title h3 {
                font-size: 1.5em;
                font-weight: 400;
                color: ${App.primaryColor};
                margin: 0px;
                flex: 2;
                text-align: right;
            }

            #id.title h3 * {
                color: ${App.primaryColor};
            }

            #id.across {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                /* justify-content: space-between; */
                align-items: baseline;
            }

            #id.across h2 {
                margin: 0px 50px;
            }
        `,
        parent: parent,
        position: 'beforeend',
        events: [
            
        ]
    });

    component.setDisplayText = (text) => {
        const title = component.find('h1');

        title.innerHTML = text;
    }

    component.setSubtitle = (text) => {
        const title = component.find('h2');

        title.innerHTML = text;
    }

    return component;
}