/** RHC-C G-6 SharePoint Team */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** Components */
import Component_Container from '../Components/Component_Container.js'
import Component_Heading from '../Components/Component_Heading.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_FormButton from '../Components/Component_FormButton.js'
import Component_NameField from '../Components/Component_NameField.js'
import Component_SingleLineTextField from '../Components/Component_SingleLineTextField.js'
import Component_EmailField from '../Components/Component_EmailField.js'
import Component_ItemInfo from '../Components/Component_ItemInfo.js'
import Component_FieldMessage from '../Components/Component_FieldMessage.js'

/** View Parts */
import ViewPart_ParentItems from './ViewPart_ParentCards.js'

export default async function ViewPart_UserForm(param = {}) {
    const {
        itemId
    } = param;

    const user = App.data.lists.Users.find(item => item.Id === itemId);
    
    /** Messages */
    let messages = [];

    /** Container */
    const container = Component_Container({
        userSelect: 'none',
        display: 'flex',
        // display: 'block',
        direction: 'column',
        padding: '20px 0px',
        maxWidth: '1100px',
        // minWidth: '1100px',
        minWidth: 'max-content',
        parent: App.store.get('maincontainer')
    });

    container.add();

    const parent = container;

    /** Heading */
    const profileHeading = Component_Heading({
        text: 'Profile',
        margin: '0px 0px 20px 0px',
        size: '1.3',
        parent
    });

    profileHeading.add();

    /** Name Container */
    const fullNameContainer = Component_Container({
        display: 'inline-flex',
        direction: 'column',
        align: 'initial',
        parent
    });

    fullNameContainer.add();

    /** Full Name */
    let nameMessage;

    const nameField = Component_NameField({
        label: user ? 'Full Name' : 'Search name',
        description: user ? '' : `
            Search by <i>Last Name, First Name</i>. 
            <br>
            <br>
            Select name to automatically fill <i>First</i> and <i>Last Name</i>, <i>Account</i>, <i>Email</i>, and <i>Command</i> fields.
        `,
        margin: '0px 20px 20px 0px',
        parent: fullNameContainer,
        onSetValue(data) {
            const {
                fullName,
                firstName,
                lastName,
                command,
                account
            } = nameField.value();

            /** Update Message */
            if (user && fullName !== user.Title) {
               if (nameMessage) {
                    nameMessage.remove();
                }

                nameMessage = Component_FieldMessage({
                    message: `Name changed.`,
                    margin: '0px 10px 24px 0px',
                    parent: nameContainer
                });

                nameMessage.add();
                messages.push(nameMessage);
            }
      
            /** Set first and last name, account, and command fields */
            firstNameField.value(firstName);
            lastNameField.value(lastName);
            accountField.value(account);
            commandField.value(command);

            /** Set Emailfield */
            if (data.newValue) {
                emailField.value(data.newValue.info.EntityData.Email);
            }
        }
    });
    
    nameField.add();

    /** Name Container */
    const nameContainer = Component_Container({
        align: 'flex-end',
        parent: fullNameContainer
    });

    nameContainer.add();

    /** First Name */
    const firstNameField = Component_SingleLineTextField({
        label: 'First name',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent: nameContainer
    });
    
    firstNameField.add();

    /** Middle Name */
    const middleNameField = Component_SingleLineTextField({
        label: 'Middle name',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent: nameContainer
    });
    
    middleNameField.add();

    /** Last Name */
    const lastNameField = Component_SingleLineTextField({
        label: 'Last name',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent: nameContainer
    });
    
    lastNameField.add();

     /** Account */
     const accountField = Component_SingleLineTextField({
        label: 'Account',
        description: '',
        width: '200px',
        fieldMargin: '0px 20px 20px 0px',
        parent
    });
    
    accountField.add();

    /** Email */
    const emailField = Component_EmailField({
        description: 'Example: name@mail.mil.',
        width: '500px',
        domains: [
            '@mail.mil'
        ],
        parent
    });
    
    emailField.add();

    /** Command Container */
    const commandContainer = Component_Container({
        align: 'flex-end',
        parent
    });

    commandContainer.add();

    /** Command */
    let commandMessage;

    const role = App.user.getUserAccount().Role;

    /** Command */
    const commandField = Component_DropDownField({
        list: 'Commands',
        label: 'Command',
        required: true,
        description: role === 'Admin' ? '' : 'Automatically set to your command',
        disabled: role === 'Admin' ? false : true,
        dropDownOptions: App.data.lists.Commands.map(item => {
            const {
                Id,
                Command
            } = item;

            return {
                id: Id,
                value: Command
            };
        }),
        width: '100px',
        fieldMargin: '0px 20px 20px 0px',
        parent: commandContainer,
        onSetValue(data) {
            const {
                previousValue,
                newValue
            } = data;

            if (commandMessage) {
                commandMessage.remove();
            }

            if (user && previousValue !== newValue.Title) {
                commandMessage = Component_FieldMessage({
                    message: `Command changed from ${previousValue}.`,
                    margin: '0px 10px 24px 0px',
                    parent: commandContainer
                });

                commandMessage.add();
                messages.push(commandMessage);
            }
        }
    });

    commandField.add();

    /** Role */
    const roleField = Component_DropDownField({
        list: 'Roles',
        label: 'Account Type',
        required: true,
        dropDownOptions: App.data.lists.Roles.map(item => {
            const {
                Id,
                Role
            } = item;

            return {
                id: Id,
                value: Role
            };
        }),
        width: '100px',
        fieldMargin: '0px 20px 20px 0px',
        parent,
        onSetValue(data) {

        }
    });

    roleField.add();

    /** Teams Heading */
    const teamsHeading = Component_Heading({
        text: 'Teams',
        margin: '20px 0px 10px 0px',
        size: '1.3',
        parent
    });

    teamsHeading.add();

    /** List of assigned Teams */
    ViewPart_Teams({
        user,
        parent
    });

    /** Applications Heading */
    const appsHeading = Component_Heading({
        text: 'Applications',
        margin: '40px 0px 10px 0px',
        size: '1.3',
        parent
    });

    appsHeading.add();

    /** List of assigned Apps */
    ViewPart_Applications({
        user,
        parent
    });

    /** Projects Heading */
    const projectsHeading = Component_Heading({
        text: 'Projects',
        margin: '40px 0px 10px 0px',
        size: '1.3',
        parent
    });

    projectsHeading.add();

    /** List of assigned Projects */
    ViewPart_Projects({
        user,
        parent
    });

    /** Button Container */
    const buttonContainer = Component_Container({
        parent,
        position: 'beforeend',
        width: '100%',
        justify: 'flex-end',
        margin: '40px 0px 20px 0px'
    });

    buttonContainer.add();

    /** Cancel Button */
    const cancelButton = Component_FormButton({
        value: 'Go back to Users',
        type: 'cancel',
        parent: buttonContainer,
        async action() {
            App.route('Users');
        }
    });

    cancelButton.add();

    if (user) {
        /** Set field values */
        nameField.value(`${user.LastName}, ${user.FirstName} ${user.MiddleName || ''}`);
        firstNameField.value(user.FirstName);
        middleNameField.value(user.MiddleName);
        lastNameField.value(user.LastName);
        accountField.value(user.Account);
        emailField.value(user.Email);
        commandField.value(user.Command);
        roleField.value(user.Role);

        /** Update Button */
        const updateButton = Component_FormButton({
            value: 'Update user',
            type: 'create',
            parent: buttonContainer,
            async action() {
                console.log('update');

                /** Clear messages */
                console.log(messages);
                
                messages.forEach(message => {
                    message.remove();
                });
                
                const data = {
                    
                }

                // const updateItem = await Action_UpdateItem({
                //     itemId: item.Id,
                //     list: 'Breaches',
                //     data,
                //     notifyMessage: 'Updated!'
                // });

                // console.log(updateItem);
            }
        });
    
        updateButton.add();

        /** Add Created/Modified info */
        const getItemInfo = await Action_Get({
            list: 'Users',
            filter: `Id eq ${user.Id}`,
            select: 'Author/Name,Author/Title,Editor/Name,Editor/Title,Created,Modified',
            expand: 'Author/Id,Editor/Id'
        });
    
        const itemInfo = Component_ItemInfo({
            item: getItemInfo[0],
            parent
        });

        itemInfo.add();
    } else {
        /** Set default role */
        roleField.value('User'); /** @todo set by user preference (config list) */

        const submitButton = Component_FormButton({
            value: 'Submit',
            type: 'create',
            parent: buttonContainer,
            async action() {
                const Account = accountField.value();
                const FirstName = firstNameField.value();
                const MiddleName = middleNameField.value();
                const LastName = lastNameField.value();
                const Email = emailField.value();
                const Command = commandField.value();
                const Role = roleField.value();

                const data = {
                    Account,
                    FirstName,
                    MiddleName,
                    LastName,
                    Email,
                    Command,
                    Role
                };

                // let missing = [];

                // if (!Account) {
                // }

                // if (!FirstName) {
                // }

                // await Action_CreateItem({
                //     list: 'Users',
                //     data,
                // });

                // App.route('Users');
            }
        });
    
        submitButton.add();
    }
}
