/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** Components */
import Component_Card from '../Components/Component_Card.js'
import Component_SingleLineTextField from '../Components/Component_SingleLineTextField.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_FormButton from '../Components/Component_FormButton.js'

export default async function View_AccountInfo(param) {
    const {
        parent,
    } = param;

    const accountInfoCard = Component_Card({
        title: 'My Account Information',
        titleColor: App.primaryColor,
        background: App.secondaryColor,
        border: 'none',
        parent
    });

    accountInfoCard.add();

    const {
        Id,
        FirstName,
        MiddleName,
        LastName,
        Account,
        Email,
    } = App.user;

    /** Firsts Name */
    const firstNameField = Component_SingleLineTextField({
        label: 'First name',
        value: FirstName,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    firstNameField.add();

    /** Middle Name */
    if (MiddleName) {
        const middleNameField = Component_SingleLineTextField({
            label: 'Middle name',
            value: MiddleName,
            readOnly: true,
            fieldMargin: '0px',
            parent: accountInfoCard
        });
    
        middleNameField.add();
    }

    /** Last Name */
    const lastNameField = Component_SingleLineTextField({
        label: 'Last name',
        value: LastName,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    lastNameField.add();

    /** Account */
    const accountField = Component_SingleLineTextField({
        label: 'Account',
        value: Account,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });

    accountField.add();

    /** Email */
    const emailField = Component_SingleLineTextField({
        label: 'Email',
        value: Email,
        readOnly: true,
        fieldMargin: '0px',
        parent: accountInfoCard
    });
    
    emailField.add();
}
