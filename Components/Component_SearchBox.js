/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_SearchBox(options) {
    const {
        placeholder,
        parent,
        position,
        action
    } = options;

    return Core_Component({
        type: 'search-box',
        html: /*html*/ `
            <div class='search-box'>
                <svg class="icon">
                    <use href="#icon-search"></use>
                </svg>    
                <input type="text" class="search-field" placeholder="Search ${placeholder}" />
            </div>
        `,
        style: /*css*/ `
            /* Icon */
            .search-box .icon {
                stroke: ${App.primaryColor};
                fill: ${App.primaryColor};
                cursor: pointer;
                font-size: 1.2em;
                margin: 0px 10px;
            }

            .search-box {
                display: inline-flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border-radius: 4px;
                padding: 10px;
                margin: 15px 0px;
                background: white;
                border: ${App.defaultBorder};
            }

            .search-field {
                padding: 1.5px;
                width: 250px;
                border-radius: 4px;
                border: none;
                font-size: 1em;
            }

            .search-field:focus,
            .search-field:active {
                outline: none;
            }
        `,
        parent: parent,
        position: position || 'beforeend',
        events: [
            {
                selector: `#id .search-field`,
                event: 'keyup',
                listener: (event) => {
                    const query = event.target.value;

                    if (action) {
                        action(query);
                    }
                }
            }
        ]
    });
}