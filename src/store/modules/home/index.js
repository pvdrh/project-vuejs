export default {
    namespaced: true,
    state: {
        //Khai báo state
    },
    getters: {
        // Khai báo getters
    },
    mutations: {
        addList(state, newList) {
            state.lists.push({ id: newList[0], name: newList[1] })
        },
        addNewCard(state, newCard) {
            state.cards.push({ id: newCard[0], name: newCard[1], description: '', list_id: newCard[2] })
        },
        removeList(state, list) {
            if (state.lists.indexOf(list) > -1) {
                state.lists.splice(this.lists.indexOf(list), 1);
            }
        }
    },
}