/** RHC-C G-6 SharePoint Team */

/** Components */
import Component_Comments from '../Components/Component_Comments.js'

export default function View_Comments(param) {
    const {
        parentId,
        foreignKey,
        background,
        parent,
        width
    } = param;

    /** Comments */
    const comments = App.data.lists.Comments.sort((a, b) => {
        const nameA = new Date(a.Created);
        const nameB = new Date(b.Created);
        
        if (nameA > nameB) {
            return -1;
        }

        if (nameA < nameB) {
            return 1;
        }
        
        return 0; 
    })
    .filter(item => item[foreignKey] === parseInt(parentId));

    const commentsForm = Component_Comments({
        comments,
        background,
        foreignKey,
        width,
        parent,
        parentId
    });

    commentsForm.add();
}
