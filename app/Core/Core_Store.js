/** RHC-C G-6 SharePoint Team */

export default function Store() {
    let store = {
        components: {},
        actionData: []
    }

    return {
        add(component) {
            const {
                name,
            } = component;
    
            store.components[name] = component;
        },
        get(name) {
            if (store.components[name]) {
                return store.components[name].component;
            } else {
                return undefined;
            }
        },
        remove(name) {
            store.components[name].component.remove();
            
            delete store.components[name];
        },
        register(actionData) {
            store.actionData.push(actionData);
        },
        deregister(actionData) {
            const index = store.actionData.indexOf(actionData);

            store.actionData.splice(index, 1);
        },
        recall() {
            return store.actionData;
        },
        empty() {
            store.components = {};
            store.actionData = [];
        }
    }
}