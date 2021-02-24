export default {
    namespaced: true,
    state: {
        lists: [{
                id: 1,
                name: 'New',
            },
            {
                id: 2,
                name: 'In Progress ',
            },
            {
                id: 3,
                name: 'Complete',
            },
            {
                id: 4,
                name: 'In Review',
            },
            {
                id: 5,
                name: 'Resolved',
            }
        ],
        cards: [{
                id: 1,
                name: 'Quản Lý Lead',
                description: 'Thêm và hiển thị lead',
                list_id: 1,
            },
            {
                id: 2,
                name: 'Tạo giao diện thêm mới lead',
                description: 'Sử dụng modal',
                list_id: 2,
            },
            {
                id: 3,
                name: 'Quản lý opportunity',
                description: '',
                list_id: 3,
            },
        ]
    },
    getters: {
        // Khai báo getters
    },
    mutations: {
        addNewCard(state, newCard) {
            state.cards.push({ id: newCard[0], name: newCard[1], description: '', list_id: newCard[2] })
        },
        removeList(state, list) {
            if (state.lists.indexOf(list) > -1) {
                state.lists.splice(this.lists.indexOf(list), 1);
            }
        },
        addList(state, newList) {
            state.lists.push({ id: newList[0], name: newList[1] })
        },
    },
}