/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Get from './Action_Get.js'
import GetRequestDigest from './Action_GetRequestDigest.js'

export default async function Action_DeleteAttachments(param) {
    const {
        list,
        itemId,
        fileNames
    } = param;

    /** Get new request digest */
    const requestDigest = await GetRequestDigest();

    /** Upload responses */
    /** @todo Refactor with map? */
    const responses = [];

    for (let i = 0; i < fileNames.length; i++) {
        const upload = await fetch(`../../_api/web/lists/getbytitle('${list}')/items(${itemId})/AttachmentFiles/getByFileName('${fileNames[i]}')`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json; odata=verbose',
                'content-type': 'application/json; odata=verbose',
                'X-HTTP-Method': 'DELETE',
                'X-RequestDigest': requestDigest,
            },
        });

        responses.push(upload);
    }

    await Promise.all(responses);

    /** Get List Param */
    const listParam = App.data.getListParam(list) || {};

    /** Get updated item */
    const getUpdatedItem = await Action_Get({
        list,
        select: listParam.select,
        expand: listParam.expand,
        filter: `Id eq ${itemId}`
    });

    const updatedItem = getUpdatedItem[0];

    /** Replace item */
    const currentItem = App.data.lists[list].find(listItem => listItem.Id === itemId);
    const index = App.data.lists[list].indexOf(currentItem);

    /** Add model properties/methods if present */
    App.data.model({
        list,
        data: [
            updatedItem
        ]
    });

    /** Replace item */
    App.data.lists[list].splice(index, 1, updatedItem);

    return updatedItem;
}