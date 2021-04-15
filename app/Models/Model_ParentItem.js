/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/** Models */
import Model_Tasks from '../Models/Model_Tasks.js'

export default function Model_ParentItem(param) {
    const {
        type,
        data
    } = param;

    return data.map(item => {
        const {
            Id
        } = item;

        item.getTasks = async () => {
            const getTasks = await Action_Get({
                list: 'Tasks',
                select: 'Id,ParentId,ParentType,Task,Notes,Bucket,BucketOrder,Progress,StartDate,DueDate,EffortEstimate,EffortActual,Attachments,AttachmentFiles',
                expand: 'AttachmentFiles',
                filter: `ParentType eq '${type}' and ParentId eq ${Id}`
            });

            return await Model_Tasks(getTasks);
        }

        item.getMembers = async () => {
            return await Action_Get({
                list: 'TeamAssignees',
                filter: `ParentId eq ${Id}`
            });
        }

        return item;
    });
}