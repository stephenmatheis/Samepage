/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_GetCurrentUser from '../Actions/Action_GetCurrentUser.js'
import Get from '../Actions/Action_Get.js'
import CreateItem from '../Actions/Action_CreateItem.js'

/** Components */
import Component_LoadingBar from '../Components/Component_LoadingBar.js'

/** Models */
import Model_User from '../Models/Model_User.js'

export default async function Data(param) {
    const {
        getLists
    } = param;

    /** Get SP User Profile and ICTL User list item properties */
    const user = await Action_GetCurrentUser();

    /** Run user through Model_User */
    Model_User(user);

    const loadingBar = Component_LoadingBar({
        displayTitle: App.title,
        displayText: 'Loading',
        totalCount: getLists.length
    });

    loadingBar.add();

    const lists = await Promise.all(getLists.map(param => {
        const {
            list,
            label,
            select,
            expand,
            orderby
        } = param;

        return Get({
            list,
            select,
            expand,
            orderby,
            action() {
                loadingBar.update({
                    newDisplayText: label
                });
            }
        });
    }));

    await loadingBar.end();

    const data = {
        user,
        model(param) {
            const {
                list,
                data
            } = param;

            const getListItem = getLists.find(item => item.list === list);

            if (getListItem && getListItem.model) {
                console.log(`apply ${list} model`);

                getListItem.model(data);
            }
        },
        getListParam(list) {
            return getLists.find(item => item.list === list);
        },
        lists: {}
    }

    getLists.forEach((param, index) => {
        const {
            list,
            model
        } = param;

        /** 
         * Run model 
         * 
         * Implemented with array.forEach()
         * Pro/cons for refactor to array.map()?
         * 
        */
        if (model) {
            model(lists[index]);
        }

        data.lists[list] = lists[index];
    });

    // if (userItem) {
    //     try {
    //         data.user.Id = userItem.Id;
    //         data.user.role = userItem.FK_Role;
    //     } catch(error) {
    //         const errorData = {
    //             Message: `Error adding properties to user.`,
    //             Error: JSON.stringify(error, replaceErrors),
    //             URL: 'Data.js',
    //             Line: 0,
    //             Column: 0,
    //             UserTitle: data.user.account,
    //             UserEmail: data.user.email
    //         };
    
    //         CreateItem({
    //             list: 'Errors',
    //             data: errorData
    //         });
    //     }
    // } else {
    //     data.user.role = 'Requestor';

    //     const errorData = {
    //         Message: `No user account`,
    //         Error: '',
    //         URL: 'Data.js',
    //         Line: 0,
    //         Column: 0,
    //         UserTitle: user.account,
    //         UserEmail: user.email
    //     };

    //     CreateItem({
    //         list: 'Errors',
    //         data: errorData,
    //         notify: false
    //     });
    // }

    return data
}
