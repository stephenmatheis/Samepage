/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Image(param) {
    const {
        source,
        label,
        parent
    } = param;

    const component = Core_Component({
        type: 'list',
        html: /*html*/ `
            <div class='image-container'>
                ${label ? /*html*/ `<div class='image-label'>${label}</div>` :''}
                <img src='${source}'>
            </div>
        `,
        style: /*css*/ `
            .image-container {
                margin: 20px 0px;
                position: relative;
            }

            .image-label {
                font-size: 1.1em;
                font-weight: bold;
            }

            .image-container img {
                position: relative;
                object-fit: scale-down;
                border: solid 2px ${App.primaryColor};
                border-radius: 4px;
                height: auto; 
                width: auto;
            }

            .image-container img:before {
                content: '';
                display: block;
                position: absolute;
                height: 100%;
                right: -10px;
                bottom: -10px;
                width: 100%;
                border-radius: 4px;
                background: white;
                border: solid 2px ${App.primaryColor};
            }
        `,
        parent,
        position: 'beforeend',
        events: [

        ]
    });

    return component;
}