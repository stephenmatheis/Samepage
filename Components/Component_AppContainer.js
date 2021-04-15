/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

export default function Component_AppContainer() {
    return Core_Component({
        html: /*html*/ `
            <div class='appcontainer'></div>
        `,
        style: /*css*/ `
            .appcontainer {
                display: flex;
            }

            *, html {
                font-family: ${App.fontFamily};
                box-sizing: border-box;
                color: rgba(0,0,0,0.7);
            }
            
            body {
                padding: 0px;
                margin: 0px;
                box-sizing: border-box;
                background: ${App.secondaryColor};
            }
            
            body::-webkit-scrollbar { 
                display: none; 
            }
            
            ::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }
            
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            
            ::-webkit-scrollbar-thumb {
                background: ${App.primaryColor};
                width: 8px;
                height: 8px;
                border: 3px solid transparent;
                border-radius: 8px;
                background-clip: content-box;
            }
            
            table {
                border-collapse: collapse;
            }
            
            /* Stop Chrome from changing input background color when autocomplete enabled */
            input:-webkit-autofill,
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus, 
            input:-webkit-autofill:active  {
                box-shadow: 0 0 0 30px white inset !important;
            }
            
            .highlight {
                background: #fff3d4 !important;
                border-right: solid 3px #f6b73c !important;
            }
            
            .smooth-tranisition {
                transition: all 300ms ease-in-out;
            }

            .icon {
                display: inline-block;
                width: 1em;
                height: 1em;
                stroke-width: 0;
                stroke: ${App.secondaryColor};
                fill: ${App.secondaryColor};
            }
        `,
        position: 'afterbegin',
        events: []
    });
}
