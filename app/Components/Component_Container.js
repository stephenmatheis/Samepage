/** (C) 2021 Stephen Matheis */

/* Global Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Container(param) {
    const {
        align,
        background,
        border,
        borderBottom,
        borderLeft,
        borderRight,
        borderTop,
        display,
        flex,
        flexwrap,
        shadow,
        direction,
        height,
        justify,
        margin,
        scrollbarHover,
        padding,
        parent,
        position,
        radius,
        width,
        maxWidth,
        minWidth,
        overflow,
        userSelect,
    } = param;

    return Core_Component({
        html: /*html*/ `
            <div class='container${scrollbarHover ? ' scrollbar-hover' : ''}'></div>
        `,
        style: /*css*/ `
            #id {
                user-select: ${userSelect || 'initial'};
                background: ${background || 'none'};
                flex-wrap: ${flexwrap || 'unset'};
                flex-direction: ${direction || 'row'};
                justify-content: ${justify || 'flex-start'};
                align-items: ${align || 'flex-start'};
                height: ${height || 'unset'};
                width: ${width || 'unset'};
                max-width: ${maxWidth || 'unset'};
                min-width: ${minWidth || 'unset'};
                margin: ${margin || '0'};
                padding: ${padding || '0'};
                border-radius: ${radius || 'unset'};
                border-top: ${borderTop || 'none'};
                border-right: ${borderRight || 'none'};
                border-bottom: ${borderBottom || 'none'};
                border-left: ${borderLeft || 'none'};
                border: ${border || 'initial'};
                box-shadow: ${shadow || 'none'};
                overflow: ${overflow || 'initial'};
                flex: ${flex || 'unset'};
                display: ${display || 'flex'};
            }

            #id.scrollbar-hover {
                overflow: hidden;
            }

            #id.scrollbar-hover:hover {
                overflow: overlay;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });
}