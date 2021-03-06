/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_LoadingBar(param) {
    const {
        parent,
        position
    } = param;

    /**
     * @link https://tobiasahlin.com/spinkit/
     */
    const component = Core_Component({
        type: 'loadingbar',
        html: /*html*/ `
            <div>
                <div class="sk-cube-grid">
                    <div class="sk-cube sk-cube1"></div>
                    <div class="sk-cube sk-cube2"></div>
                    <div class="sk-cube sk-cube3"></div>
                    <div class="sk-cube sk-cube4"></div>
                    <div class="sk-cube sk-cube5"></div>
                    <div class="sk-cube sk-cube6"></div>
                    <div class="sk-cube sk-cube7"></div>
                    <div class="sk-cube sk-cube8"></div>
                    <div class="sk-cube sk-cube9"></div>
                </div>
                <div class='sk-cube-label'>Compliling report</div>
            </div>
        `,
        style:  /*css*/ `
            #id {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: fadein 350ms ease-in-out;
            }

            .sk-cube-label {
                color: ${App.primaryColor};
                font-size: 1.2em;
                font-weight: 500;
            }

            .sk-cube-grid {
                width: 40px;
                height: 40px;
                margin: 15px auto;
            }
          
            .sk-cube-grid .sk-cube {
                width: 33%;
                height: 33%;
                background-color: ${App.primaryColor};
                float: left;
                -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
                animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
            }

            .sk-cube-grid .sk-cube1 {
                -webkit-animation-delay: 0.2s;
                animation-delay: 0.2s;
            }

            .sk-cube-grid .sk-cube2 {
                -webkit-animation-delay: 0.3s;
                animation-delay: 0.3s; 
            }
            
            .sk-cube-grid .sk-cube3 {
                -webkit-animation-delay: 0.4s;
                animation-delay: 0.4s;
            }
            
            .sk-cube-grid .sk-cube4 {
                -webkit-animation-delay: 0.1s;
                animation-delay: 0.1s;
            }
            
            .sk-cube-grid .sk-cube5 {
                -webkit-animation-delay: 0.2s;
                animation-delay: 0.2s;
            }
            
            .sk-cube-grid .sk-cube6 {
                -webkit-animation-delay: 0.3s;
                animation-delay: 0.3s;
            }
            
            .sk-cube-grid .sk-cube7 {
                -webkit-animation-delay: 0s;
                animation-delay: 0s;
            }
            
            .sk-cube-grid .sk-cube8 {
                -webkit-animation-delay: 0.1s;
                animation-delay: 0.1s;
                    
            }
            
            .sk-cube-grid .sk-cube9 {
                -webkit-animation-delay: 0.2s;
                animation-delay: 0.2s;
            }
            
            @-webkit-keyframes sk-cubeGridScaleDelay {
                0%, 70%, 100% {
                    -webkit-transform: scale3D(1, 1, 1);
                    transform: scale3D(1, 1, 1);
                } 
                
                35% {
                    -webkit-transform: scale3D(0, 0, 1);
                    transform: scale3D(0, 0, 1); 
                }
            }
            
            @keyframes sk-cubeGridScaleDelay {
                0%, 70%, 100% {
                    -webkit-transform: scale3D(1, 1, 1);
                    transform: scale3D(1, 1, 1);
                } 
                
                35% {
                    -webkit-transform: scale3D(0, 0, 1);
                    transform: scale3D(0, 0, 1);
                } 
            }

            /** Container animation */
            @keyframes fadein {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0) ;
                }

                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            .fadeout {
                animation: fadeout 350ms ease-in-out forwards !important;
            }

            @keyframes fadeout {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }

                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0);
                }
            }
        `,
        parent: parent,
        position: position || 'beforeend',
        events: [

        ]
    });

    component.end = () => {
        return new Promise((resolve, reject) => {
            const loadingBar = component.get();

            if (loadingBar) {
                loadingBar.addEventListener('animationend', (event) => {
                    loadingBar.remove();
                    resolve(true);
                });

                loadingBar.classList.add('fadeout');
            }
        });
    }

    return component;
}