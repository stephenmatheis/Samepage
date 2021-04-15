/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'
import Action_DeleteItem from '../Actions/Action_DeleteItem.js'

/** Components */
import Component_TaskModal from '../Components/Component_TaskModal.js'
import Component_TaskField from '../Components/Component_TaskField.js'
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
import ViewPart_AssigneeForm from './ViewPart_AssigneeForm.js'

export default async function ViewPart_TaskForm(param = {}) {
    const {
        Id,
        taskCard
    } = param;

    /** Find Task */
    // const task = App.data.lists.Tasks.find(item => item.Id === Id);
    const task = {};

    if (!task) {
        return;
    }

    const {
        /** Attachements links */
        AttachmentFiles,
        /** Columns/Fields */
        Bucket,
        DueDate,
        Notes,
        ParentId,
        ParentType,
        Progress,
        StartDate,
        Task,
        /** Methods added by Model_Tasks */
        getAssignees,
        getChecklist,
        getUnassigned
    } = task;

    /** Find parent Application, Project, or Team */
    // const parentItem = App.data.lists[`${ParentType}s`].find(item => item.Id === ParentId);
    const parentItem = {};

    const {
       getMembers 
    } = parentItem;

    /** Select Task Card */
    taskCard.selected(true);

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
            ViewPart_AssigneeForm({
                Id,
                getAssignees,
                getUnassigned,
                getMembers,
                assignedNames,
                closeComponent: taskModal,
                section: sectionContainer_Assignees,
                button: button_AddAssignee
            });
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
    /** @todo add delete checklist item */
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
                /** Update Checklist item */
                await Action_UpdateItem({
                    list: 'Checklist',
                    itemId: checklistItem.id,
                    data: {
                        Complete: event.target.checked
                    },
                    notify: false
                });

                /** Get updated checklist */
                const checklist = getChecklist();

                /** Update task card */
                taskCard.setChecklistCount({
                    done: checklist.filter(item => item.checked).length,
                    total: checklist.length
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

                /** Add item to UI */
                field_Checklist.addItemAbove({
                    group: '',
                    itemToAdd: {
                        id: newItem.Id,
                        value: newItem.Description,
                    },
                    item: event.target
                });

                /** Get updated checklist */
                const checklist = getChecklist();

                /** Update task card */
                taskCard.setChecklistCount({
                    done: checklist.filter(item => item.checked).length,
                    total: checklist.length
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

    /** Attachments */
    const field_Attachments = Component_Attachments({
        label: 'Attachments',
        list: 'Tasks',
        itemId: Id,
        labelWeight,
        attachments: AttachmentFiles.results,
        parent: sectionContainer_Attachments,
        onDelete() {
            /** Get attachments count */
            const task = App.data.lists.Tasks.find(item => item.Id === Id);

            const {
                AttachmentFiles
            } = task;

            /** Update task card */
            taskCard.setAttachmentCount(AttachmentFiles.results.length);
        }
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
            /** Refresh attachment links */
            field_Attachments.refresh(files.AttachmentFiles.results);

            /** Update attachment count on task card */
            taskCard.setAttachmentCount(files.AttachmentFiles.results.length);
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
        /** Unselect Task Card */
        taskCard.selected(false);

        /** Remove modal */
        taskModal.remove();

        /** Remove event listener */
        App.store.get('maincontainer').get().removeEventListener('mouseup', closeModal);

        /** Enable pointer events on main container children */
        App.store.get('maincontainer').eventsOn();
    }
}
