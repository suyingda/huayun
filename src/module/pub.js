function all(data = []
, action) {
    console.log(action,'pub')
    switch (action.type) {
        case "add":
            return [
                ...data,
                {
                    title: action.title
                }
            ];
        case "setHeader":
            return [
                {
                    footer: '我是setHeader'
                }
            ];
        case "setFooter":
            return [
                {
                    footer: 'footer'
                }
            ];
        case "test":
            return [
                {
                    footer: 'test'
                }
            ];

    }
    return data

}

export default all;
