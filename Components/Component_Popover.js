/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Popover(param) {
    const {
        parent,
        position
    } = param;

    /** Give parent relative positioning */
    parent.style.position = 'relative';

    /** Get parent rect */
    const {
        top,
        right,
        bottom,
        left,
        width,
        height,
        x,
        y
    } = parent.getBoundingClientRect();

    /** background */
    const background = 'mediumpurple';
    const borderColor = App.primaryColor;

    const component = Core_Component({
        html: /*html*/ `
            <div class='popover'>Test Popover</div>
        `,
        style: /*css*/ `
            #id.popover {
                background-color: ${background};
                position: absolute;
                top: 0px; 
                left: ${width}px;
                display: inline-block;
                padding: .2em .5em;
                /* border: solid 1px ${borderColor}; */
                border-radius: 4px;
                z-index: 0;
                /* filter: drop-shadow(rgba(0, 0, 0, 0.2) 0 0px 10px); */
                min-height: 100px;
            }
              
            #id.popover::after,
            #id.popover::before {
                width: 0;
                height: 0;
                content: "";
                display: block;
                position: absolute;
                top: 10px;
                left: -10px;
            }
            
            #id.popover::after {
                border-right: 10px solid ${background};
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                z-index: 1;
                margin-top: 1px;
            }
            
            /* #id.popover::before {
                border-right: 11px solid ${borderColor};
                border-top: 11px solid transparent;
                border-bottom: 11px solid transparent;
                margin-top: 0px;
                margin-left: -2px;
                z-index: -100;
            }*/
        `,
        parent,
        position,
        events: [
            
        ]
    });

    return component;
}