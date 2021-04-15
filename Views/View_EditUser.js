/** (C) 2021 Stephen Matheis */

/** Components */
import Component_Title from '../Components/Component_Title.js'

/** View Parts */
import ViewPart_UserForm from '../ViewParts/ViewPart_UserForm.js'

export default function View_EditUser(param) {
    const {
        itemId
    } = param;

    const parent = App.store.get('maincontainer');
    
    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `Edit User`,
        parent,
        type: 'across'
    });

    viewTitle.add();

    ViewPart_UserForm({
        itemId 
    });
}
