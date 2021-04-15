/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_AssigneeForm(param) {
    const {
        assigned,
        unassigned,
        top,
        left,
        parent,
        position,
        assign,
        unassign,
        onSearch,
        onEscape
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='assignee-form'>
                <input type='text' spellcheck='false' class='assignee-form-search' placeholder='Type a name'>
                <div class='assignee-form-name-container'>
                    ${addNames()}
                </div>
            </div>
        `,
        style: /*css*/ `
            #id.assignee-form {
                cursor: initial;
                z-index: 1001;
                position: absolute;
                top: ${top}px;
                left: ${left}px;
                user-select: none;
                padding: 15px;
                background: white;
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .assignee-form-search {
                font-size: 1em;
                white-space: nowrap;
                padding: 4px;
                border: none;
                outline: none;
                background: ${App.secondaryColor};
                border-bottom: solid 2px transparent;
            }

            #id .assignee-form-search:active,
            #id .assignee-form-search:focus {
                outline: none;
                border-bottom: solid 2px ${App.primaryColor};
            }

            #id .assignee-form-label {
                font-weight: 500;
                margin: 10px 0px 0px 0px;
            }

            #id .assignee-form-section:not(:last-child) {
                margin: 0px 0px 10px 0px;
            }

            #id .assignee-form-name {
                display: flex;
                justify-content: space-between;
                margin: 10px 0px;
            }

            /* 
            #id .assignee-form-name:hover .assignee-form-name-delete,
            #id .assignee-form-name:hover .assignee-form-name-add {
                cursor: pointer;
                opacity: 1;
            }
            */

            #id .assignee-form-name-delete,
            #id .assignee-form-name-add {
                opacity: 1;
                cursor: pointer;
                font-size: 1.8em;
                line-height: .5;
            }

            #id .assignee-form-name-delete {
                color: crimson;
            }

            #id .assignee-form-name-add {
                color: mediumseagreen;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id .assignee-form-name-add',
                event: 'click',
                listener: assign
            },
            {
                selector: '#id .assignee-form-name-delete',
                event: 'click',
                listener: unassign
            },
            {
                selector: `#id .assignee-form-search`,
                event: 'keyup',
                listener(event) {
                    if (event.key == 'Escape') {
                        event.preventDefault();

                        if (onEscape) {
                            onEscape(event)
                        }

                        return;
                    }

                    if (onSearch) {
                        onSearch(event.target.value);
                    }
                }
            }
        ]
    });

    function addNames() {
        let html = '';

        if (assigned.length > 0) {
            html += /*html*/ `
                <div class='assignee-form-section' data-section='assigned'>
                    <div class='assignee-form-label'>Assigned</div>
            `;

            assigned.forEach(item => {
                const {
                    Id,
                    Account,
                    getUserAccount
                } = item;

                const {
                    FirstName,
                    LastName
                } = getUserAccount();

                html += /*html*/ `
                    <div class='assignee-form-name' data-account='${Account}'>
                        <div class='assignee-form-name-text'>${FirstName} ${LastName}</div>
                        <div class='assignee-form-name-delete' data-account='${Account}' data-itemid='${Id}'>&times;</div>
                    </div>
                `;
            });

            html += /*html*/ `
                </div>
            `;
        }

        if (unassigned.length > 0) {
            html += /*html*/ `
                <div class='assignee-form-section' data-section='unassigned'>
                    <div class='assignee-form-label'>Unassigned</div>
            `;

            unassigned.forEach(item => {
                const {
                    Account,
                    getUserAccount
                } = item;

                const {
                    FirstName,
                    LastName
                } = getUserAccount();

                html += /*html*/ `
                    <div class='assignee-form-name' data-account='${Account}'>
                        <div class='assignee-form-name-text'>${FirstName} ${LastName}</div>
                        <div class='assignee-form-name-add' data-section='unassigned' data-account='${Account}'>&plus;</div>
                    </div>
                `;
            });

            html += /*html*/ `
                </div>
            `;
        }

        return html;
    }

    component.focusNameSearch = () => {
        component.find('.assignee-form-search').focus();
    }

    component.addNotMembers = (names) => {
        const notMembers = component.find(`.assignee-form-section[data-section='not-members']`);

        if (notMembers) {
            notMembers.remove();
        }

        if (names.length === 0) {
            return;
        }
        
        const nameContainer = component.find('.assignee-form-name-container');

        let html = /*html*/ `
            <div class='assignee-form-section' data-section='not-members'>
                <div class='assignee-form-label'>Not members</div>
        `;

        names.forEach(item => {
            const {
                Account,
                FirstName,
                LastName
            } = item;

            html += /*html*/ `
                <div class='assignee-form-name' data-account='${Account}'>
                    <div class='assignee-form-name-text'>${FirstName} ${LastName}</div>
                    <div class='assignee-form-name-add' data-section='not-members' data-account='${Account}'>&plus;</div>
                </div>
            `;
        });

        html += /*html*/ `
            </div>
        `;

        nameContainer.insertAdjacentHTML('beforeend', html);

        const addButtons = component.findAll(`.assignee-form-section[data-section='not-members'] .assignee-form-name-add`);

        addButtons.forEach(button => {
            button.addEventListener('click', assign);
        });
    }

    component.addName = (param) => {
        const {
            section,
            name
        } = param;

        let sectionContainer = component.find(`.assignee-form-section[data-section='${section}']`);

        if (!sectionContainer) {
            const nameContainer = component.find('.assignee-form-name-container');
            const position = section === 'assigned' ? 'afterbegin' : 'beforeend';
            const html = /*html*/ `
                <div class='assignee-form-section' data-section='${section}'>
                    <div class='assignee-form-label'>${section.toTitleCase()}</div>
                </div>
            `;

            nameContainer.insertAdjacentHTML(position, html);

            sectionContainer = component.find(`.assignee-form-section[data-section='${section}']`);
        }
        
        if (sectionContainer) {
            const {
                Id,
                Account,
                getUserAccount
            } = name;

            const {
                FirstName,
                LastName
            } = getUserAccount();

            const html = /*html*/ `
                <div class='assignee-form-name' data-account='${Account}'>
                    <div class='assignee-form-name-text'>${FirstName} ${LastName}</div>
                    ${
                        section === 'assigned' ? 
                        /*html*/`<div class='assignee-form-name-delete' data-account='${Account}' data-itemid='${Id}'>&times;</div>` : 
                        /*html*/ `<div class='assignee-form-name-add' data-section='${section}' data-account='${Account}'>&plus;</div>`
                    }
                </div>
            `;

            sectionContainer.insertAdjacentHTML('beforeend', html);

            if (section === 'assigned') {
                const deleteButton = component.find(`.assignee-form-name-delete[data-account='${Account}']`)

                if (deleteButton) {
                    deleteButton.addEventListener('click', unassign);
                }
            } else if (section === 'unassigned') {
                const addButton = component.find(`.assignee-form-name-add[data-account='${Account}']`)

                if (addButton) {
                    addButton.addEventListener('click', assign);
                }
            }
        }
    }

    component.removeName = (param) => {
        const {
            section,
            Account
        } = param;

        /** Find and remove name by section and account */
        const nameToRemove = component.find(`.assignee-form-section[data-section='${section}'] .assignee-form-name[data-account='${Account}']`);

        if (nameToRemove) {
            nameToRemove.remove();
        }

        /** Remove section if there are no more names */
        const allNames = component.findAll(`.assignee-form-section[data-section='${section}'] .assignee-form-name`);

        if (allNames.length === 0) {
            const sectionToRemove = component.find(`.assignee-form-section[data-section='${section}']`);

            if (sectionToRemove) {
                sectionToRemove.remove();
            }
        }
    }
    
    return component;
}