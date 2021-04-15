/** RHC-C G-6 SharePoint Team */

/** Components */
import Component_Notification from '../Components/Component_Notification.js'

/** Actions */
import Action_GetRequestDigest from './Action_GetRequestDigest.js'
import Action_Get from './Action_Get.js'
import UpdateItem from './Action_UpdateItem.js';

/**
 * Create SharePoint list item.
 * @param {Object}   param          Interface to UpdateItem() module.   
 * @param {string}   param.list     SharePoint list Name.
 * @param {string}   [param.list]   SharePoint list item type.
 * @param {function} param.action   Function to be run after updating item posts.
 * @param {boolean}  [param.notify] If false, don't display notification.
 */
export default async function Action_CreateFile(param) {
    const {
        file,
        select,
        expand,
        name,
        list,
        notify,
        message
    } = param;

    // Get new request digest
    const requestDigest = await Action_GetRequestDigest();
    
    const fileBuffer = await getFileBuffer(file);

    const newFile = await fetch(`../../_api/web/folders/GetByUrl('/mtf/DHCC/cmdandstaffslides/${list}')/Files/add(url='${name}.pptx',overwrite=true)`, {
        method: 'POST',
        headers: {
            "Accept": "application/json;odata=verbose",
            'content-type': 'application/json; odata=verbose',
            "X-RequestDigest": requestDigest,
        },
        body: fileBuffer
    });

    function getFileBuffer(file) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            
            fileReader.onload = event => resolve(event.target.result);
            fileReader.readAsArrayBuffer(file);
        });
    }

    // Get updated item
    const getUpdatedItem = await Action_Get({
        list,
        select,
        expand,
        filter: `Title eq '${name}'`
    });

    const updatedItem = getUpdatedItem[0];

    /** Replace item */
    console.log(App.data.lists[list]);
    console.log(updatedItem);
    const index = App.data.lists[list].indexOf(App.data.lists[list].find(item => item.Id === updatedItem.Id));

    App.data.lists[list].splice(index, 1, updatedItem);
    console.log(App.data.lists[list]);
    
    if (notify !== false) {
        const notification = Component_Notification({
            text: message || `Success!`
        });

        notification.add();
        notification.remove(6000);
    }

    return updatedItem;
}