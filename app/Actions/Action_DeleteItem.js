/** (C) 2021 Stephen Matheis */

/** Components */
import Component_Notification from '../Components/Component_Notification.js'

/** Actions */
import Action_Get from './Action_Get.js'
import Action_GetRequestDigest from './Action_GetRequestDigest.js'
import Action_Post from './Action_Post.js'

/**
 * Delete SharePoint list item.
 * 
 * @param {Object}  param          - Interface to UpdateItem() module.
 * @param {string}  param.list     - SharePoint List Name.
 * @param {number}  param.itemId   - Item Id of item in param.list.
 * @param {boolean} [param.notify] - If false, don't display notification.
 */
export default async function Action_DeleteItem(param) {
    const {
        list,
        itemId,
        notify,
        notifyMessage
    } = param;

    /** Get item by id */
    const getItem = await Action_Get({
        list,
        filter: `Id eq ${itemId}`
    });

    const item = getItem[0];

    /** Check for item */
    if (!item) {
        console.error(param);

        return;
    }

    /** Get new request digest */
    const requestDigest = await Action_GetRequestDigest();

    /** Define Post interface */
    const postOptions = {
        url: item.__metadata.uri,
        headers: {
            "Content-Type": "application/json;odata=verbose",
            "Accept": "application/json;odata=verbose",
            "X-HTTP-Method": "DELETE",
            "X-RequestDigest": requestDigest,
            "If-Match": item.__metadata.etag
        }
    }

    /** Post update */
    await Action_Post(postOptions);

    // console.log(App.data.lists[list]);
    
    const index = App.data.lists[list].indexOf(item);

    App.data.lists[list].splice(index, 1);

    // console.log(App.data.lists[list]);

    /** Notify */
    if (notify !== false) {
        const notification = Component_Notification({
            text: notifyMessage || `Removed!`
        });

        notification.add();

        setTimeout(() => {
            notification.remove();
        }, 6000);
    }
}