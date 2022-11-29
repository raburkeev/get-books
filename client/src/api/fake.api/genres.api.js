export const genres = {
    fiction: {
        id: '28db9cfcc3ee',
        name: 'Фантастика',
        color: 'primary'
    },
    fantasy: {
        id: '0aa006fb066d',
        name: 'Фэнтези',
        color: 'success'
    },
    action: {
        id: 'babb51543b8a',
        name: 'Боевик',
        color: 'secondary'
    },
    detective: {
        id: 'f5adac689084',
        name: 'Детектив',
        color: 'warning'
    },
    adventures: {
        id: 'd39bd7d1b49a',
        name: 'Приключения',
        color: 'success'
    },
    novel: {
        id: '6063521203ed',
        name: 'Роман',
        color: 'danger'
    },
    horror: {
        id: '8cbd0613168f',
        name: 'Ужасы',
        color: 'dark'
    },
    classic: {
        id: '5c2a658cf9ec',
        name: 'Классика',
        color: 'light'
    },
    prose: {
        id: 'b8bd4a074046',
        name: 'Проза',
        color: 'info'
    },
    humor: {
        id: '85d74174e596',
        name: 'Юмор',
        color: 'info'
    }
}

const fetchAll = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(genres)
        }, 3000)
    })

export default {
    fetchAll
}
