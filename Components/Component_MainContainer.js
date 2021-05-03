/** (C) 2021 Stephen Matheis */

import Core_Component from '../Core/Core_Component.js'

export default function Component_MainContainer(param) {
    const {
        parent
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='maincontainer'></div>
        `,
        style: /*css*/ `
            .maincontainer {
                position: relative;
                padding: 20px 50px;
                flex: 1;
                /* height: 100vh;
                height: -webkit-fill-available; */
                overflow: overlay;
            }

            .maincontainer.dim {
                filter: blur(25px);
                user-select: none;
                overflow: hidden,
            }
        `,
        parent,
        position: 'beforeend',
        events: []
    });

    component.dim = (toggle) => {
        const maincontainer = component.get();
        
        if (toggle) {
            maincontainer.classList.add('dim');
        } else {
            maincontainer.classList.remove('dim');
        }
    }

    component.paddingOff = () => {
        component.get().style.padding = '0px';
    }

    component.paddingOn = () => {
        component.get().style.padding = '20px 50px';
    }

    component.eventsOff = () => {
        [...component.get().children].forEach(child => {
            child.style.pointerEvents = 'none';
        });
    }

    component.eventsOn = () => {
        [...component.get().children].forEach(child => {
            child.style.pointerEvents = 'initial';
        });
    }

    return component;
}