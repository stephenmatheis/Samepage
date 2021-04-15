/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/** Models */
import Model_Parent from './Model_Parent.js'

export default function Model_User(user) {
    const {
        Account
    } = user;

    user.getTeams = async () => {
        const teamAssignees = await Action_Get({
            list: 'TeamAssignees',
            select: 'Id,ParentId,Account',
            filter: `Account eq '${Account}'`
        });

        return await Promise.all(teamAssignees.map(async item => {
            const {
                ParentId
            } = item;

            const team = await Action_Get({
                list: 'Teams',
                select: 'Id,Team',
                filter: `Id eq ${ParentId}`
            }); 

            if (team.length > 0) {
                return Model_Parent({
                    type: 'Team',
                    item: team[0]
                });
            }
        }));
    }

    user.getApplications = async () => {
        const appAssignees = await Action_Get({
            list: 'ApplicationAssignees',
            select: 'Id,ParentId,Account',
            filter: `Account eq '${Account}'`
        });

        return await Promise.all(appAssignees.map(async item => {
            const {
                ParentId
            } = item;

            const app = await Action_Get({
                list: 'Applications',
                select: 'Id,Application',
                filter: `Id eq ${ParentId}`
            }); 

            if (app.length > 0) {
                return Model_Parent({
                    type: 'Application',
                    item: app[0]
                });
            }
        }));
    }

    user.getProjects = async () => {
        const appAssignees = await Action_Get({
            list: 'ProjectAssignees',
            select: 'Id,ParentId,Account',
            filter: `Account eq '${Account}'`
        });

        return await Promise.all(appAssignees.map(async item => {
            const {
                ParentId
            } = item;

            const project = await Action_Get({
                list: 'Projects',
                select: 'Id,Project',
                filter: `Id eq ${ParentId}`
            }); 

            if (project.length > 0) {
                return Model_Parent({
                    type: 'Project',
                    item: project[0]
                });
            }
        }));
    }

    return user;
}