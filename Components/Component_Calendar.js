/** (C) 2021 Stephen Matheis */

/* Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Calendar(param) {
    const {
        initialView,
        headerToolbar,
        height,
        events,
        eventClick,
        dateClick,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html */ `
            <div class='calendar container'>
                <!-- Fullcalendar will add it's markup here -->
            </div>
        `,
        style: /*css*/ `
            /** links */
            .fc a:hover {
                text-decoration: none;
            }

            /** Header Color */
            .fc-col-header {
                position: relative;
                background-color: rgba(${App.primaryColorRGB}, .30);
            }

            /** Background color */        
            .fc-view-harness {
                background: white;
            }

            /** Override default theme border */
            .fc-theme-standard td, 
            .fc-theme-standard th {
                border: 1px solid var(--fc-border-color, ${App.primaryColor});
            }

            .fc-theme-standard .fc-scrollgrid {
                border: 1px solid var(--fc-border-color, ${App.primaryColor});
            }

            .fc .fc-scrollgrid {
                border-collapse: collapse;
                border-right-width: 0;
                border-bottom-width: 0;
            }

            /** Today background color */
            
            /** OLD
             
            #id .fc-day-today {
                position: relative;
                background-color: transparent;
            }

            #id .fc-day-today::after {
                top: 0;
                left: 0;
                position: absolute;
                content: '';
                height: 100%;
                width: 100%;
                background-color: ${App.primaryColor};
                opacity: .15;
            }
            
            END OLD */
            #id .fc-day-today {
                background-color: rgba(${App.primaryColorRGB}, .15);
            }

            /** Default text color */
            #id a {
                color: ${App.primaryColor};
            }

            /** Title color */
            #id .fc-toolbar-title {
                color: ${App.primaryColor};
            }

            /** Toolbar buttons */
            #id .fc-toolbar-chunk:nth-child(3) .fc-button-group .fc-button {
                background: white;
                color: ${App.primaryColor};
            }

            #id .fc-toolbar-chunk:nth-child(3) .fc-button-group .fc-button.fc-button-active {
                background: ${App.primaryColor};
                color: white;
            }

            /** Event text color */
            #id .fc-title,
            #id .fc-icon {
                color: white;
            }

            /** Week / Day text color */
            #id .fc-event-main .fc-event-time,
            #id .fc-event-main .fc-event-title {
                color: white;
            }

            /** Event hover */
            #id .fc-daygrid-event:hover {
                cursor: pointer;
            }

            /** Button color */
            #id .fc-button {
                background: ${App.primaryColor};
                border: solid 1px ${App.primaryColor};
            }

            /** Button focus */
            #id .fc-button:focus {
                box-shadow: none;
                background: darkslateblue;
            }

            /** initialView: listMonth */
            #id.fc-theme-standard .fc-list {
                background: ${App.secondaryColor};
                border: none;
            }

            #id.fc-theme-standard .fc-list td,
            #id.fc-theme-standard .fc-list th {
                border: none;
            }

            #id.fc-theme-standard .fc-list .fc-cell-shaded {
                background: rgba(${App.primaryColorRGB}, .30);
            }

            #id .fc-list-event:hover td {
                background: transparent;
                cursor: pointer;
            }
        `,
        parent,
        position,
        events: [
         
        ],
        onAdd() {
            component.setData();
        }
    });

    let calendar;

    component.setData = () => {
        /** @todo add connect to outlook button */
        calendar = new FullCalendar.Calendar(component.get(), {
            initialView: initialView || 'dayGridMonth',
            fixedWeekCount: false,
            weekends: false,
            height: height || 'auto',
            headerToolbar: headerToolbar === undefined ? {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            } : headerToolbar,
            events,
            eventClick,
            dateClick
        });

        calendar.render();
    }

    component.addEvent = (event) => {
        calendar.addEvent(event)
    }

    component.getEvents = () => {
        return calendar.getEvents();
    }

    component.getEventById = (id) => {
        return calendar.getEventById(id);
    }

    return component;
}