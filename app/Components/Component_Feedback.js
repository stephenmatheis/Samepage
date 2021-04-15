/** RHC-C G-6 SharePoint Team */

/** Actions */
import Core_Component from '../Core/Core_Component.js'

export default function Component_Feedback(param) {
    const {
        parentItem,
        replies,
        parent,
        position,
    } = param;

    const name = parentItem.SubmittedBy.split(' ');
    const firstName = name[0];
    const lastName = name[1];
    const firstInitial = firstName[0];
    const lastInitial = lastName[0];

    const component = Core_Component({
        html: /*html*/ `
            <div class="fullpage-modal">
            <div class="message-title">${parentItem.Summary}</div>
                <div class="message">
                    <div class="message-author-date-container">
                        <div class="message-author-bubble-container">
                            <div class="user-bubble">
                                <span>${firstInitial}${lastInitial}</span>
                            </div>
                        </div>
                        <div class="message-author-date">
                            <div class="message-author">
                                <span>by</span>
                                <span>${parentItem.SubmittedBy}</span>
                            </div>
                            <div class="message-date">
                                ${dateTemplate(parentItem.Created)}
                            </div>
                        </div>
                    </div>
                    <div class="message-body">
                        <div>${parentItem.Feedback}</div>
                    </div>
                </div>
                <div class="message-comments-border">
                    <div class="message-comments-border-count-container">
                        <div class="message-comments-border-count">
                            <span>${replies.length}</span>
                        </div>
                    </div>
                    <div class="message-comments-border-name">
                        <div>Comments</div>
                    </div>
                    <div class="message-comments-border-line-container">
                        <div class="message-comments-border-line"></div>
                    </div>
                </div>
                <div class="message-comments-container">
                    ${createCommentsHTML()}
                </div>
            </div>
        `,
        style: /*css*/ `
            .fullpage-modal {
                width: 865px;
            }

            .message {
                display: flex;
                flex-direction: column;
                background: white;
                border-radius: 4px;
                padding: 20px 40px;
                border:  ${App.defaultBorder};
            }

            .message-title {
                width: 80vw;
                max-width: 800px;
                text-align: center;
                padding: 30px;
                font-size: 2em;
                font-weight: 700;
                box-sizing: border-box;
            }

            .message-author-date-container {
                display: flex;
                flex-direction: row;
                margin: 20px 0px;
                /* border-top: solid 2px gainsboro;
                border-bottom: solid 2px gainsboro; */
                font-weight: 500;
            }

            .message-author-date {
                display: grid;
                place-content: center;
            }

            .message-reply-count-container {
                flex: 2;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }

            .message-reply-count {
                display: grid;
                place-content: center;
            }

            .message-replies {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                margin: 5px;
                background: cadetblue;
                display: grid;
                place-content: center;
            }

            .message-replies span {
                color: white;
                font-weight: 700;
            }

            .message-body {
                padding: 10px;
                font-weight: 500;
            }

            .message-comments-border {
                display: flex;
                flex-direction: row;
                margin-top: 30px;
            }

            .message-comments-border-count {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 5px;
                background: ${App.primaryColor};
                display: grid;
                place-content: center;
            }

            .message-comments-border-count span {
                color: white;
                font-size: 1.5em;
                font-weight: 700;
                margin-bottom: 1px;
            }

            .message-comments-border-name {
                display: grid;
                place-content: center;
                font-size: 1.5em;
                font-weight: 700;
            }

            .message-comments-border-line-container {
                flex: 2;
                display: grid;
                place-content: center;
            }

            .message-comments-border-line {
                height: 2px;
                width: 650px;
                margin-top: 7px;
                background: rgba(0,0,0,0.7);
            }
            
            .user-bubble {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin: 5px;
                background: rgba(0,0,0,0.1);
                display: grid;
                place-content: center;
            }

            .message-comments-container {
                display: flex;
                flex-direction: column;
            }

            .message-comment {
                display: flex;
                flex-direction: row;
                margin: 20px 0px;
                padding: 5px;
                background: white;
                border-left: solid 10px ${App.primaryColor};
                border-radius: 4px;
                border:  ${App.defaultBorder};
            }
            .message-comments-date {
                height: 100%;
                font-weight: 500;
                margin: 5px;
            }

            .message-comments-date-author-body-container {
                flex: 2;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }

            .message-comments-body {
                font-weight: 500;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            
        ]
    });

    function createCommentsHTML() {
        let html = '';

        replies.forEach(item => {
            html += commentTemplate(item);
        });

        return html;
    }
    
    function dateTemplate(date) {
        const d = new Date(date);

        return /*html*/ `
            <span>${d.toLocaleDateString()}</span>
            <span>·</span>
            <span>${d.getHours()}:${d.getMinutes()}</span>
        `
    }

    function commentTemplate(comment) {
        const name = comment.SubmittedBy.split(' ');
        const firstName = name[0];
        const lastName = name[1];
        const firstInitial = firstName[0];
        const lastInitial = lastName[0];

        return /*html*/ `
            <div class="message-comment">
                <div class="message-comments-author-bubble-container">
                    <div class="user-bubble">
                        <span>${firstInitial}${lastInitial}</span>
                    </div>
                </div>
                <div class="message-comments-date-author-body-container">
                    <div class="message-comments-author-body-container">
                        <div class="message-comments-author">${comment.SubmittedBy}</div>
                        <div class="message-comments-body"><div>${comment.Feedback}</div></div>
                    </div>
                    <div class="message-comments-date">
                        ${dateTemplate(comment.Created)}
                    </div>
                </div>
            </div>
        `;
    }

    component.addComment = (comment) => {
        const container = component.find('.message-comments-container');

        container.insertAdjacentHTML('afterend', commentTemplate(comment));
    }

    return component;
}