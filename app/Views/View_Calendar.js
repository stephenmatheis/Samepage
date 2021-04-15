/* RHC-C SharePoint Team | PA&E Project Request */

/** Components */
import Component_Title from '../Components/Component_Title.js'
import Component_Container from '../Components/Component_Container.js'

/** View Parts */
import ViewPart_AdminCalendar from '../ViewParts/ViewPart_AdminCalendar.js'
import ViewPart_UserCalendar from '../ViewParts/ViewPart_UserCalendar.js'

export default function View_Calendar() {
    const parent = App.store.get('maincontainer');
    
    const viewTitle = Component_Title({
        title: App.title,
        subTitle: App.user.Role === 'User' ? `${App.user.Command} - ${App.user.Group}` : App.user.Command,
        parent,
        date: `${App.user.FirstName} | ${new Date().toLocaleString('default', {
            dateStyle: 'full'
        })}`,
        type: 'across'
    });

    viewTitle.add();

    if (App.user.Role === 'Admin') {
        ViewPart_AdminCalendar({
            parent
        });
    }

    if (App.user.Role === 'User') {
        ViewPart_UserCalendar({
            parent
        });
    }
}
