/** (C) 2021 Stephen Matheis */

/** Components */
import Component_Container from '../Components/Component_Container.js'
import Component_FoldingCube from '../Components/Component_FoldingCube.js'
import Component_RoundSquareCard from '../Components/Component_RoundSquareCard.js'
import Component_Banner from '../Components/Component_Banner.js'

export default async function ViewPart_ParentCards(param) {
    const {
        type,
        items,
        parent
    } = param;

    /** Show Loading Circle */
    const loadingIndicatorContainer = Component_Container({
        align: 'center',
        justify: 'center',
        width: '100%',
        margin: '30px 0px 0px 0px',
        parent: parent
    });
    
    loadingIndicatorContainer.add();

    const loadingIndicator = Component_FoldingCube({
        label: `Loading ${type}`,
        parent: loadingIndicatorContainer
    });
    
    loadingIndicator.add();
    

    if (items.length > 0) {
        const container = Component_Container({
            flexwrap: 'wrap',
            maxWidth: 'fit-content',
            parent
        });

        container.add();

        const cards = await Promise.all(items.map(async team => {
            const {
                id,
                name,
                tasks
            } = team;
    
            /** Tasks */
            const completed = tasks.filter(item => item.Progress === 'Completed');
    
            /** Add card */
            const teamCard = Component_RoundSquareCard({
                title: name,
                total: tasks.length,
                completed: completed.length,
                bubbleCount: 5,
                parent: container,
                action(event) {
                    App.route(`Teams/Tasks/${id}`);
                }
            });
            
            return teamCard;
        }));

        /** Remove loading indicator */
        loadingIndicatorContainer.remove();

        cards.forEach(card => {
            card.add();
        });
    } else {
        const banner = Component_Banner({
            text: 'No teams',
            size: '1.2em',
            margin: '0px',
            parent
        });

        banner.add();
    }
}
