/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Model_Task from './Model_Task.js';

export default function Model_Parent(param) {
    const {
        type,
        item
    } = param;
    
    const {
        Id
    } = item;

    item.getTasks = async () => {
        const tasks = await Action_Get({
            list: 'Tasks',
            select: 'Id,ParentId,ParentType,Task,Notes,Bucket,BucketOrder,Progress,StartDate,DueDate,EffortEstimate,EffortActual,Attachments,AttachmentFiles',
            expand: 'AttachmentFiles',
            filter: `ParentType eq '${type}' and ParentId eq ${Id}`
        });
        
        return tasks.map(task => Model_Task(task));
    }

    item.getMembers = async () => {
        return await Action_Get({
            list: `${type}Assignees`,
            filter: `ParentId eq ${Id}`
        });
    }
    
    return item;
}