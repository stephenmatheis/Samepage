/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'
import Action_DeleteItem from '../Actions/Action_DeleteItem.js'
import Action_CreateItem from '../Actions/Action_CreateItem.js'

/** Components */
import Component_DropDownField from './Component_DropDownField.js'
import Component_FormButton from './Component_FormButton.js'
import Component_Container from './Component_Container.js'

export default function Component_Group(param) {
    const {
        group,
        parent,
        assignedSlides,
        position
    } = param;

    const assignedSlideNames = assignedSlides.map(item => item.Title);
    const unassignedSlides = App.data.lists.Slides.filter(item => !assignedSlideNames.includes(item.Title));

    const component = Core_Component({
        html: /*html*/ `
            <div class='group'>
                <div class='group-name-container'>
                    <div class='group-name'>${group}</div>
                </div>
                <div class='group-slides'>
                    <div class='group-slides-title-container'>
                        <div class='group-slides-title'>Slides</div>
                        <div class='group-remove-slide-button hidden'>Unassign slide</div>
                    </div>
                    ${createHTML()}
                </div>
                ${displayButton()}
            </div>
        `,
        style: /*css*/ `
            #id {
                margin: 20px 0px 0px 0px;
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
                width: 500px;
            }

            .group-name-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: ${App.primaryColor};
                margin-bottom: 10px;
                font-weight: 500;
            }

            .group-name {
                font-size: 1.4em;
            }

            .group-command {
                font-size: 1.2;
            }

            .group-slide-container {
                display: flex;
                align-items: center;
                margin: 5px 0px;
            }

            .group-slides-title-container {
                display: flex;
                align-items: flex-end;
            }

            .group-slide-checkbox {
                margin-right: 5px;
            }

            .group-slides-title {
                font-size: 1.2em;
                font-weight: 500;
                margin-right: 5px;
            }

            /* Buttons */
            .group-remove-slide-button {
                font-size: .8em;
                cursor: pointer;
                display: inline-block;
                border-radius: 4px;
                color: white;
                background: crimson;
                border: solid 2px firebrick;
                padding: 2px 5px;
            }

            .group-new-slide-button {
                cursor: pointer;
                display: inline-block;
                border-radius: 4px;
                color: white;
                background: mediumseagreen;
                border: solid 2px seagreen;
                padding: 2px 5px;
            }

            .hidden {
                display: none;
            }

            /* Assinged to all */
            .group-all-assigned {
                font-size: .9em;
                font-weight: 500;
            }

            /* Checkboxes */
            label {
                display: flex;
            }

            input[type='checkbox'] {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            input[type='checkbox'] ~ .toggle {
                width: 20px;
                height: 20px;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                /* border: solid 2px seagreen; */
                border: solid 2px lightgray;
                border-radius: 4px;
                cursor: pointer;
            }

            input[type='checkbox']:hover ~ .toggle {
                border-color: mediumseagreen;
            }
            

            input[type='checkbox']:checked ~ .toggle {
                border: solid 2px mediumseagreen;
                background: mediumseagreen url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: `#id input[type='checkbox']`,
                event: 'change',
                listener: onCheck
            },
            {
                selector: `#id .group-remove-slide-button`,
                event: 'click',
                listener(event) {
                    console.log('unassign');
                }
            },
            {
                selector: `#id .group-new-slide-button`,
                event: 'click',
                listener(event) {
                    event.target.style.display = 'none';

                    if (unassignedSlides.length > 0) {
                        const menu = Component_DropDownField({
                            label: 'Select Group',
                            dropDownOptions: unassignedSlides.map(item => {
                                return {
                                    id: item.Id,
                                    value: item.Title
                                }
                            }),
                            width: '300px',
                            parent: component,
                            fieldMargin: '0px'
                        });
                    
                        menu.add();
    
                        const container = Component_Container({
                            width: '300px',
                            justify: 'flex-end',
                            parent: component
                        });
                    
                        container.add();
    
                        const submit = Component_FormButton({
                            value: 'Assign',
                            type: 'create',
                            margin: '0px 0px 0px 10px',
                            parent: container,
                            async action() {
                                const FK_SlideName = menu.value();

                                console.log(unassignedSlides, FK_SlideName);
    
                                if (unassignedSlides.map(item => item.Title).includes(FK_SlideName)) {
                                    const newItem = await Action_CreateItem({
                                        list: 'AssignedSlides',
                                        data: {
                                            FK_GroupName: group,
                                            FK_SlideName
                                        },
                                        notify: false
                                    });

                                    /** Reset field */
                                    menu.value('');

                                    /** Add new group */
                                    addNewGroup(FK_SlideName);
                                } else {
                                    console.log('value in field does not match valid group name');
                                }
                            }
                        });
    
                        submit.add();
    
                        const cancel = Component_FormButton({
                            value: 'Cancel',
                            type: 'cancel',
                            margin: '0px 0px 0px 10px',
                            parent: container,
                            async action() {
                                menu.remove();
                                container.remove();
    
                                event.target.style.display = 'inline-flex';
                            }
                        });
    
                        cancel.add();
                    }
                }
            }
        ]
    });

    function displayButton() {
        let html = '';

        if (unassignedSlides.length > 0) {
            html += /*html*/ `
                <div class='group-new-slide-button'>Assign to new slide</div>
            `;
        } else {
            html += /*html*/ `
                <div class='group-all-assigned'><em>(Assigned to all slides)</em></div>
            `;
        }

        return html;
    }

    function createHTML() {
        let html = '';
        
        assignedSlides.forEach(item => {
            html += /*html*/ `
                <div class='group-slide-container'>
                    <div class='group-slide-checkbox'>
                        <label>
                            <input type="checkbox" />
                            <span class="toggle"></span>
                        </label>
                    </div>
                    <div class='group-slide'>${item.Title}</div>
                </div>
            `
        });

        return html;
    }

    function onCheck(event) {
        const checkboxes = component.findAll(`input[type='checkbox']:checked`);
        const removeButton = component.find('.group-remove-slide-button');

        if (checkboxes.length > 0) {
            removeButton.classList.remove('hidden');
        } else {
            removeButton.classList.add('hidden');
        }
    }

    function addNewGroup(group) {
        const html = /*html*/ `
            <div class='group-slide-container'>
                <div class='group-slide-checkbox'>
                    <label>
                        <input type="checkbox" data-group='${group}'/>
                        <span class="toggle"></span>
                    </label>
                </div>
                <div class='group-slide'>${group}</div>
            </div>
        `;

        const groupContainer = component.find('.group-slides');

        groupContainer.insertAdjacentHTML('beforeend', html);

        const checkbox = component.find(`input[type='checkbox'][data-group='${group}']`);

        checkbox.addEventListener('change', onCheck);
    }

    return component;
}