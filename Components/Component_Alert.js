/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

/**
 * @link https://getbootstrap.com/docs/4.0/components/alerts/
 * 
 * @param {Object} param 
 */
export default function Component_Alert(param) {
    const {
        type,
        text,
        margin,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='alert alert-${type}' role='alert'${margin ? ` style='margin: ${margin};'` : ''}>${text}</div>
        `,
        style: /*css*/ `

        `,
        parent,
        position
    });

    return component;
}