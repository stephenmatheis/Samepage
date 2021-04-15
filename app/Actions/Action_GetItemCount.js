/** (C) 2021 Stephen Matheis */

export default async function Data_GetItemCount(param) {
    const {
        list,
    } = param;

    const url = `../../_api/web/lists/GetByTitle('${list}')/ItemCount`;
    const headers = {
        headers : { 
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; odata=verbose'
        }
    };

    const response = await fetch(url, headers);
    const data = await response.json()

    return data.d.ItemCount;
}
