const foundation = {
    popupForm: {
        formName: "Add new foundation",
        fields: [
            {
                displayLabel: 'Foundation Name',
                type: 'text',
                key: 'name',
                required: true,
                defaultValue: ''
            },
            {
                displayLabel: 'Email',
                type: 'email',
                key: 'email',
                required: true,
                defaultValue: ''
            }
        ],
        uri: {
            apiKey: 'createFoundation',
            type: 'post',
            predicate: {
                exists: false,
                key: null
            }
        }
    }
}

export default foundation;