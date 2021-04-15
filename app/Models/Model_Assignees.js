/** RHC-C G-6 SharePoint Team */

export default function Model_Assignees(data) {
    data.forEach(assignee => {
        assignee.getUserAccount = () => {
            return App.data.lists.Users.find(item => item.Account === assignee.Account);
        }
    })
}