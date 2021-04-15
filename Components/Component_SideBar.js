/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

export default function Component_SideBar(param) {
    const {
        parent,
        routes,
        iconColor,
        labelColor,
        background,
        borderRight,
        path
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='sidebar'>
                <div class='nav-container'>
                    ${buildNav()}
                </div>
                <div class='settings-container'>
                    <!-- Everyone can see Settings -->
                    <span class='nav ${(path === 'Settings') ? 'nav-selected' : ''} settings' id='Settings'>
                        <svg class='icon'><use href='#icon-cog'></use></svg>
                        <span class='text'>Settings</span>
                    </span>
                </div>
            </div>
        `,
        style: /*css*/ `
            .sidebar {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                height: 100vh;
                background: ${background || App.primaryColor};
                border-right: ${borderRight || 'none'};
            }

            /* Nav Container */
            .nav-container {
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: center;
            }

            .sidebar .nav {
                display: flex;
                align-items: center;
                width: 100%;
                cursor: pointer;
                text-align: left;
                font-size: 1.7em;
                font-weight: 400;
                padding: 15px 14px;
                color: ${iconColor || App.secondaryColor};
                border-left: solid 3px transparent;
                border-right: solid 3px transparent;
            }

            .sidebar .nav .icon {
                fill: ${iconColor || 'white'};
                stroke: ${iconColor || 'white'};
            }

            .sidebar .nav .text {
                color: ${labelColor || 'white'};
                font-size: .7em;
                padding-left: 10px;
            }

            .sidebar .nav .icon:hover,
            .sidebar .nav-selected .icon {
                fill: ${iconColor || 'white'};
                stroke: ${iconColor || 'white'};
            }

            .sidebar .nav-selected {
                border-left: solid 3px ${iconColor || App.secondaryColor};
            }

            /* Settings */
            .settings-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: flex-end;
            }
        `,
        parent: parent,
        position: 'afterbegin',
        permanent: true,
        events: [
            {
                selector: '.nav',
                event: 'click',
                listener: routeToView
            }
        ]
    });

    function buildNav() {
        return routes
            .filter(route => route.path !== 'Settings')
            .map(route => {
                const {
                    path,
                    icon,
                    roles
                } = route;

                if (roles) {
                    if (roles.includes(App.user.Role)) {
                        return navTemplate(path, icon);
                    } else {
                        return '';
                    }
                } else {
                    return navTemplate(path, icon);
                }

            }).join('\n');
    }

    function navTemplate(routeName, icon) {
        const firstPath = path ? path.split('/')[0] : undefined;

        return /*html*/ `
            <span class='nav ${(firstPath === routeName || firstPath === undefined && routeName === App.defaultRoute) ? 'nav-selected' : ''}' id='${routeName}'>
                <svg class='icon'><use href='#icon-${icon}'></use></svg>
                <span class='text'>${routeName.split(/(?=[A-Z])/).join(' ')}</span>
            </span>
        `;
    }

    function routeToView() {
        component.findAll('.nav').forEach((nav) => {
            nav.classList.remove('nav-selected');
        });

        this.classList.add('nav-selected');

        // const path = (this.id === 'Home') ? '' : this.id.split(' ').join('');
        const path = this.id.split(' ').join('');

        App.route(path);
    }

    component.selectNav = (id) => {
        component.findAll('.nav').forEach((nav) => {
            nav.classList.remove('nav-selected');
        });

        const nav = component.find(`#${id}.nav`);

        if (nav) {
            nav.classList.add('nav-selected');
        }
    }

    return component;
}
