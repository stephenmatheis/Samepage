/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

export default function Model_Task(task) {
    const {
        Id,
        ParentId,
        ParentType
    } = task;

    /** @todo add CompletedBy and CompletedDate to Checklist items */
    task.getChecklist = async () => {
        const getChecklist = await Action_Get({
            list: 'Checklist',
            filter: `TaskId eq ${Id}`,
        });

        return getChecklist.map(item => {
            return {
                id: item.Id,
                value: item.Description,
                checked: item.Complete,
                CompletedBy: item.CompletedBy,
                CompletedDate: item.CompletedDate
            };
        });
    }

    task.getAssignees = async () => {
        return await Action_Get({
            list: 'TaskAssignees',
            filter: `ParentId eq ${ParentId}`,
        });
    }

    task.getUnassigned = async () => {
        const assigned = task.getAssignees().map(item => item.Account);

        const getParentAssigned = await Action_Get({
            list: `${ParentType}Assignees`,
            filter: `ParentId eq ${ParentId}`
        });

        return getParentAssigned.filter(item =>!assigned.includes(item.Account))
    }

    return task;
}