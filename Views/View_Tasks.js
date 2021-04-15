/** (C) 2021 Stephen Matheis */

/**
 * @todo Show team members somewhere (top?) of page
 * @todo add paperclip svg icon to task card if attachments present
 */

/** Actions */
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** @todo fetch data on every route */
import Action_Get from '../Actions/Action_Get.js'
import Model_Parent from '../Models/Model_Parent.js'

/** Components */
import Component_Container from '../Components/Component_Container.js'
import Component_Title from '../Components/Component_Title.js'
import Component_BucketHeading from '../Components/Component_BucketHeading.js'
import Component_AddTaskCardButton from '../Components/Component_AddTaskCardButton.js'
import Component_LoadingCircle from '../Components/Component_LoadingCircle.js'
import Component_FoldingCube from '../Components/Component_FoldingCube.js'
import Component_TaskCard from '../Components/Component_TaskCard.js'
import Component_NewTaskForm from '../Components/Component_NewTaskForm.js'

/** View Parts */
import ViewPart_TaskForm from '../ViewParts/ViewPart_TaskForm.js'

export default async function View_Tasks(param) {
    const {
        itemId,
        list
    } = param;

    /** Set Main Container bottom padding to 0px */
    App.store.get('maincontainer').get().style.paddingBottom = '0px';

    /** Add flex 1 container  */
    const flexContainer = Component_Container({
        flex: '1',
        height: '100%',
        direction: 'column',
        parent: App.store.get('maincontainer')
    });

    flexContainer.add();

    /** Add full width title */
    const flexTitle = Component_Title({
        title: App.title,
        subTitle: '',
        parent: flexContainer,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    flexTitle.add();

    const data = await Action_Get({
        list,
        filter: `Id eq ${itemId}`
    });

    if (data.length === 0) {
        console.log('show error page');

        return;
    }

    /** Define types */
    const types = {
        Teams: 'Team',
        Projects: 'Project',
        Applications: 'Application'
    };

    /** Apply model */
    const parentItem = Model_Parent({
        type: types[list],
        item: data[0]
    });

    if (!parentItem) {
        console.log('show error page');

        return;
    }

    console.log(parentItem);

    const ParentType = list.slice(0, -1);
    const label = parentItem[ParentType];

    /** Set sub title */
    flexTitle.setSubtitle(`${label} Tasks`);

    const {
        getTasks,
        getMembers
    } = parentItem;

    /** Tasks */
    const tasks = await getTasks();
    const completedTasks = tasks.filter(item => item.Progress === 'Completed');
    const todos = tasks.filter(item => item.Progress !== 'Completed');


    /** Bucket Container */
    const bucketContainer = Component_Container({
        overflow: 'hidden',
        parent: flexContainer
    });

    bucketContainer.add();

    /** Bucket: To do */
    const todoContainer = Component_Container({
        direction: 'column',
        minWidth: '330px',
        height: '100%',
        margin: '0px 30px 0px 0px',
        parent: bucketContainer
    });

    todoContainer.add();

    /** To do count */
    const bucketHeading = Component_BucketHeading({
        label: 'To do',
        doneCount: completedTasks.length,
        totalCount: tasks.length,
        parent: todoContainer
    });

    bucketHeading.add();

    /** Add To do button */
    let newTaskForm;

    const addTaskCardButton = Component_AddTaskCardButton({
        parent: todoContainer,
        action() {
            if (newTaskForm) {
                newTaskForm.remove();
                newTaskForm = undefined;
            } else {
                /** @todo add bucket to param */
                newTaskForm = Component_NewTaskForm({
                    getMembers,
                    getUnassigned: getMembers,
                    parent: addTaskCardButton,
                    position: 'afterend',
                    ParentType,
                    async addTask(data) {
                        /** Reset task form */
                        newTaskForm.reset();

                        /** Add ParentId */
                        data.ParentId = itemId;

                        /** Create task */
                        const newItem = await Action_CreateItem({
                            list: 'Tasks',
                            data,
                            notify: false
                        });

                        /** Update Bucket Heading */
                        bucketHeading.setCount({
                            total: getTasks().length
                        });

                        /** Add disabled task to bucket (enable after update and set assignees completes) */
                        const taskCard = addTaskCard({
                            task: newItem,
                            position: 'afterbegin',
                            disabled: true
                        });

                        /** Update task with default BucketOrder */
                        await Action_UpdateItem({
                            list: 'Tasks',
                            itemId: newItem.Id,
                            data: {
                                BucketOrder: newItem.Id
                            },
                            notify: false
                        });

                        /** Get list of assigned names */
                        const assigned = newTaskForm.getAssignees();

                        /** Add assignees */
                        for (const assignee of assigned) {
                            const {
                                Account
                            } = assignee;

                            /** Create TaskAssignees item */
                            await Action_CreateItem({
                                list: 'TaskAssignees',
                                data: {
                                    ParentId: newItem.Id,
                                    Account
                                },
                                notify: false
                            }); 
                        }

                        /** Enable task */
                        taskCard.enable();
                    }
                });

                newTaskForm.add();
                newTaskForm.focus();
            }
        }
    });

    addTaskCardButton.add();

    /** Add task container */
    const tasksContainer = Component_Container({
        display: 'block',
        padding: '0px 0px 40px 0px',
        overflow: 'overlay',
        scrollbarHover: true,
        parent: todoContainer
    });
    
    tasksContainer.add();

    /** Show Loading Circle */
    const loadingCircleContainer = Component_Container({
        align: 'center',
        justify: 'center',
        width: '300px',
        margin: '50px 0px 0px 0px',
        parent: tasksContainer
    });
    
    loadingCircleContainer.add();

    const loadingIndicator = Component_FoldingCube({
        label: 'Loading tasks',
        parent: loadingCircleContainer
    });
    
    loadingIndicator.add();

    /** Add To dos */
    /** @todo reorder tasks with drag and drop */
    const taskCards = await Promise.all(tasks.sortByKey('BucketOrder', 'desc').map(task => addTaskCard({task})));

    /** Remove loading circle */
    loadingCircleContainer.remove();

    /** Show todos */
    taskCards.forEach(taskCard => {
        taskCard.add();
    });

    async function addTaskCard(param) {
        const {
            task,
            position,
            disabled
        } = param;

        const {
            AttachmentFiles,
            Id,
            Task,
            Progress,
            getChecklist
        } = task;

        const checklist = await getChecklist();

        const taskCard = Component_TaskCard({
            Task,
            attachmentCount: AttachmentFiles.results.length,
            checklistTotal: checklist.length,
            checklistDone:  checklist.filter(item => item.checked).length,
            checked: Progress === 'Completed' ? true : false,
            disabled,
            parent: tasksContainer,
            position,
            action() {
                ViewPart_TaskForm({
                    Id,
                    taskCard
                });
            },
            async onCheck(checked) {
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

                /** Update Bucket Heading */
                bucketHeading.setCount({
                    done: getTasks().filter(item => item.Progress === 'Completed').length
                });
            }
        });

        return taskCard;
    }

    // /** Bucket: Other */
    // const otherContainer = Component_Container({
    //     direction: 'column',
    //     margin: '0px 30px 0px 0px',
    //     parent: bucketContainer
    // });

    // otherContainer.add();

    // /** Completed Heading */
    // const otherHeading = Component_Heading({
    //     text: 'Other',
    //     margin: '20px 0px 0px 0px',
    //     size: '1.2em',
    //     parent: otherContainer
    // });

    // otherHeading.add();
}
