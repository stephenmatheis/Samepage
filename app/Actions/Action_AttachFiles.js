/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_Get from './Action_Get.js'
import GetRequestDigest from './Action_GetRequestDigest.js'

export default async function AttachFiles(param) {
    /** Destructure Interface */
    const {
        list,
        id,
        files
    } = param;

    /** Get new request digest */
    const requestDigest = await GetRequestDigest();

    /** Upload responses */
    /** @todo Refactor with map? */
    const responses = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const name = file.name;
        const fileBuffer = await getFileBuffer(file);

        const upload = await fetch(`../../_api/web/lists/getbytitle('${list}')/items(${id})/AttachmentFiles/add(FileName='${name}')`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json; odata=verbose',
                'content-type': 'application/json; odata=verbose',
                'X-RequestDigest': requestDigest,
            },
            body: fileBuffer
        });

        responses.push(upload);
    }

    function getFileBuffer(file) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            
            fileReader.onload = event => resolve(event.target.result);
            fileReader.readAsArrayBuffer(file);
        });
    }

    await Promise.all(responses);

    /** Get List Param */
    const listParam = App.data.getListParam(list) || {};

    /** Get updated item */
    const getUpdatedItem = await Action_Get({
        list,
        select: listParam.select,
        expand: listParam.expand,
        filter: `Id eq ${id}`
    });

    const updatedItem = getUpdatedItem[0];

    /** Replace item */
    const currentItem = App.data.lists[list].find(listItem => listItem.Id === id);
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