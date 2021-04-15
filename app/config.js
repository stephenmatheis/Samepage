/** RHC-C G-6 SharePoint Team */

/** Libraries */
import './Libraries/jQuery/jquery-3.4.1.js'
import './Libraries/Bootstrap/js/bootstrap.bundle.min.js'
import './Libraries/DataTables/datatables.js'
import './Libraries/DataTables/js/dataTables.bootstrap4.js'
import './Libraries/DataTables/Buttons-1.7.0/js/dataTables.buttons.js'
import './Libraries/Chartsjs/Chart.min.js'

/** Actions */
import Action_LoadCSS from './Actions/Action_LoadCSS.js'

/** Views */
import View_Dashboard from './Views/View_Dashboard.js'
import View_Teams from './Views/View_Teams.js'
import View_Projects from './Views/View_Projects.js'
import View_Tasks from './Views/View_Tasks.js'
import View_Users from './Views/View_Users.js'
import View_NewUser from './Views/View_NewUser.js'
import View_EditUser from './Views/View_EditUser.js'
import View_Settings from './Views/View_Settings.js'

export default function Config() {
    return {
        title: 'Samepage',
        primaryColor: 'rebeccapurple',
        secondaryColor: 'ghostwhite',
        defaultRoute: 'Dashboard',
        info: {

        },
        settings: {
            logErrors: false
        },
        userFields: 'Id,Account,LastName,FirstName,MiddleName,Email,Command,Role',
        onLoad() {
            Action_LoadCSS([
                'Libraries/DataTables/css/dataTables.bootstrap4.min.css',
                'Libraries/DataTables/Buttons-1.7.0/css/buttons.dataTables.css',
                'Libraries/Bootstrap/css/bootstrap.min.css',
                'Libraries/fullcalendar/main.css',
                'Libraries/Chartsjs/Chart.min.css'
            ]);
        },
        routes: [
            {
                path: 'Dashboard',
                icon: 'stack',
                go() {
                    View_Dashboard();
                }
            },
            {
                path: 'Teams',
                icon: 'users',
                go(pathParts) {
                    if (pathParts.length === 1 && pathParts[0] === 'Teams') {
                        View_Teams();
                    } else if (pathParts.length === 3) {
                        View_Tasks({
                            list: pathParts[0],
                            itemId: parseInt(pathParts[2])
                        });
                    }
                }
            },
            {
                path: 'Projects',
                icon: 'clipboard',
                go(pathParts) {
                    if (pathParts.length === 1 && pathParts[0] === 'Projects') {
                        View_Projects();
                    } else if (pathParts.length === 3) {
                        View_Tasks({
                            list: pathParts[0],
                            itemId: parseInt(pathParts[2])
                        });
                    }
                }
            },
            {
                path: 'Users',
                icon: 'address-book',
                roles: [
                    'Admin'
                ],
                go(pathParts) {
                    if (pathParts.length === 1 && pathParts[0] === 'Users') {
                        View_Users();
                    } else if (pathParts.length === 2 && pathParts[1] === 'New') {
                        View_NewUser();
                    } else if (pathParts.length === 2) {
                        View_EditUser({
                            itemId: parseInt(pathParts[1])
                        });
                    }
                }
            },
            {
                path: 'Settings',
                icon: 'cog',
                go() {
                    View_Settings();
                }
            }
        ]
    }
}
