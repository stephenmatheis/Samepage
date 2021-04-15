/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Card(param) {
    const {
        title,
        sections,
        scrollElement,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='section-stepper'>
                ${title ? /*html*/`<div class='section-title'>${title}</div>` : ''}
                <div class='section-group-container'>
                    ${createHTML()}
                </div>
                <div class='section-legend'>
                    <h3>Legend</h3>
                    <!-- Not Started -->
                    <div class='section-group'>
                        <div class='section-circle-bar-container'>
                            <div class='section-circle not-started'></div>
                        </div>
                        <div class='section-name'>
                            <span class='section-name-text'>Not Started</span>
                        </div>
                    </div>
                    <!-- Started -->
                    <div class='section-group'>
                        <div class='section-circle-bar-container'>
                            <div class='section-circle started'></div>
                        </div>
                        <div class='section-name'>
                            <span class='section-name-text'>Started</span>
                        </div>
                    </div>
                    <!-- Not Started -->
                    <div class='section-group'>
                        <div class='section-circle-bar-container'>
                            <div class='section-circle complete'></div>
                        </div>
                        <div class='section-name'>
                            <span class='section-name-text'>Complete</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        style: /*css*/ `
            /* Root */
            .section-stepper {
                height: 100%;
                padding: 40px;
                display: inline-flex;
                flex-direction: column;
                justify-content: space-between;
                overflow: overlay;
            }

            /* Title */
            .section-title {
                font-size: 1.5em;
                color: ${App.primaryColor};
            }

            /* Sections */
            .section-group {
                display: flex;
                justify-content: flex-start;
            }

            /* Circle and Bar Container */
            .section-circle-bar-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            /* Circle */
            .section-circle {
                user-select: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                padding: 6px;
                background: ${App.primaryColor};
                border: solid 2px ${App.primaryColor};
                color: white;
                text-align: center;
            }

            .section-circle.not-started {
                background: white;
                color: ${App.primaryColor};
            }

            .section-circle.started {
                background: orange;
                color: white;
            }

            .section-circle.complete {
                background: mediumseagreen;
                color: white;
            }

            /* Bar */
            .section-bar {
                background: ${App.primaryColor};
                height: 10px;
                width: 2px;
                margin: 5px 0px;
            }

            /* Name */
            .section-name {
                font-weight: 500;
                padding-top: 8px;
            }

            .section-name-text {
                padding: 0px 8px;
            }

            /* Legend */
            .section-legend .section-group {
                margin: 5px 0px;
            }

            /* Hover */
            .section-group-container .section-circle:hover,
            .section-group-container .section-name-text:hover {
                cursor: pointer;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id .section-group',
                event: 'click',
                listener: scrollToSection
            }
        ]
    });

    function createHTML() {
        let html = '';

        sections.forEach((section, index, sections) => {
            const {
                name,
                status
            } = section;

            html += /*html*/ `
                <div class='section-group'>
                    <div class='section-circle-bar-container'>
                        <div class='section-circle ${status}' data-name='${name}'>${index + 1}</div>
            `;

            if (index < sections.length - 1) {
                html += /*html*/ `
                    <div class='section-bar'></div>
                `;
            }
           
            html += /*html*/ `
                    </div>
                    <div class='section-name'>
                        <span class='section-name-text'>${name}</span>
                    </div>
                </div>
            `;
        });

        return html;
    }

    function scrollToSection(event) {
        const maincontainer = App.store.get('maincontainer');
        const name = this.querySelector('.section-name-text').innerText;
        const title = [...maincontainer
            .findAll(`[class*='title'], h1, h2, h3, h4, h5, h6`)]
            .find(node => node.innerText === name);
        const top = title.classList.contains('section-title') ? title.parentElement.offsetTop - title.offsetHeight : title.offsetTop;

        scrollElement.get().scrollTo({
            top,
            behavior: 'smooth'
        });
    }

    component.update = sections => {
        sections.forEach(section => {
            const {
                name,
                status
            } = section;

            const circle = component.find(`.section-circle[data-name='${name}']`);

            circle.classList.remove('complete', 'started','not-started');
            circle.classList.add(status);
        });
    }

    return component;
}