/** RHC-C G-6 SharePoint Team */

/** Components */
import Component_Title from '../Components/Component_Title.js'
import Component_Container from '../Components/Component_Container.js'

/** View Parts */
import ViewPart_ParentCards from '../ViewParts/ViewPart_ParentCards.js'

export default async function View_Teams() {
    const parent = App.store.get('maincontainer');
    
    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `Teams`,
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();

    /** 
     * Hack.
     * This is to keep cards from appearing on other views.
     * Need to find a better way.
     */
    const viewContainer = Component_Container({
        parent
    });

    viewContainer.add();

    ViewPart_ParentCards({
        type: 'teams',
        items: [
            {
                id: 1,
                name: 'Bernardelli Insurance Society',
                tasks: [
                    {
                        Id: 1,
                        task: 'Test'
                    }
                ]
            }
        ],
        parent: viewContainer
    });
}
