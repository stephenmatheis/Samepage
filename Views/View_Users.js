/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** Components */
import Component_Title from '../Components/Component_Title.js'
import Component_Container from '../Components/Component_Container.js'
import Component_DataTable from '../Components/Component_DataTable.js'
import Component_Modal from '../Components/Component_Modal.js'

/** View Parts */
import ViewPart_EditUser from '../ViewParts/ViewPart_EditUser.js'

export default async function View_Users() {
    const parent = App.store.get('maincontainer');

    const viewTitle = Component_Title({
        title: App.title,
        subTitle: 'Users',
        parent,
        type: 'across'
    });

    viewTitle.add();

    let user;
    let selectedRow;
    let editUser;

    /** Container */
    const container = Component_Container({
        display: 'block',
        margin: '30px 0px',
        parent
    });

    container.add();

    // const usersTable = Component_DataTable({
    //     headers: [
    //         'Last Name',
    //         'First Name',
    //         'Account',
    //         'Email'
    //     ],
    //     columns: [
    //         {
    //             data: 'LastName',
    //             type: 'text',
    //             render(data, type, row) {
    //                 return data;
    //             }
    //         },
    //         {
    //             data: 'FirstName',
    //             type: 'text',
    //             render(data, type, row) {
    //                 return data;
    //             }
    //         },
    //         {
    //             data: 'Account',
    //             type: 'text',
    //             render(data, type, row) {
    //                 return data;
    //             }
    //         },
    //         {
    //             data: 'Email',
    //             type: 'text',
    //             render(data, type, row) {
    //                 return data;
    //             }
    //         }
    //     ],
    //     data: [
    //         {
    //             LastName: 'The Stampede',
    //             FirstName: 'Vash',
    //             Account: 'humanoid.typhoon',
    //             Email: '60b$$man@gunsmoke.org'
    //         }
    //     ],
    //     buttons: [
    //         {
    //             text: 'Add user',
    //             action: function (e, dt, node, config) {
    //                 console.log(e, dt, node, config);
    //             }
    //         }
    //     ],
    //     onRowClick(param) {
    //         const {
    //             row,
    //             item
    //         } = param;

    //         /** Set row */
    //         selectedRow = row;

    //         /** Set user */
    //         user = item;

    //         /** Show Date Modal */
    //         const eventModal = Component_Modal({
    //             title: `First Name Last Name`,
    //             async addContent(modal) {
    //                 editUser = await ViewPart_EditUser({
    //                     user: item,
    //                     parent: modal
    //                 });

    //                 eventModal.showFooter();
    //             },
    //             buttons: {
    //                 footer: [
    //                     {
    //                         value: 'Cancel',
    //                         classes: 'btn-secondary',
    //                         data: [
    //                             {
    //                                 name: 'dismiss',
    //                                 value: 'modal'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         value: 'Update',
    //                         classes: 'btn-primary',
    //                         async onClick(event) {
    //                             const data = editUser.getFieldValues();

    //                             const updatedItem = await Action_UpdateItem({
    //                                 list: 'Users',
    //                                 itemId: user.Id,
    //                                 data
    //                             });

    //                             usersTable.updateRow({
    //                                 row: selectedRow,
    //                                 data: updatedItem
    //                             });

    //                             eventModal.getModal().modal('hide');
    //                         }
    //                     }
    //                 ]
    //             },
    //             parent
    //         });

    //         eventModal.add();
    //     },
    //     parent: container
    // });

    // usersTable.add();
}
