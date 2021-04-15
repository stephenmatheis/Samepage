/* RHC-C SharePoint Team | Individual Critical Tasks List (ICTL) */

/* Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_DuplicateWeek(param) {
    const {
        date,
        parent,
        position
    } = param;

    const day = date.getDay();

    let weeks = [];
    let dates = [];

    const {
        monday,
        friday
    } = getMondayAndFriday();

    const component = Core_Component({
        html: /*html*/ `
            <div class='time-slots-duplicate-week-container'>
                ${duplicateWeekTemplate(monday, friday, false)}
                <button class='btn btn-sm add-next-week'>Add next week?</button>
            </div>
        `,
        style: /*css*/ `
            /** Badge */
            #id .badge {
                cursor: pointer;
            }

            /** Duplicate Week */
            .time-slots-duplicate-week-container {
                margin-bottom: 20px;
                font-weight: 500;
                background: ${App.secondaryColor};
                padding: 10px;
                border-radius: 4px;
            }

            .time-slots-duplicate-week {
                margin-bottom: 10px;
            }

            .time-slots-duplicate-week-text {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .time-slots-duplicate-week-checkboxes {
                margin-top: 5px;
            }

            .time-slots-duplicate-week-label {
                margin-right: 10px;
            }

            #id .btn {
                background: ${App.primaryColor};
                color: white;
            }
        `,
        parent,
        position,
        events: [
            {
                selector: `#id .remove-duplicate-week`,
                event: 'click',
                listener: removeDuplicateWeek
            },
            {
                selector: `#id .add-next-week`,
                event: 'click',
                listener(event) {
                    /** Get last week added to weeks array */
                    const lastWeek = weeks[weeks.length -1];

                    console.log(lastWeek);

                    let nextMonday;
                    let nextFriday;

                    if (lastWeek) {
                        const {
                            monday,
                            friday
                        } = lastWeek;

                        nextMonday = new Date(monday);
                        nextMonday.setDate(monday.getDate() + 7);
                        
                        nextFriday = new Date(friday);
                        nextFriday.setDate(friday.getDate() + 7);
                    } else {
                        nextMonday = monday;
                        nextFriday = friday;
                    }

                    console.log(nextMonday);
                    console.log(nextFriday);

                    event.target.insertAdjacentHTML('beforebegin', duplicateWeekTemplate(nextMonday, nextFriday, true));

                    /** Add remove event */
                    component
                    .find(`.time-slots-duplicate-week[data-monday='${nextMonday}']`)
                    .querySelectorAll('.remove-duplicate-week')
                    .forEach(button => {
                        button.addEventListener('click', removeDuplicateWeek)
                    });

                    /** Add input change event */
                    component
                    .find(`.time-slots-duplicate-week[data-monday='${nextMonday}']`)
                    .querySelectorAll(`input[type='checkbox']`)
                    .forEach(checkbox => {
                        checkbox.addEventListener('change', duplicateTimes)
                    });
                }
            },
            {
                selector: `#id input[type='checkbox']`,
                event: 'change',
                listener: duplicateTimes
            }
        ],
        onAdd() {
            const checkbox = component.find(`.time-slots-duplicate-week[data-monday='${monday}'] input[data-day='${day}']`);

            /** Automatically check current day of week */
            if (checkbox) {
                checkbox.disabled = true;
                checkbox.checked = true;
            }

            /** Add date to dates array */
            dates.push(checkbox.dataset.date);
        }
    });

    /** Calculate this week's Monday and Friday */
    function getMondayAndFriday() {
        const today = date || new Date();
        const mondayOffset = today.getDate() - today.getDay() + 1; // Monday  is the day of the month - the day of the week
        const fridayOffset = mondayOffset + 4; // friday day is monday + const
        const monday = new Date(today.setDate(mondayOffset));
        const friday = new Date(today.setDate(fridayOffset));

        return {
            monday,
            friday
        }
    }

    function duplicateWeekTemplate(monday, friday, remove) {
        const mondayFull = monday.toLocaleDateString('default', {
            dateStyle: 'full'
        });
        const fridayFull = friday.toLocaleDateString('default', {
            dateStyle: 'full'
        });

        weeks.push({
            monday,
            friday
        });

        return /*html*/ `
            <div class='time-slots-duplicate-week' data-monday='${monday}'>
                <span class='time-slots-duplicate-week-text'>
                    <span>Duplicate for the week of <strong>${mondayFull}</strong> to <strong>${fridayFull}</strong>?</span>
                    ${remove ? /*html*/`<span class='badge badge-danger ml-2 remove-duplicate-week' data-monday='${monday}'>Remove</span>` : ''}
                </span>
                <div class='time-slots-duplicate-week-checkboxes'>
                    <input type='checkbox' data-day='1' data-date='${monday.toLocaleDateString()}'>
                    <label class='time-slots-duplicate-week-label'>Monday</label>
                    <input type='checkbox' data-day='2' data-date='${moment(monday).add(1, 'day')._d.toLocaleDateString()}'>
                    <label class='time-slots-duplicate-week-label'>Tuesday</label>
                    <input type='checkbox' data-day='3' data-date='${moment(monday).add(2, 'day')._d.toLocaleDateString()}'>
                    <label class='time-slots-duplicate-week-label'>Wednesday</label>
                    <input type='checkbox' data-day='4' data-date='${moment(monday).add(3, 'day')._d.toLocaleDateString()}'>
                    <label class='time-slots-duplicate-week-label'>Thursday</label>
                    <input type='checkbox' data-day='5' data-date='${moment(monday).add(4, 'day')._d.toLocaleDateString()}'>
                    <label class='time-slots-duplicate-week-label'>Friday</label>
                </div>
            </div>
        `;
    }

    function removeDuplicateWeek(event) {
        /** Get top level parent element */
        const row = event.target.closest('.time-slots-duplicate-week');
        
        /** Update Weeks array */
        const week = weeks.find(item => item.monday.toString() === event.target.dataset.monday);
        const index = weeks.indexOf(week);
        
        weeks.splice(index, 1);

        /** Update dates array */
        row.querySelectorAll(`input[type='checkbox']:checked`).forEach(item => {
            const date = dates.find(date => date === item.dataset.date);
            const index = dates.indexOf(date);

            dates.splice(1, index);
        });

        console.log(dates);

        /** Remove row from DOM */
        row.remove();
    }

    function duplicateTimes(event) {
        const date = dates.find(date => date === event.target.dataset.date);

        if (event.target.checked) {
            if (!date) {
                dates.push(event.target.dataset.date);
            }
        } else {
            const index = dates.indexOf(date);

            dates.splice(1, index);
        }

        console.log(event.target.dataset.date, dates);
    }

    component.getDates = () => {
        return dates;
    }

    return component;
}