/** (C) 2021 Stephen Matheis */

/**
 * @todo move up/down with arrow keys
 * @todo select with enter
 * @todo exit on escape
 */

/** Actions */
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_DeleteItem from '../Actions/Action_DeleteItem.js'

/** Components */
import Component_AssigneeForm from '../Components/Component_AssigneeForm.js'

export default async function ViewPart_AssigneeForm(param) {
    const {
        Id,
        left,
        getAssignees,
        getUnassigned,
        getMembers,
        assignedNames,
        closeComponent,
        section,
        button,
        updateDB,
        parentType
    } = param;

    let assigneeForm;

    if (assigneeForm) {
        removeForm();
    } else {
        // console.log('add form');

        /** Set container position: relative */
        if (section.get) {
            section.get().style.position = 'relative';
        }

        /** Get button element position */
        const buttonRect = (button.get ? button.get() : button).getBoundingClientRect();

        /** Add absolutely positioned form button element*/
        assigneeForm = Component_AssigneeForm({
            assigned: !getAssignees ? [] : Array.isArray(getAssignees) ?  getAssignees : getAssignees(),
            unassigned: !getUnassigned ? [] : Array.isArray(getUnassigned) ?  getUnassigned : getUnassigned(),
            // assigned: getAssignees ? getAssignees() : [],
            // unassigned: getUnassigned ? getUnassigned() : [],
            top: buttonRect.height + 10,
            left: left || 30,
            parent: section,
            async assign(event) {
                /** Get user account */
                /** This implementation presupposes callee understands where user account can be found */
                /** @todo Refactor so assign() doesn't know how account is returned? */
                const Account = event.target.dataset.account;

                /**
                 * This view part is used in at least two places:
                 * 
                 * 1. ViewPart_TaskForm
                 * 2. Component_NewTaskForm
                 * 
                 * updateDB will be set to 'false' when called from Component_NewTaskForm
                 * because the parent Task hasn't been created yet.
                 * 
                 * It will default to undefied when called from ViewPart_TaskForm
                 * unless explicitly passed 'true', which isn't strictly necessary.
                 */
                if (updateDB !== false) {
                    /** Create TaskAssignee item */
                    await Action_CreateItem({
                        list: 'TaskAssignees',
                        data: {
                            ParentId: Id,
                            Account
                        },
                        notify: false
                    });
                }

                /** Remove name from Unassigned or Not members section */
                assigneeForm.removeName({
                    section: event.target.dataset.section,
                    Account
                });

                /** Get assigned item */
                const name = Id ? getAssignees().find(item => item.Account === Account) : [Account].map(account => {
                    /** Mimic Assignee properties */
                    const assignee = {
                        Id: 0,
                        Account: account
                    }

                    /** Run through assignee model */
                    App.data.model({
                        list: `${parentType}Assignees`,
                        data: [
                            assignee
                        ]
                    });

                    return assignee;
                })[0];

                /** Add name to Assigned section */
                assigneeForm.addName({
                    section: 'assigned',
                    name
                });

                /** Add name to AssignedNames */
                /** @todo maybe pass just the addName() method? */
                assignedNames.addName(name);
            },
            async unassign(event) {
                /** Get TaskAssignee Item ID */
                /** This implementation presupposes callee understands where itemid can be found */
                /** @todo Refactor so unassign() doesn't know how itemid is returned? */
                const itemId = parseInt(event.target.dataset.itemid);

                if (updateDB !== false) {
                    /** Delete TaskAssignee item */
                    await Action_DeleteItem({
                        list: 'TaskAssignees',
                        itemId: itemId,
                        notify: false
                    });
                }

                /** Get account name */
                const Account = event.target.dataset.account;

                /** Remove name from Assigned section */
                assigneeForm.removeName({
                    section: 'assigned',
                    Account
                });

                /** Get unassigned item */
                // const name = (Array.isArray(getUnassigned) ? getMembers() : getUnassigned()).find(item => item.Account === Account);
                const name = getMembers().find(item => item.Account === Account);

                /** 
                 * If name is part of the Application, Project, or Team
                 * add name to Assigned section
                 */
                if (name) {
                    assigneeForm.addName({
                        section: 'unassigned',
                        name
                    });
                }

                /** Remove name from AssignedNames */
                assignedNames.removeName(Account);
            },
            onSearch(query) {
                const names = query ? App.data.lists.Users.filter(item => !getMembers().map(item => item.Account).includes(item.Account) && (item.FirstName.toLowerCase().includes(query.toLowerCase()) || item.LastName.toLowerCase().includes(query.toLowerCase()))) : [];

                assigneeForm.addNotMembers(names);
            },
            onEscape(event) {
                removeForm();
            }
        });

        assigneeForm.add();
        assigneeForm.focusNameSearch();

        /** Add event to modal */
        closeComponent.addEvent({
            selector: closeComponent.get(),
            event: 'mouseup',
            listener: closeForm
        });
    }

    /** Listener */
    function closeForm(event) {
        if (!assigneeForm.get()) {
            return;
        }

        const modalRect = assigneeForm.get().getBoundingClientRect();

        if (!modalRect) {
            return;
        }

        const {
            top,
            right,
            bottom,
            left
        } = modalRect;

        const {
            x,
            y
        } = event;

        if ( (x < left || x > right) || (y < top || y > bottom) ) {
            // console.log('outside form');
            removeForm();
        } else {
            // console.log('inside form');
        }
    }

    function removeForm() {
        // console.log('remove form');
            
        /** Remove event from modal */
        closeComponent.get().removeEventListener('mouseup', closeForm);

        /** Remove from DOM */
        assigneeForm.remove();

        /** Empty variable */
        assigneeForm = undefined;
    }
}
