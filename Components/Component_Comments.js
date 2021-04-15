/** (C) 2021 Stephen Matheis */

/** Actions */
import Core_Component from '../Core/Core_Component.js'
import Action_CreateItem from '../Actions/Action_CreateItem.js'

export default function Component_Feedback(param) {
    const {
        comments,
        background,
        foreignKey,
        parent,
        position,
        width,
        parentId
    } = param;

    const component = Core_Component({
        html: /*html*/ `
            <div class='comments-container'>
                <!-- Border -->
                <div class='comments-border'>
                    <div class='comments-border-count-container'>
                        <div class='comments-border-count'>
                            <span>${comments.length}</span>
                        </div>
                    </div>
                    <div class='comments-border-name'>
                        <div>${comments.length > 1 || comments.length === 0 ? 'Comments' : 'Comment'}</div>
                    </div>
                    <div class='comments-border-line-container'>
                        <div class='comments-border-line'></div>
                    </div>
                </div>
                <!-- New Comment -->
                <div class='new-comment' contenteditable='true'></div>
                <!-- Button -->
                <div class='new-comment-button-container'>
                    <div class='new-comment-button'>Add comment</div>
                </div>
                <!-- Comments -->
                <div class='comments'>
                    ${createCommentsHTML()}
                </div>
            </div>
        `,
        style: /*css*/ `
            .comments-container {
                width: ${width || '100%'}; /** 690, 865px */
            }

            .comments-border {
                display: flex;
                flex-direction: row;
                margin-top: 30px;
            }

            .comments-border-count {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin: 5px;
                background: ${App.primaryColor};
                display: grid;
                place-content: center;
            }

            .comments-border-count span {
                color: white;
                font-size: 1.5em;
                font-weight: 700;
                margin-bottom: 1px;
            }

            .comments-border-name {
                display: grid;
                place-content: center;
                font-size: 1.5em;
                font-weight: 700;
            }

            .comments-border-line-container {
                flex: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px;
            }

            .comments-border-line {
                height: 2px;
                flex: 1;
                margin-top: 7px;
                background: rgba(0,0,0,0.7);
            }

            /* New Comment */
            #id .new-comment {
                font-size: .9em;
                font-weight: 500;
                margin: 10px 0px;
                min-height: 68px;
                padding: 10px;
                background: ${background || 'white'};
                border-radius: 4px;
                border: ${App.defaultBorder};
            }

            #id .new-comment:active,
            #id .new-comment:focus {
                outline: none;
                border: solid 1px transparent;
                box-shadow: 0px 0px 0px 2px ${App.primaryColor};
            }

            /* Button */
            #id .new-comment-button-container {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin: 0px;
            }

            #id .new-comment-button {
                cursor: pointer;
                display: inline-block;
                margin: 0px;
                padding: 5px 10px;
                font-weight: bold;
                text-align: center;
                border-radius: 4px;
                color: ${App.secondaryColor};
                background: mediumseagreen;
                border: solid 2px seagreen;
            }

            /* Comments */
            .comments {
                display: flex;
                flex-direction: column;
            }

            .comment-container {
                margin: 10px 0px;
                padding: 10px;
                border-radius: 4px;
                background: white;
                border: ${App.defaultBorder};
                border-left: solid 10px lightgray;
            }

            .comment-author {
                padding-right: 10px;
            }

            .comment-date-container {
                display: flex;
                align-items: center;
                font-size: .9em;
            }

            .comment {
                display: flex;
                flex-direction: column;
                padding-top: 5px;
                font-weight: 500;
            }

            /* Current User Comment */
            .comment-container.mine {
                border: solid 1px ${App.primaryColor};
                border-left: solid 10px ${App.primaryColor};
            }

            .comment-container.mine .comment {
                padding-top: 3px;
            }

            /* Requestor */
            .requestor {
                margin-right: 10px;
                padding: 0px 4px;
                border-radius: 4px;
                border: solid 1px ${App.primaryColor};
                background: ${App.primaryColor};
                color: white;
            }
        `,
        parent,
        position: position || 'beforeend',
        events: [
            {
                selector: '#id .new-comment-button',
                event: 'click',
                async listener(event) {
                    const field = component.find('.new-comment');
                    const Comment = field.innerText;
                    const SubmittedBy = `${App.user.FirstName} ${App.user.LastName}`
                    const Account = App.user.Account;
        
                    if (Comment) {
                        const newItem = await Action_CreateItem({
                            list: 'Comments',
                            data: {
                                [foreignKey]: parseInt(parentId),
                                Comment,
                                SubmittedBy,
                                Account
                            },
                            notify: false
                        });
            
                        component.addComment(newItem);
            
                        field.innerText = '';
                    } else {
                        console.log('new comment field is empty');
                    }
                }
            }
        ]
    });

    function createCommentsHTML() {
        let html = '';

        comments.forEach(item => {
            html += commentTemplate(item);
        });

        return html;
    }
    
    function dateTemplate(date) {
        const d = new Date(date);

        return /*html*/ `
            <div class='comment-date'>${d.toLocaleDateString()} ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
        `
    }

    function commentTemplate(comment) {
        return /*html*/ `
            <div class='comment-container${comment.Account === App.user.Account ? ' mine' : ''}'>
                <div class='comment-date-container'>
                    <div class='comment-author'>${comment.SubmittedBy}</div>
                    ${dateTemplate(comment.Created)}
                </div>
                <div class='comment'><div>${comment.Comment}</div></div>
            </div>
        `;
    }

    component.addComment = (comment) => {
        const container = component.find('.comments');
        
        container.insertAdjacentHTML('afterbegin', commentTemplate(comment));

        const counter = component.find('.comments-border-count span');
        const newCount = parseInt(counter.innerText) + 1;

        counter.innerText =  newCount;

        const text = component.find('.comments-border-name');
      
        text.innerText = newCount > 1 ? 'Comments' : 'Comment'
    }

    return component;
}