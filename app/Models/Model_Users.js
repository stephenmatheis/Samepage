/** RHC-C G-6 SharePoint Team */

export default function Model_Users(data) {
    /** Assumes data is always an array [] */
    data.forEach(user => {
        const {
            Account
        } = user;

        user.getTeams = () => {
            const teams = App.data.lists.TeamAssignees.filter(item => item.Account === Account);

            return teams.map(item => {
                const {
                    ParentId
                } = item;

                const team = App.data.lists.Teams.find(team => team.Id === ParentId);

                if (team) {
                    return team;
                }
            });
        }

        user.getApplications = () => {
            const apps = App.data.lists.ApplicationAssignees.filter(item => item.Account === Account);

            return apps.map(item => {
                const {
                    ParentId
                } = item;

                const app = App.data.lists.Applications.find(app => app.Id === ParentId);

                if (app) {
                    return app;
                }
            });
        }

        user.getProjects = () => {
            const projects = App.data.lists.ProjectAssignees.filter(item => item.Account === Account);

            return projects.map(item => {
                const {
                    ParentId
                } = item;

                const project = App.data.lists.Projects.find(project => project.Id === ParentId);

                if (project) {
                    return project;
                }
            });
        }
    });
}