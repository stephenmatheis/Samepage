/** (C) 2021 Stephen Matheis */

/** Actions */
import Action_Get from '../Actions/Action_Get.js'
import Action_GetByUri from '../Actions/Action_GetByUri.js';
import Action_CreateItem from '../Actions/Action_CreateItem.js'
import Action_DeleteItem from '../Actions/Action_DeleteItem.js'
import Action_UpdateItem from '../Actions/Action_UpdateItem.js'

/** Components */
import Component_Heading from '../Components/Component_Heading.js'
import Component_Calendar from '../Components/Component_Calendar.js'
import Component_Container from '../Components/Component_Container.js'
import Component_Modal from '../Components/Component_Modal.js'
import Component_RadioButtons from '../Components/Component_RadioButtons.js'
import Component_DropDownField from '../Components/Component_DropDownField.js'
import Component_TimeSlotCounter from '../Components/Component_TimeSlotCounter.js'
import Component_DuplicateWeek from '../Components/Component_DuplicateWeek.js'
import Component_TimeSlots from '../Components/Component_TimeSlots.js'
import Component_Alert from '../Components/Component_Alert.js'

export default function ViewPart_AdminCalendar(param) {
    const {
        parent
    } = param;

    /** Container */
    const container = Component_Container({
        margin: '40px 0px',
        height: '80%',
        parent
    });

    container.add();

    /** Left */
    const leftContainer = Component_Container({
        direction: 'column',
        flex: '2',
        height: '100%',
        parent: container
    });

    leftContainer.add();

    /** Right */
    const rightContainer = Component_Container({
        direction: 'column',
        align: 'center',
        flex: '1',
        height: '100%',
        parent: container
    });

    rightContainer.add();

    /** Calendar */
    const openCalendar = Component_Calendar({
        parent: leftContainer,
        height: `100%`,
        async events(info, successCallback, failureCallback) {
            return [];
            // const {
            //     endStr,
            //     startStr
            // } = info;
            
            // const eventItems = await Action_Get({
            //     list: 'Events',
            //     select: 'Id,Title,EventDate,EndDate,ParticipantsPicker/Name',
            //     expand: 'ParticipantsPicker/Id',
            //     filter: `EventDateFilter ge datetime'${startStr}' and EventDateFilter le datetime'${endStr}'`
            // });

            // const acceptedEventItems = await Action_Get({
            //     list: 'AcceptedEvents',
            //     filter: `EventDate ge datetime'${startStr}' and EventDate le datetime'${endStr}'`
            // });

            // successCallback(eventItems.map(event => {
            //     const { 
            //         Id,
            //         Title, 
            //         EventDate,
            //         EndDate,
            //         __metadata
            //     } = event;

            //     const {
            //         uri
            //     } = __metadata;

            //     const accepted = acceptedEventItems.find(item => item.FK_EventId === Id);
            //     const status = accepted ? 'accepted' : 'open';
            //     const color = accepted ? 'mediumseagreen' : App.primaryColor;
            //     const Command = accepted ? accepted.FK_Command : null;

            //     /** @todo return object from Model_FullCalendarEvent */
            //     return {
            //         title: `${Title}`,
            //         id: Id,
            //         color,
            //         start: EventDate,
            //         end: EndDate,
            //         extendedProps: {
            //             uri,
            //             status,
            //             Command,
            //             acceptedEventId: accepted ? accepted.Id : null
            //         }
            //     };
            // }));
        },
        eventClick(info) {
            console.log(info);
        },
        dateClick(info) {
            console.log(info);
        }
    });

    openCalendar.add();

    /** Accepted Heading */
    const acceptedHeading = Component_Heading({
        text: 'Accepted Meetings',
        margin: '0px 0px 27px 0px',
        parent: rightContainer
    });

    acceptedHeading.add();

    /** Accepted calendar - View: ListMonth */
    const acceptedCalendar = Component_Calendar({
        initialView: 'listMonth',
        height: `100%`,
        headerToolbar: false,
        parent: rightContainer,
        events(info, successCallback, failureCallback) {
            return [];
        },
        eventClick(info) {
            console.log(info);
        }
    });

    acceptedCalendar.add();
}
