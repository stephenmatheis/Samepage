/** RHC-C G-6 SharePoint Team */

export default function Model_Applications(data) {
    data.forEach(app => {
        const {
            Id
        } = app;

        app.getTasks = () => {
            const tasks = App.data.lists.Tasks.filter(item => item.ParentType === 'Application' && item.ParentId === Id);

            return tasks;
        }
    });
}