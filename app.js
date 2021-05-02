/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_CreateItem from './Actions/Action_CreateItem.js'
import Action_GetCurrentUser from './Actions/Action_GetCurrentUser.js'

/** Core */
import Core_Store from './Core/Core_Store.js'
import Core_Route from './Core/Core_Route.js'

/** Components */
import Component_SideBar from './Components/Component_SideBar.js'
import Component_AppContainer from './Components/Component_AppContainer.js'
import Component_MainContainer from './Components/Component_MainContainer.js'

/** Config */
import Config from './config.js'

/**
 * Add Title Case method
 * Ex: title case => Title Case
 */
String.prototype.toTitleCase = function () {
    return this
        .toLowerCase()
        .split(' ')
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
}

/**
 * Modified from example linked below.
 * 
 * @link https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
 * 
 * @param {String} key     - Object property. Assumes value is :String or :Number.
 * @param {String} [order] - Accepts 'asc', or 'desc'.
 */
Array.prototype.sortByKey = function (key, order = 'asc') {
    return this.sort((a, b) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;

        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }

        return ((order === 'desc') ? (comparison * -1) : comparison);
    });
}

/** Add new window method */
window.replaceErrors = (key, value) => {
    if (value instanceof Error) {
        var error = {};

        Object.getOwnPropertyNames(value).forEach(function (key) {
            error[key] = value[key];
        });

        return error;
    }

    return value;
}

/** Implement global error callback */
window.onerror = async (message, source, lineno, colno, error) => {
    if (App.settings.logErrors) {
        try {
            const data = {
                Message: message,
                Error: JSON.stringify(error, replaceErrors),
                URL: source,
                Line: lineno,
                Column: colno,
                UserTitle: App.user.Account,
                UserEmail: App.user.email
            };
    
            Action_CreateItem({
                list: 'Errors',
                data,
                notify: false,
                updateList: false
            });
    
            return false;
        } catch(e) {
            console.log(e);
        }
    }
}

/** Start app on page load */
window.onload = async () => {
    /** Get config.js */
    const {
        title,
        fontFamily
        primaryColor,
        secondaryColor,
        gradientColor,
        info,
        defaultRoute,
        userFields,
        settings,
        routes,
        onLoad
    } = Config();

    /** Set unique Id counter start value */
    let idCounter = 0;

    /** @global */
    window.App = {
        title,
        info,
        settings,
        fontFamily: fontFamily || `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
        defaultColor: 'darkslategray;',
        defaultBorder: 'solid 1px lightgray',
        defaultRoute,
        primaryColor,
        secondaryColor,
        gradientColor,
        gradientColorLight: '#43CBFF',
        gradientColorDark: '#9708CC',
        highlightColor: '#f6b73c',
        store: Core_Store(),
        route: Core_Route(routes),
        getNextId() {
            return `App-${idCounter++}`;
        }
    };

    /** Run Config.onLoad */
    if (onLoad) {
        onLoad();
    }

    /** Get SP User Profile and App Users list item */
    const user = await Action_GetCurrentUser(userFields);

    App.user = user;

    /** Add App Container to #app */
    const appContainer = Component_AppContainer();

    appContainer.add();

    /** Get current route */
    const path = location.href.split('#')[1];

    /** Attach Router to browser back/forward event */
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            App.route(event.state.url.split('#')[1], {
                scrollTop: App.ViewScrollTop
            });
        }
    });

    const sideBar = Component_SideBar({
        parent: appContainer,
        routes: routes.filter(route => route.hide !== true),
        path
    });

    App.store.add({
        name: 'sidebar',
        component: sideBar
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

    /** Run current route on page load */
    App.route(path); 
}
