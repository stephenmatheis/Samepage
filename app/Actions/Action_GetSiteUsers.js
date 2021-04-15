/** (C) 2021 Stephen Matheis */

export default function Get_SiteUsers(param) {
    const {
        query
    } = param;

    const abortController = new AbortController();

    const url = `../../_api/web/siteusers?$filter=substringof('${query.toLowerCase()}',LoginName) eq true and substringof('i%3A0%23.w',LoginName) eq true`;
    const init = {
        headers : { 
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json; odata=verbose'
        },
        signal: abortController.signal 
    };

    return {
        abortController,
        response: fetch(url, init).then(async response => {
            const data = await response.json();
            
            return data.d.results;
        })
        .catch(error => {
            // console.log(error);
        })
    };
}
