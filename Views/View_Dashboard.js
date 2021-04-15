/** (C) 2021 Stephen Matheis */

/** Components */
import Component_Title from '../Components/Component_Title.js'

export default function View_Dashboard() {
    const parent = App.store.get('maincontainer');
    
    const viewTitle = Component_Title({
        title: App.title,
        subTitle: `Welcome back, ${App.user.FirstName}`,
        parent,
        date: new Date().toLocaleString('default', {
            dateStyle: 'full'
        }),
        type: 'across'
    });

    viewTitle.add();
}
