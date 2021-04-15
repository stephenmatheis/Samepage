/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_AssignedNames(param) {
    const {
        assigned,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='assigned-names'>
                ${addNames()}
            </div>
        `,
        style: /*css*/ `
            #id .assigned-name {
                cursor: pointer;
                background: ${App.secondaryColor};
                padding: 4px;
                border-radius: 4px;
            }
        `,
        parent: parent,
        position,
        events: [
            {
                selector: '#id .assigned-name',
                event: 'click',
                listener(event) {
                    const userAccount = App.data.lists.Users.find(item => item.Account === event.target.dataset.account);

                    if (userAccount) {
                        App.route(`Users/${userAccount.Id}`);
                    }
                }
            }
        ]
    });

    function addNames() {
        let html = '';

        assigned.forEach(item => {
            const {
                Account,
                getUserAccount
            } = item;

            const {
                FirstName,
                LastName
            } = getUserAccount();

            html += /*html*/ `
                <span class='assigned-name' data-account='${Account}'>${FirstName} ${LastName}</span>
            `;
        });

        return html;
    }

    component.addName = (name) => {
        const {
            Account,
            getUserAccount
        } = name;

        const {
            FirstName,
            LastName
        } = getUserAccount();

        let html = '';
        
        html += /*html*/ `
            <span class='assigned-name' data-account='${Account}'>${FirstName} ${LastName}</span>
        `;
        
        component.get().insertAdjacentHTML('beforeend', html);
    }

    component.removeName = (Account) => {
        const name = component.find(`.assigned-name[data-account='${Account}']`);

        if (name) {
            name.remove();
        }
    }

    return component
}