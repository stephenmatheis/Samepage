/** (C) 2021 Stephen Matheis */

export default function Model_Assignees(data) {
    data.forEach(assignee => {
        assignee.getUserAccount = () => {
            return App.data.lists.Users.find(item => item.Account === assignee.Account);
        }
    })
}