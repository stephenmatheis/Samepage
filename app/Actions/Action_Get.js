/** RHC-C G-6 SharePoint Team */

/** Actions */
import GetItemCount from './Action_GetItemCount.js'
import CreateGetFilter from './Action_CreateGetFilter.js'

export default async function Data_Get(param) {
    const {
        list,
        filter,
        action,
        select,
        expand,
        orderby,
        api
    } = param;

    const url = `../../_api/web/lists/GetByTitle`;
    const headers = {
        headers : { 
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': `application/json; odata=verbose`
        }
    };

    const itemCount = !api ? await GetItemCount({
        list
    }) : 1;

    async function getSharePointListItems(url, all = []) {
        const response = await fetch(url, headers);
        const data = await response.json();

        all = all.concat(data.d.results);

        if (action) {
            action();
        }

        if (data.d.__next) {
            return await getSharePointListItems(data.d.__next, all);
        } else {
            return all;
        }
    }

    let queryFilterString = '';
    
    if (filter) {
        queryFilterString = typeof filter === 'string' ? `$filter=${filter}` : `$filter=${CreateGetFilter(filter)}`;
    }

    if (select) {
        queryFilterString += `${queryFilterString ? '&' : ''}$select=${select}`;
    }

    if (expand) {
        queryFilterString += `${queryFilterString ? '&' : ''}$expand=${expand}`;
    }

    if (orderby) {
        queryFilterString += `${queryFilterString ? '&' : ''}$orderby=${orderby}`;
    }

    // return await getSharePointListItems(`${url}('${list}')/items?${select ? `?$select=${select}&` : ''}${filter ? `$filter=${filter}` : ''}`);
    return await getSharePointListItems(`${api || `${url}('${list}')/items?$top=${itemCount}`}&${queryFilterString || ''}`);
}
