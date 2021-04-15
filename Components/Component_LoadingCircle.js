/** (C) 2021 Stephen Matheis */

/** @link https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_LoadingCircle(param) {
    const {
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='loading-circle'></div>
        `,
        style:  /*css*/ `
            #id.loading-circle {
                border: 5px solid rebeccapurple;
                border-radius: 50%;
                border-top: 5px solid lightgray;
                width: 50px;
                height: 50px;
                -webkit-animation: spin 2s linear infinite; /* Safari */
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }
        `,
        parent,
        position,
        events: [

        ]
    });

    return component;
}