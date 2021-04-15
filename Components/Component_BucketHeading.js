/** (C) 2021 Stephen Matheis */

/** Components */
import Core_Component from '../Core/Core_Component.js'

export default function Component_BucketHeading(param) {
    const {
        label,
        doneCount,
        totalCount,
        parent,
        position
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='todo-heading'>
                <div class='todo-heading-label'>${label}</div>
                <div class='todo-heading-count'>
                    <div class='todo-heading-done number'>${doneCount}</div>
                    <div class='todo-heading-spacer'>/</div>
                    <div class='todo-heading-total number'>${totalCount}</div>
                    <div class='todo-heading-percent'>${totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0}%</div>
                </div>
            </div>
        `,
        style: /*css*/ `
            #id {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 1.2em;
                font-weight: 400;
                margin: 20px 0px 0px 0px;
                padding: 0px 30px 0px 0px;
                text-align: right; 
            }

            #id * {
                color: ${App.primaryColor};
            }

            #id .todo-heading-count {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            #id .todo-heading-spacer {
                margin: 0px 5px;
            }

            #id .todo-heading-count .number {
                width: 30px;
            }

            #id .todo-heading-done {
                text-align: right;
            }
            
            #id .todo-heading-total {
                text-align: left;
            }

            #id .todo-heading-percent {
                font-weight: 500;
                width: 50px;
                text-align: right;
            }
        `,
        parent,
        position,
        events: [

        ]
    });

    component.setCount = param => {
        const {
            done,
            total
        } = param

        let numerator;
        let denominator;

        /** Only update done if value provided */
        if (done !== undefined) {
            numerator = done;

            component.find('.todo-heading-done').innerText = done.toString() || totalCount;
        } else {
            numerator = doneCount;
        }

        /** Only update total if value provided */
        if (total !== undefined)  {
            denominator = total;

            component.find('.todo-heading-total').innerText = total.toString() || totalCount;
        } else {
            denominator = totalCount;
        }

        /** Always update percent */
        component.find('.todo-heading-percent').innerText = `${denominator > 0 ? Math.round((numerator / denominator) * 100) : 0}%`;
    }

    return component;
}