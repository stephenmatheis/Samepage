/** RHC-C SharePoint Team */

/* Components */
import Component_Alert from '../Components/Component_Alert.js';
import Component_Title from '../Components/Component_Title.js'

export default async function View_403() {
    const parent = App.store.get('maincontainer');

    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `403`,
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();

    const alertBanner = Component_Alert({
        type: 'info',
        text: `Oops! It appears you don't have access to view that page. Please select a different option from the menu on the left.`,
        parent,
        margin: '20px 0px 0px 0px'
    });

    alertBanner.add();
}
