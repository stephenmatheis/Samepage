/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_RoundSquareCard(param) {
    const {
        Task,
        checked,
        parent,
        position,
        onCheck,
        update
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='task-field'>
                <div class='task-field-checkbox-container'>
                    <label>
                        <input type='checkbox' ${checked ? 'checked' : ''}>
                        <span class='toggle'></span>
                    </label>
                </div>
                <div class='task-field-text ${checked ? 'strikeout' : ''}' contenteditable='true'>${Task}</div>
            </div>
        `,
        style: /*css*/ `
            #id.task-field {
                user-select: none;
                display: flex;
                position: relative;
                font-size: 1.5em;
                padding: 10px 20px 15px 20px;
            }

            #id .task-field-checkbox-container {
                max-height: 34px;
            }

            #id .task-field-checkbox-container,
            #id .task-field-checkbox-container label {
                display: flex;
                align-items: center;
            }

            #id .task-field-text {
                font-weight: 400;
                margin-left: 20px;
                border-bottom: solid 2px transparent;
            }

            #id .task-field-text.strikeout {
                text-decoration: line-through;
            }

            #id .task-field-text:active,
            #id .task-field-text:focus {
                outline: none;
                border-bottom: solid 2px ${App.primaryColor};
                /* box-shadow: 0px 0px 0px 2px ${App.primaryColor}; */
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
                width: 24px;
                height: 24px;
                position: relative;
                display: inline-block;
                vertical-align: middle;
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
                selector: `#id input[type='checkbox']`,
                event: 'change',
                listener(event) {
                    if (onCheck) {
                        onCheck(event.target.checked);
                    }
                }
            },
            {
                selector: '#id .task-field-text',
                event: 'focusout',
                listener(event) {
                    if (update) {
                        update(event);
                    }
                }
            },
            {
                selector: '#id .task-field-text',
                event: 'paste',
                listener(event) {
                    /** 
                     * From Stack Overflow
                     * 
                     * @link https://stackoverflow.com/a/12028136
                     */
                    // cancel paste
                    event.preventDefault();

                    // get text representation of clipboard
                    var text = (event.originalEvent || event).clipboardData.getData('text/plain');

                    // insert text manually
                    document.execCommand('insertText', false, text);
                }
            },
            {
                selector: '#id .task-field-text',
                event: 'keypress',
                listener(event) {
                    if (event.key === 'Enter') {
                        event.preventDefault();

                        if (update) {
                            update(event);
                        }

                        return false;
                    }
                }
            }
        ]
    });

    component.blur = () => {
        const field = component.find('.task-field-text');

        if (field) {
            field.blur();
        }
    }

    component.focus = () => {
        const field = component.find('.task-field-text');

        if (field) {
            field.focus();
        }
    }

    component.strikeout = (value) => {
        const field = component.find('.task-field-text');

        if (value) {
            field.classList.add('strikeout');
        } else {
            field.classList.remove('strikeout');
        }
    }

    component.value = (param) => {
        const field = component.find('.task-field-text');

        if (param !== undefined) {
            field.innerText = param;
        } else {
            return field.innerText;
        }
    }

    return component;
}