/** (C) 2021 Stephen Matheis */

/** Components */
import Component_Notification from '../Components/Component_Notification.js'

/** Actions */
import Action_Get from './Action_Get.js'
import Action_GetRequestDigest from './Action_GetRequestDigest.js'
import Action_Post from './Action_Post.js'

/**
 * Create SharePoint list item.
 * @param {Object}   param          Interface to UpdateItem() module.   
 * @param {string}   param.type     SharePoint list item type.
 * @param {string}   param.list     SharePoint list Name.
 * @param {string}   [param.list]   SharePoint list item type.
 * @param {function} param.action   Function to be run after updating item posts.
 * @param {boolean}  [param.notify] If false, don't display notification.
 */
export default async function CreateItem(param) {
    const {
        type,
        list,
        data,
        notify,
        updateList,
        message
    } = param;

    /** Get new request digest */
    const requestDigest = await Action_GetRequestDigest();

    data.__metadata = {
        'type': `SP.Data.${type || list}ListItem`
    }

    /**
     * @interface
     * @property {string} url - SharePoint 2013 REST API
     */
    const postOptions = {
        url: `../../_api/web/lists/GetByTitle('${list}')/items`,
        data,
        headers: {
            "Content-Type": "application/json;odata=verbose",
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
        }
    }

    const newItem = await Action_Post(postOptions);

    if (!newItem) {
        return;
    }

    // console.log(App.data.lists[list]);
    // console.log(`new ${list} item`, newItem.d);
    // console.log(App.data.lists[list]);

    /** Get List Param */
    const listParam = App.data.getListParam(list) || {};

    /** Get newly created item */
    const getNewItem = await Action_Get({
        list,
        select: listParam.select,
        expand: listParam.expand,
        filter: `Id eq ${newItem.d.Id}`
    });

    const item = getNewItem[0];

    if (updateList !== false) {
        /** Add model properties/methods if present */
        App.data.model({
            list,
            data: [
                item
            ]
        });

        /** @todo add to array based on original order (e.g. asc/desc) */
        App.data.lists[list].push(item);
    }
    
    if (notify !== false) {
        const notification = Component_Notification({
            text: message || `Success!`
        });

        notification.add();
        notification.remove(6000);
    }

    return item;
}