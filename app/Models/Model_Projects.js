/** RHC-C G-6 SharePoint Team */

export default function Model_Projects(data) {
    data.forEach(project => {
        const {
            Id
        } = project;

        project.getTasks = () => {
            const tasks = App.data.lists.Tasks.filter(item => item.ParentType === 'Project' && item.ParentId === Id);

            return tasks;
        }
    });
}