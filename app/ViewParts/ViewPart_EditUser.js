/* RHC-C SharePoint Team | Individual Critical Tasks List (ICTL) */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'

/* Components */
import Component_SingleLineTextField from '../Components/Component_SingleLineTextField.js'
import Component_EmailField from '../Components/Component_EmailField.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'

export default async function ViewPart_EditUser(param) {
    const {
        user,
        parent
    } = param;

    const {
        FirstName,
        MiddleName,
        LastName,
        Account,
        Email,
        Command,
        Role
    } = user;

    /** Firsts Name */
    const firstNameField = Component_SingleLineTextField({
        label: 'First name',
        description: '',
        value: FirstName,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
    });

    firstNameField.add();

    /** Middle Name */
    const middleNameField = Component_SingleLineTextField({
        label: 'Middle name',
        description: '',
        value: MiddleName,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
    });

    middleNameField.add();

    /** Last Name */
    const lastNameField = Component_SingleLineTextField({
        label: 'Last name',
        description: '',
        value: LastName,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
    });

    lastNameField.add();
    
    /** Account */
    const accountField = Component_SingleLineTextField({
        label: 'Account',
        description: '',
        value: Account,
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
    });

    accountField.add();
    
    /** Email */
    const emailField = Component_EmailField({
        description: 'Example: name@mail.mil. Leave blank if team member does not have an @mail.mil account.',
        value: Email,
        width: '350px',
        domains: [ '@mail.mil' ],
        parent,
    });

    emailField.add();

    /** Command */
    const commandField = Component_DropDownField({
        list: 'Commands',
        label: 'Command',
        value: Command,
        required: true,
        dropDownOptions: await Action_Get({ list: 'Commands' }).then(data => data.map(item => {
            const { Id, Command } = item;
            return { id: Id, value: Command };
        })),
        width: '100px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    commandField.add();

    /** Role */
    const roleField = Component_DropDownField({
        list: 'Roles',
        label: 'Role',
        value: Role,
        required: true,
        dropDownOptions: await Action_Get({ list: 'Roles' }).then(data => data.map(item => {
            const { Id, Role } = item;
            return { id: Id, value: Role };
        })),
        width: '100px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });

    roleField.add();

    return {
        getFieldValues() {
            return {
                FirstName: firstNameField.value(),
                MiddleName: middleNameField.value(),
                LastName: lastNameField.value(),
                Account: accountField.value(),
                Email: emailField.value(),
                Command: commandField.value(),
                Group: groupField.value(),
                Role: roleField.value()
            }
        }
    };
}
