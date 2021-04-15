/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** Components */
import Component_TaskModal from '../Components/Component_TaskModal.js'
import Component_TaskField from '../Components/Component_TaskField.js'
import Component_AssigneeForm from '../Components/Component_AssigneeForm.js'
import Component_AssignedNames from '../Components/Component_AssignedNames.js'
import Component_Container from '../Components/Component_Container.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_DateField from '../Components/Component_DateField.js'
import Component_MultiLineTextField from '../Components/Component_MultiLineTextField.js'
import Component_MultiSelectCheckbox from '../Components/Component_MultiSelectCheckbox.js'
import Component_Attachments from '../Components/Component_Attachments.js'
import Component_AttachFilesButton from '../Components/Component_AttachFilesButton.js'
import Component_Button from '../Components/Component_Button.js'

/** View Parts */
import ViewPart_Comments from '../ViewParts/ViewPart_Comments.js'
import Action_DeleteItem from '../Actions/Action_DeleteItem.js'

export default async function ViewPart_TaskForm(param = {}) {
    const {
        Id,
        taskCard
    } = param;

    /** Find Task */
    const task = App.data.lists.Tasks.find(item => item.Id === Id);

    if (!task) {
        return;
    }

    const {
        ParentId,
        ParentType,
        Task,
        Notes,
        Bucket,
        Progress,
        StartDate,
        DueDate,
        getAssignees,
        getUnassigned,
        getChecklist
    } = task;

    /** Find parent Application, Project, or Team */
    const parentItem = App.data.lists[`${ParentType}s`].find(item => item.Id === ParentId);

    const {
       getMembers 
    } = parentItem;

    /** Disable pointer events on main container children */
    App.store.get('maincontainer').eventsOff();

    /** Add Modal container */
    const taskModal = Component_TaskModal({
        parent: App.store.get('maincontainer'),
        close() {
            removeModalAndResetMaincontainer();
        }
    });

    taskModal.add();

    /** Settings: Form Fields ************************************************/
   
    const parent = taskModal;
    const labelWeight = 400;
    const background = App.secondaryColor;

    /** Section: Task ********************************************************/

    /** Task Field*/
    const field_Task = Component_TaskField({
        Task,
        checked: Progress === 'Completed' ? true : false,
        parent,
        async onCheck(checked) {
            /** Add/remove task text strikeout */
            field_Task.strikeout(checked);

            /** Check/uncheck TaskCard */
            taskCard.checked(checked);

            /** Update list item */
            const Progress = checked ? 'Completed' : 'Not started'

            console.log(`Progress: ${Progress}`);

            await Action_UpdateItem({
                list: 'Tasks',
                itemId: Id,
                data: {
                    Progress
                },
                notify: false
            });
        },
        async update() {
            const task = App.data.lists.Tasks.find(item => item.Id === Id);

            if (task) {
                const Task = field_Task.value();

                if (Task !== task.Task) {
                    console.log('changed!');

                    const updatedItem = await Action_UpdateItem({
                        list: 'Tasks',
                        itemId: Id,
                        data: {
                            Task
                        },
                        notify: false
                    });

                    taskCard.value(updatedItem.Task);
                    field_Task.blur();
                }
            }
        }
    });

    field_Task.add();
    
    /** Section: Assignees ***************************************************/

    const sectionContainer_Assignees = Component_Container({
        padding: '5px 20px',
        parent
    });

    sectionContainer_Assignees.add();

    let assigneeForm;

    const button_AddAssignee = Component_Button({
        icon: /*html*/ `
            <svg class='icon'>
                <use href='#icon-user-plus'></use>
            </svg>
        `,
        color: 'green',
        padding: '0px',
        parent: sectionContainer_Assignees,
        action(event) {
            if (assigneeForm) {
                removeForm();
            } else {
                // console.log('add form');

                /** Get section element */
                const section = sectionContainer_Assignees.get();

                /** Set container position: relative */
                section.style.position = 'relative';

                /** Get button element */
                const button = button_AddAssignee.get();

                /** Get button element position */
                const buttonRect = button.getBoundingClientRect();

                /** Add absolutely positioned form button element*/
                assigneeForm = Component_AssigneeForm({
                    assigned: getAssignees(),
                    unassigned: getUnassigned(),
                    top: buttonRect.height + 10,
                    left: 30,
                    parent: sectionContainer_Assignees,
                    async assign(event) {
                        /** Get user account */
                        /** This implementation presupposes callee understands where user account can be found */
                        /** @todo Refactor so assign() doesn't know how account is returned? */
                        const Account = event.target.dataset.account;

                        /** Delete TaskAssignee item */
                        const newItem = await Action_CreateItem({
                            list: 'TaskAssignees',
                            data: {
                                ParentId: Id,
                                Account
                            },
                            notify: false
                        });

                        /** Remove name from Unassigned or Not members section */
                        assigneeForm.removeName({
                            section: event.target.dataset.section,
                            Account
                        });

                        /** Get assigned item */
                        const name = getAssignees().find(item => item.Account === Account)

                        /** Add name to Assigned section */
                        assigneeForm.addName({
                            section: 'assigned',
                            name
                        });

                        /** Add name to AssignedNames */
                        assignedNames.addName(name);
                    },
                    async unassign(event) {
                        /** Get TaskAssignee Item ID */
                        /** This implementation presupposes callee understands where itemid can be found */
                        /** @todo Refactor so unassign() doesn't know how itemid is returned? */
                        const itemId = parseInt(event.target.dataset.itemid);

                        /** Delete TaskAssignee item */
                        await Action_DeleteItem({
                            list: 'TaskAssignees',
                            itemId: itemId,
                            notify: false
                        });

                        /** Get account name */
                        const Account = event.target.dataset.account;

                        console.log(Account);

                        /** Remove name from Assigned section */
                        assigneeForm.removeName({
                            section: 'assigned',
                            Account
                        });

                        /** Get unassigned item */
                        const name = getUnassigned().find(item => item.Account === Account);

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
                        const names = query ? App.data.lists.Users.filter(item => {
                            return !getMembers().map(item => item.Account).includes(item.Account) && (item.FirstName.toLowerCase().includes(query.toLowerCase()) || item.LastName.toLowerCase().includes(query.toLowerCase()));
                        }) : [];

                        assigneeForm.addNotMembers(names);
                    }
                });

                assigneeForm.add();

                assigneeForm.focusNameSearch();

                /** Add event to modal */
                taskModal.addEvent({
                    selector: taskModal.get(),
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
                taskModal.get().removeEventListener('mouseup', closeForm);
    
                /** Remove from DOM */
                assigneeForm.remove();

                /** Empty variable */
                assigneeForm = undefined;
            }
        }
    });

    button_AddAssignee.add();

    /** Add assignees */
    const assignedNames = Component_AssignedNames({
        assigned: getAssignees(),
        parent: sectionContainer_Assignees
    });

    assignedNames.add();

    /** Section: Progress and Dates ******************************************/

    const sectionContainer_Progress = Component_Container({
        justify: 'space-between',
        padding: '15px 20px',
        parent
    });

    sectionContainer_Progress.add();

    /** Progress */
    const field_Progress = Component_DropDownField({
        label: 'Progress',
        labelWeight,
        background,
        editable: false,
        dropDownOptions: [
            {
                id: 1,
                value: 'Not started'
            },
            {
                id: 2,
                value: 'In progress'
            },
            {
                id: 3,
                value: 'Completed'
            }
        ],
        parent: sectionContainer_Progress,
        async onSetValue(data) {
            const task = App.data.lists.Tasks.find(item => item.Id === Id);

            if (task && data) {
                const Progress = data.newValue.value;

                if (Progress !== task.Progress) {
                    await Action_UpdateItem({
                        list: 'Tasks',
                        itemId: Id,
                        data: {
                            Progress
                        },
                        notify: false
                    });

                    console.log('changed!');
                }
            }
        }
    });

    field_Progress.add();

    /** Start Date */
    const field_StartDate = Component_DateField({
        label: 'Start date',
        labelWeight,
        background,
        parent: sectionContainer_Progress,
        async onFocusout(event) {
            const task = App.data.lists.Tasks.find(item => item.Id === Id);

            if (task) {
                const StartDate = field_StartDate.value();

                if (StartDate !== task.StartDate.split('T')[0]) {
                    await Action_UpdateItem({
                        list: 'Tasks',
                        itemId: Id,
                        data: {
                            StartDate
                        },
                        notify: false
                    });

                    console.log('changed!');
                }
            }
        }
    });

    field_StartDate.add();

    /** Due Date */
    const field_DueDate = Component_DateField({
        label: 'Due date',
        labelWeight,
        background,
        parent: sectionContainer_Progress,
        async onFocusout(event) {
            const task = App.data.lists.Tasks.find(item => item.Id === Id);

            if (task) {
                const DueDate = field_DueDate.value();

                if (DueDate !== task.DueDate.split('T')[0]) {
                    await Action_UpdateItem({
                        list: 'Tasks',
                        itemId: Id,
                        data: {
                            DueDate
                        },
                        notify: false
                    });

                    console.log('changed!');
                }
            }
        }
    });

    field_DueDate.add();

    /** Section: Notes *******************************************************/

    const sectionContainer_Notes = Component_Container({
        padding: '0px 20px',
        parent
    });

    sectionContainer_Notes.add();

    /** Notes */
    const field_Notes = Component_MultiLineTextField({
        label: 'Notes',
        labelWeight,
        minHeight: '150px',
        background,
        parent: sectionContainer_Notes,
        async onFocusout(event) {
            const task = App.data.lists.Tasks.find(item => item.Id === Id);

            if (task) {
                const Notes = field_Notes.value();

                if (Notes !== task.Notes) {
                    await Action_UpdateItem({
                        list: 'Tasks',
                        itemId: Id,
                        data: {
                            Notes
                        },
                        notify: false
                    });

                    console.log('changed!');
                }
            }
        }
    });

    field_Notes.add();
    
    /** Section: Checklist ***************************************************/

    const sectionContainer_Checklist = Component_Container({
        padding: '0px 20px',
        parent
    });

    sectionContainer_Checklist.add();

    /** Notes */
    const field_Checklist = Component_MultiSelectCheckbox({
        label: 'Checklist',
        labelWeight,
        options: [
            {
                title: '',
                items: getChecklist()
            }
        ],
        async onCheck(event) {
            const checklistItem = getChecklist().find(item => item.id === parseInt(event.target.dataset.itemid));
    
            if (checklistItem) {
                await Action_UpdateItem({
                    list: 'Checklist',
                    itemId: checklistItem.id,
                    data: {
                        Complete: event.target.checked
                    },
                    notify: false
                });

                console.log('changed!');
            }
        },
        async onAddNewItem(event) {
            const Description = event.target.value;

            if (Description) {
                const newItem = await Action_CreateItem({
                    list: 'Checklist',
                    data: {
                        TaskId: Id,
                        Description
                    },
                    notify: false
                });

                field_Checklist.addItemAbove({
                    group: '',
                    itemToAdd: {
                        id: newItem.Id,
                        value: newItem.Description,
                    },
                    item: event.target
                });
            }
        },
        parent: sectionContainer_Checklist
    });

    field_Checklist.add();

    /** Set Fields ***********************************************************/

    if (task) {
        if (Progress) {
            field_Progress.value(Progress);
        }

        if (StartDate) {
            field_StartDate.value(StartDate);
        }

        if (DueDate) {
            field_DueDate.value(DueDate);
        }

        if (Notes) {
            field_Notes.value(Notes);
        }
    }

    /** Section: Attachments *************************************************/

    const sectionContainer_Attachments = Component_Container({
        padding: '0px 20px',
        direction: 'column',
        parent
    });

    sectionContainer_Attachments.add();

    /** Get Attachments */
    const getAttachments = await Action_Get({
        list: 'Tasks',
        filter: `Id eq ${Id}`,
        select: 'Attachments,AttachmentFiles',
        expand: 'AttachmentFiles'
    });

    /** Attachments */
    const field_Attachments = Component_Attachments({
        label: 'Attachments',
        list: 'Tasks',
        itemId: Id,
        labelWeight,
        attachments: getAttachments[0].AttachmentFiles.results, 
        parent: sectionContainer_Attachments
    });

    field_Attachments.add();

    /** Add attachment Button */
    const button_AddAttachment = Component_AttachFilesButton({
        value: 'Add attachment',
        list: 'Tasks',
        id: Id,
        margin: '10px 0px 0px 0px',
        parent: sectionContainer_Attachments,
        onAdd(files) {
            field_Attachments.refresh(files.AttachmentFiles.results);
        }
    });

    button_AddAttachment.add();

    /** Section: Comments ****************************************************/

    const sectionContainer_Comments = Component_Container({
        padding: '0px 20px',
        parent
    });

    sectionContainer_Comments.add();

    /** Comments */
    ViewPart_Comments({
        parentId: Id,
        foreignKey: 'TaskId',
        background,
        parent: sectionContainer_Comments
    });
    
    /** End Form *************************************************************/

    /** Detect click outside modal */
    const maincontainer = App.store.get('maincontainer');

    maincontainer.addEvent({
        selector: maincontainer.get(),
        event: 'mouseup',
        listener: closeModal
    });

    function closeModal(event) {
        if (!taskModal.get()) {
            return;
        }

        const modalRect = taskModal.get().getBoundingClientRect();

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
            removeModalAndResetMaincontainer();
        }
    }
    
    function removeModalAndResetMaincontainer() {
        /** Remove modal */
        taskModal.remove();

        /** Remove event listener */
        App.store.get('maincontainer').get().removeEventListener('mouseup', closeModal);

        /** Enable pointer events on main container children */
        App.store.get('maincontainer').eventsOn();
    }
}
