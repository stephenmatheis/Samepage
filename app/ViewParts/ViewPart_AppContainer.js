/** RHC-C G-6 SharePoint Team */

/** Components */
import Component_SideBar from '../Components/Component_SideBar.js'
import Component_AppContainer from '../Components/Component_AppContainer.js'
import Component_MainContainer from '../Components/Component_MainContainer.js'
import Component_VersionBanner from '../Components/Component_VersionBanner.js'

export default function ViewPart_AppContainer(param) {
    const {
        route
    } = param;

    const appContainer = Component_AppContainer();
    
    appContainer.add();

    const sideBar = Component_SideBar({
        parent: appContainer,
        route
    });

    sideBar.add();

    const mainContainer = Component_MainContainer({
        parent: appContainer
    });

    App.store.add({
        name: 'maincontainer',
        component: mainContainer
    });

    mainContainer.add();

    const versionBanner = Component_VersionBanner({
        version: 'CHARLIE'
    });

    versionBanner.add();
}
