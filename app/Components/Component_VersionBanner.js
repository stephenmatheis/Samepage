/** RHC-C G-6 SharePoint Team */

import Core_Component from '../Core/Core_Component.js'

export default function Component_VersionBanner(param) {
    const {
        version,
        width
    } = param;

    return Core_Component({
        html: /*html*/ `
            <div class='version-banner'>${version}</div>
        `,
        style: /*css*/ `
            .version-banner {
                cursor: default;
                position: fixed;
                top: 5px;
                right: 15px;
                padding: 5px;
                font-size: 1em;
                background: lightyellow;
                border-left: solid 4px gold;
                border-radius: 4px;
                border:  ${App.defaultBorder};
                ${width ? `width: ${width};` : ''}
            }
        `
    });
}