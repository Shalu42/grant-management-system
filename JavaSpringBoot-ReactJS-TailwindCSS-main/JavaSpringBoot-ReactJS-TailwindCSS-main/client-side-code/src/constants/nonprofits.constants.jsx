const nonprofilts = {
    popupForm: {
        formName: "Add new nonprofit",
        fields: [
            {
                displayLabel: 'Nonprofile Name',
                type: 'text',
                key: 'name',
                required: true,
                defaultValue: ''
            },
            {
                displayLabel: 'Address',
                type: 'textarea',
                key: 'address',
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
            apiKey: 'createNonprofiltOfFoundation',
            type: 'post',
            predicate: {
                exists: true,
                key: 'foundationId'
            }
        }
    },
    popupSendEmail: {
        formName: "Send Bulk Email",
        fields: [],
        uri: {
            apiKey: 'sendEmailsToNonprofits',
            type: 'post',
            predicate: {
                exists: true,
                key: 'foundationId'
            }
        }
    }
}

export default nonprofilts;