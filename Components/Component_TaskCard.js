/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_RoundSquareCard(param) {
    const {
        action,
        disabled,
        onCheck,
        attachmentCount,
        checklistTotal,
        checklistDone,
        Task,
        checked,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='task-card${checked ? ' completed' : ''}${disabled ? ' disabled' : ''}'>
                ${attachmentCountTemplate(attachmentCount)}
                ${checklistCountTemplate(checklistDone, checklistTotal)}
                <div class='task-card-checkbox-container'>
                    <label>
                        <input type='checkbox'${checked ? ' checked' : ''}>
                        <span class='toggle'></span>
                    </label>
                </div>
                <div class='task-card-text-container'>
                    <span class='task-card-text'>${Task}</span>
                </div>
            </div>
        `,
        style: /*css*/ `
            #id.task-card {
                user-select: none;
                cursor: pointer;
                display: flex;
                justify-content: flex-start;
                position: relative;
                width: 300px;
                min-height: 50px;
                padding: 15px 20px;
                margin: 10px 30px 0px 0px;
                background: white;
                border-radius: 4px;
                border: solid rgba(0,0,0,0.2) 1px;
                /* box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 15%); */
                transition: 150ms cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            #id.task-card:hover {
                border: solid 1px ${App.primaryColor};
            }

            #id .task-card-text-container {
                margin-left: 20px;
            }

            #id .task-card-text {
                font-weight: 400;
                font-size: 1;
            }

            /** Completed */
            #id.task-card.completed {
                background: transparent;
            }

            /** Disabled */
            #id.task-card.disabled {
                filter: brightness(.9);
                pointer-events: none;
            }

            /** Selected */
            #id.task-card.selected {
                border: solid 1px ${App.primaryColor};
            }

            #id.task-card.completed .task-card-text {
                text-decoration: line-through;
            }

            /** Attachment */
            #id .attachment-count {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: .8em;
            }

            #id .attachment-count-icon {
                display: flex;
                justify-content: center;
                margin-right: 2px;
            }

            #id .attachment-count-icon .icon {
                stroke: gray;
                fill: gray;
            }

            #id .attachment-count-number {
                color: gray;
            }

            /** Checklist */
            #id .checklist-count {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 5px;
                right: 5px;
                font-size: .8em;
            }

            #id .checklist-count-number {
                color: gray;
            }

            /** Checkbox */
            #id input[type='checkbox'] {
                position: absolute;
                left: -10000px;
                top: auto;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            #id input[type='checkbox'] ~ .toggle {
                width: 20px;
                height: 20px;
                position: relative;
                display: inline-block;
                /* vertical-align: middle; */
                background: white;
                border: solid 2px lightgray;
                border-radius: 4px;
                cursor: pointer;
            }

            #id input[type='checkbox']:hover ~ .toggle {
                border-color: mediumseagreen;
            }

            #id input[type='checkbox']:checked ~ .toggle {
                border: solid 2px mediumseagreen;
                background: mediumseagreen url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=) center no-repeat;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id',
                event: 'click',
                listener(event) {
                    if (action) {
                        action(event);
                    }
                }
            },
            {
                selector: '#id .task-card-checkbox-container',
                event: 'click',
                listener(event) {
                    event.stopPropagation();
                }
            },
            {
                selector: `#id input[type='checkbox']`,
                event: 'change',
                listener(event) {
                    component.checked(event.target.checked);

                    // if (onCheck) {
                    //     onCheck(event.target.checked);
                    // }
                }
            }
        ]
    });

    function attachmentCountTemplate(count) {
        return count ? /*html*/ `
            <span class='attachment-count'>
                <span class='attachment-count-icon'>
                    <svg class='icon'>
                        <use href='#icon-attachment'></use>
                    </svg>
                </span>
                <span class='attachment-count-number'>${count}</span>
            </span>
        ` : '';
    }

    function checklistCountTemplate(checklistDone, checklistTotal) {
        return checklistTotal ? /*html*/ `
            <span class='checklist-count'>
                <span class='checklist-count-number checklist-count-done'>${checklistDone}</span>
                <span class='checklist-count-number'>/</span>
                <span class='checklist-count-number checklist-count-total'>${checklistTotal}</span>
            </span>
        ` : '';
    }

    component.addBubble = (count) => {
        if (count > 0) {
            const html = /*html*/ `
                <div class='new-bubble'>
                    <span>${count}</span>
                </div>
            `;

            component.get().insertAdjacentHTML('afterbegin', html);
        }
    }

    component.checked = (value) => {
        if (value) {
            component.get().classList.add('completed');
        } else {
            component.get().classList.remove('completed');
        }

        component.find('input[type="checkbox"]').checked = value;

        if (onCheck) {
            onCheck(event.target.checked);
        }
    }

    component.value = (value) => {
        const field = component.find('.task-card-text');

        if (value !== undefined) {
            field.innerText = value;
        } else {
            return field.innerText;
        }
    }

    component.setAttachmentCount = (count) => {
        const attachmentCount = component.find('.attachment-count-number');

        if (attachmentCount) {
            if (count) {
                attachmentCount.innerText = count;
            } else {
                component.find('.attachment-count').remove();
            }
        } else if (count) {
            component.get().insertAdjacentHTML('afterbegin', attachmentCountTemplate(count));
        }
    }

    component.setChecklistCount = (param) => {
        const {
            done,
            total
        } = param

        const checklist = component.find('.checklist-count');

        if (checklist) {
            if (total) {
                component.find('.checklist-count-done').innerText = done;
                component.find('.checklist-count-total').innerText = total;
            } else {
                checklist.remove();
            }
        } else if (total) {
            component.get().insertAdjacentHTML('afterbegin', checklistCountTemplate(done, total));
        }
    }

    component.disable = () => {
        component.get().classList.add('disabled');
    }

    component.enable = () => {
        component.get().classList.remove('disabled');
    }

    component.selected = (value) => {
        if (value) {
            component.get().classList.add('selected');
        } else {
            component.get().classList.remove('selected');
        }
    }
    
    return component;
}