/** RHC-C G-6 SharePoint Team */

/** Components */
import Component_Notification from '../Components/Component_Notification.js'

/** Actions */
import Action_Get from './Action_Get.js'
import Action_GetRequestDigest from './Action_GetRequestDigest.js'
import Action_Post from './Action_Post.js'

/**
 * Update SharePoint list item.
 * @param {Object}  param          - Interface to Action_UpdateItem() module.
 * @param {string}  param.list     - SharePoint List Name.
 * @param {number}  param.itemId   - Item Id of item in param.list.
 * @param {boolean} [param.notify] - If false, don't display notification.
 */
export default async function Action_UpdateItem(param) {
    const {
        list,
        itemId,
        select,
        expand,
        data,
        notify,
        notifyMessage
    } = param;

    // Exit if no data passed in
    if (Object.getOwnPropertyNames(data).length === 0) {
        return;
    }

    // Get item by id
    const getItem = await Action_Get({
        list,
        filter: `Id eq ${itemId}`
    });

    const item = getItem[0];

    // Get new request digest
    const requestDigest = await Action_GetRequestDigest();

    // Add SharePoint List Item Type metadata property to passed in data object
    data.__metadata = {
        'type': item.__metadata.type
    } 
    
    // Define MERGE interface
    const postOptions = {
        url: item.__metadata.uri,
        data: data,
        headers: {
            "Content-Type": "application/json;odata=verbose",
            "Accept": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE",
            "X-RequestDigest": requestDigest,
            "If-Match": item.__metadata.etag
        }
    }

    /** MERGE */
    /** @todo change Post module name to something more descriptive / less ambiguous*/
    await Action_Post(postOptions);

    /** Get List Param */
    const listParam = App.data.getListParam(list) || {};

    /** Get updated item */
    const getUpdatedItem = await Action_Get({
        list,
        select: listParam.select || select,
        expand: listParam.expand || expand,
        filter: `Id eq ${itemId}`
    });

    const updatedItem = getUpdatedItem[0];

    /** Replace item */
    const currentItem = App.data.lists[list].find(listItem => listItem.Id === item.Id);
    const index = App.data.lists[list].indexOf(currentItem);

    /** Add model properties/methods if present */
    App.data.model({
        list,
        data: [
            updatedItem
        ]
    });

    App.data.lists[list].splice(index, 1, updatedItem);

    /** Notify */
    if (notify !== false) {
        const notification = Component_Notification({
            text: notifyMessage || `Updated!`
        });

        notification.add();

        setTimeout(() => {
            notification.remove();
        }, 6000);
    }

    return updatedItem;
}