/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Notification(param) {
    const {
        text,
        type,
        delay
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div id='ictl-notification' class='notification ${type || 'information'}'>
                ${text}
            </div>
        `,
        style: /*css*/ `
            .notification {
                position: fixed;
                z-index: 1000;
                top: 20px;
                right: 5px;
                font-size: 1em;
                padding: 10px 20px;
                color: white;
                background: mediumseagreen;
                border: solid 2px seagreen;
                border-radius: 4px;
                box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
                animation: slidein 500ms ease-in-out forwards, slidein 500ms ease-in-out ${delay || '3.5s'} reverse forwards;
            }

            .information {
                background: mediumseagreen;
                border: solid 2px seagreen;
            }

            .error {
                background: crimson;
                border: solid 2px firebrick;
            }

            .notification * {
                color: white;
            }

            @keyframes slidein {
                from {
                    /* opacity: 0; */
                    transform: translate(400px);
                }

                to {
                    /* opacity: 1; */
                    transform: translate(-10px);
                }
            }
        `,
        position: 'beforebegin',
        events: [
            
        ]
    });

    return component;
}