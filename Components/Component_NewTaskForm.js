/** (C) 2021 Stephen Matheis */

/**
 * @todo move to next field on tab
 * @todo open calendar picker on tab/focus
 * @open open assign menu on tab/focus
 */

/** Components */
import Core_Component from '../Core/Core_Component.js'

/** View Parts */
import ViewPart_AssigneeForm from '../ViewParts/ViewPart_AssigneeForm.js'

export default function Component_NewTaskForm(param) {
    const {
        addTask,
        getMembers,
        getUnassigned,
        ParentType,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='new-task-form'>
                <div class='new-task-form-fields'>
                    <input type='text' spellcheck='false' class='new-task-form-task' placeholder='Enter a task name'>
                    <label class='new-task-form-due-date-label'>
                        <input type='date'>
                        <button class='new-task-form-due-date-button'>
                            <svg class='icon'><use href='#icon-calendar'></use></svg>
                            <span class='new-task-form-due-date-text'>Set due date</span>
                        </button>
                    </label>
                    <div class='new-task-form-assign-container'>
                        <span class='new-task-form-assign-click'>
                            <span class='new-task-form-assign-button'>
                                <svg class='icon'>
                                    <use href='#icon-user-plus'></use>
                                </svg>
                            </span>
                            <span class='new-task-form-assign-text'>Assign</span>
                        </span>
                    </div>
                </div>
                <div class='new-task-form-add-task-button'>Add Task</div>
            </div>
        `,
        style: /*css*/ `
            #id.new-task-form {
                user-select: none;
                width: 300px;
                margin: 10px 15px 0px 0px;
                background: white;
                border-radius: 4px;
                border: solid rgba(0,0,0,0.2) 1px;
            }

            #id .new-task-form-fields {
                padding: 15px 20px;
            }

            #id .new-task-form-task {
                font-size: 1em;
                white-space: nowrap;
                width: 100%;
                padding: 10px 15px;
                border: none;
                outline: none;
                background: ${App.secondaryColor};
                border-bottom: solid 2px transparent;
            }

            #id .new-task-form-task:active,
            #id .new-task-form-task:focus {
                outline: none;
                border-bottom: solid 2px ${App.primaryColor};
            }

            /**
             * Date container 
             * 
             * https://stackoverflow.com/a/53483852
            */
            #id .new-task-form-due-date-label {
                cursor: pointer;
                display: inline-block;
                position: relative;
                line-height: 0;
                margin: 12.5px 0px;
            }

            #id input[type='date'] {
                position: absolute;
                opacity: 0;
                width: 100%;
                height: 100%;
                border: 0;
                overflow: hidden;
                cursor: pointer;
            }

            #id input[type='date']::-webkit-calendar-picker-indicator {
                position: absolute;
                top: -150%;
                left: -150%;
                width: 300%;
                height: 300%;
                cursor: pointer;
            }

            #id .new-task-form-due-date-button {
                background: none;
                outline: none;
                border: none;
                font-size: 1em;
                padding: 4px;
                display: flex;
                align-items: center;
            }

            /** Assign */
            #id .new-task-form-assign-container {
                position: relative;
            }

            #id .new-task-form-assign-click {
                cursor: pointer;
                display: flex;
                position: relative;
                padding: 4px;
            }

            #id .new-task-form-assign-button {
                display: flex;
                align-items: center;
            }

            #id .assigned-name {
                cursor: pointer;
                background: ${App.secondaryColor};
                padding: 4px;
                border-radius: 4px;
            }

            /** Icons */
            #id .icon {
                stroke: ${App.defaultColor};
                fill: ${App.defaultColor};
                margin-right: 10px;
            }

            /** Add Task button */
            #id .new-task-form-add-task-button {
                cursor: pointer;
                text-align: center;
                padding: 15px 0px;
                background: ${App.primaryColor};
                color: white;
                transition: 150ms ease-in-out;
            }

            #id .new-task-form-add-task-button:hover {
                background: indigo;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: `#id input[type='text']`,
                event: 'keypress',
                listener(event) {
                    if (event.key === 'Enter') {
                        if (addTask) {
                            addTask(component.getData());
                        }
                    }
                }
            },
            {
                selector: `#id input[type='date']`,
                event: 'change',
                listener(event) {
                    const dateParts = event.target.value.split('-');
                    const month = dateParts[1];
                    const day = dateParts[2];

                    component.find('.new-task-form-due-date-text').innerText = `Due ${month}/${day}`;
                }
            },
            {
                selector: `#id .new-task-form-assign-click`,
                event: 'click',
                listener(event) {
                    const section = this.closest('.new-task-form-assign-container');
                    const button = section.querySelector('.new-task-form-assign-button');

                    ViewPart_AssigneeForm({
                        left: 4,
                        updateDB: false,
                        getAssignees: component.getAssignees(),
                        getUnassigned: getUnassigned().filter(item => !component.getAssignees().map(item => item.Account).includes(item.Account)),
                        getMembers,
                        assignedNames: component,
                        closeComponent: App.store.get('maincontainer'),
                        section,
                        button,
                        parentType: ParentType
                    });
                }
            },
            {
                selector: `#id .new-task-form-add-task-button`,
                event: 'click',
                listener(event) {
                   if (addTask) {
                       addTask(component.getData());
                   }
                }
            }
        ]
    });

    component.getAssignees = () => {
        const names = [...component.findAll('.assigned-name')];

        if (names.length > 0) {
            return names.map(name => {
                /** Mimic Assignee properties */
                const assignee = {
                    Id: 0,
                    Account: name.dataset.account
                }

                /** Run through assignee model */
                App.data.model({
                    list: `${ParentType}Assignees`,
                    data: [
                        assignee
                    ]
                });

                return assignee;
            });
        } else {
            return [];
        }
    }

    component.addName = (name) => {
        const {
            Account,
            getUserAccount
        } = name;

        const {
            FirstName,
            LastName
        } = getUserAccount();

        const html = /*html*/ `
            <span class='assigned-name' data-account='${Account}'>${FirstName} ${LastName}</span>
        `;

        const container = component.find('.new-task-form-assign-text');

        if (container.innerText === 'Assign') {
            container.innerText = '';
        }
        
        container.insertAdjacentHTML('beforeend', html);
    }

    component.removeName = (Account) => {
        const name = component.find(`.assigned-name[data-account='${Account}']`);

        if (name) {
            name.remove();
        }

        const names = component.findAll('.assigned-name');

        if (names.length === 0) {
            component.find('.new-task-form-assign-text').innerHTML = 'Assign';
        }
    }

    component.getData = () => {
        return {
            ParentType,
            Task: component.find(`input[type='text']`).value,
            DueDate: component.find(`input[type='date']`).value || null
        }
    }

    component.focus = () => {
        component.find('.new-task-form-task').focus();
    }

    component.reset = () => {
        /** Empty task field */
        component.find('.new-task-form-task').value = '';

        /** Empty Names field */
        component.find('.new-task-form-assign-text').innerHTML = 'Assign';

        /** Reset date field and text */
        component.find(`input[type='date']`).value = '';
        component.find('.new-task-form-due-date-text').innerText = 'Set due date';
    }
    
    return component;
}