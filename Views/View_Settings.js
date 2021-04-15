/** RHC-C SharePoint Team */

/** Components */
import Component_Title from '../Components/Component_Title.js'
import Component_Container from '../Components/Component_Container.js'

/** View Parts */
import ViewPart_AccountInfo from '../ViewParts/ViewPart_AccountInfo.js'

export default async function View_Settings() {
    const parent = App.store.get('maincontainer');

    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `Settings`,
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();
    
    const viewContainer = Component_Container({
        // margin: '30px 0px 0px 0px',
        // direction: 'column',
        parent
    });

    viewContainer.add();

    ViewPart_AccountInfo({
        parent: viewContainer
    });
}
