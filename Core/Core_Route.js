/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_History from './Core_History.js'

export default function Action_Route(routes) {
    /** If no path, route to default View */
    return (path = App.defaultRoute, options = {}) => {
        const {
            scrollTop
        } = options;

        /** Get Sidebar */
        const sidebar = App.store.get('sidebar');

        /** Get maincontainer */
        const mainContainer = App.store.get('maincontainer');

        /** Set scroll top */
        App.ViewScrollTop = mainContainer.get().scrollTop;

        /** Remove all events */
        mainContainer.removeEvents();

        /** Turn Padding On (default) */
        mainContainer.paddingOn();

        /** Remove components from DOM */
        mainContainer.empty();

        /** Empty component store */
        App.store.empty();

        /** Re-add maincontainer to store */
        App.store.add({
            name: 'maincontainer',
            component: mainContainer
        });

        /** Re-add sidebar to store */
        App.store.add({
            name: 'sidebar',
            component: sidebar
        });

        /** Set browswer history state */
        Core_History({
            url: `${location.href.split('#')[0]}${(path) ? `#${path}` : ''}`,
            title: `${App.title}${(path) ? ` - ${path}` : ''}`
        });

        /** Check route path */
        const pathParts = path.split('/');

        /** Only select first path, remove any ? that might be passed in */
        const route = routes.find(item => item.path === pathParts[0].split('?')[0]);

        /** Set Sidebar selected nav */
        sidebar.selectNav(route.path);

        /** Call .go() method */
        route.go(pathParts);

        /** Set Scroll Top */
        /** @ */
        if (scrollTop) {
            console.log(scrollTop);

            App.store.get('maincontainer').get().scrollTo({
                top: scrollTop
            });
        }
    }
}
