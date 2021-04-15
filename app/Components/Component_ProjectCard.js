/** RHC-C G-6 SharePoint Team */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_ProjectCard(param) {
    const {
        title,
        subTitle,
        body,
        parent,
        position,
        action,
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='project-card'>
                ${title ? /*html*/ `<div class='project-card-title'>${title}</div>`: ''}
                ${title ? /*html*/ `<div class='project-card-sub-title'>${subTitle}</div>`: ''}
                ${title ? /*html*/ `<div class='project-card-body'>${body}</div>`: ''}
            </div>
        `,
        style: /*css*/ `
            #id {
                cursor: pointer;
                margin: 20px;
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
                height: 200px;
                width: 150px;
            }

            .project-card-title {
                font-size: 1.5em;
                font-weight: 500;
                color: ${App.primaryColor};
                margin-bottom: 5px;
            }

            .project-card-sub-title {
                font-size: 1.2em;
                font-weight: 500;
                color: ${App.defaultColor};
                margin-bottom: 15px;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id',
                event: 'click',
                listener(event) {
                    if (action) {
                        action(event);
                    }
                }
            }
        ]
    });

    return component;
}