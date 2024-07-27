import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUri = 'https://api.ngo-admin.demo.mayankagrawal.co.in'

const apiPool = {
    getFoundation: {
        uri: 'foundations',
        pathAvailable: false
    },
    createFoundation: {
        uri: 'foundations',
        pathAvailable: false
    },
    getNonprofitByFoundation: {
        uri: 'nonprofits',
        pathAvailable: true
    },
    createNonprofiltOfFoundation: {
        uri: 'nonprofits',
        pathAvailable:true
    },
    getNonprofitEmailLogs: {
        uri: 'nonprofits/email-logs',
        pathAvailable:true
    },
    sendEmailsToNonprofits: {
        uri: 'nonprofits/send-email',
        pathAvailable: true
    }

}

const converToUri = (type, pathVariable) => {
    let uri = `${baseUri}/${apiPool[type]['uri']}`
    if(apiPool[type]['pathAvailable'] && pathVariable) {
        uri += '/' + pathVariable
    }
    return uri;
}

export const genericGet = (type, pathVariable = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const uri = converToUri(type, pathVariable)
    
    useEffect(() => {
        axios.get(uri)
          .then(response => {
            setData(response.data); // Set the data from response
            setLoading(false); // Set loading to false as data has been loaded
          })
          .catch(err => {
            console.log(err);
            setError(err); // Set error if there's an issue fetching data
            setLoading(false); // Ensure loading is set to false even if there is an error
          });
    }, []); // Empty dependency array means this effect will only run once after the initial render

    return { data, setData, loading, error }; // Return the state
}

export const genericPost = async (type, payload, pathVariable = null) => {
    try {
        const uri = converToUri(type, pathVariable)

        const { data } = await axios.post(uri, payload)

        return { 
            success: true,
            message: 'Request taken successfuly',
            data: data,
        }
    } catch (err) {
        console.error(err)
        return { 
            success: false,
            message: 'Something went wrong, please try after some time.',
            data: null,
            error: err,
        };
    }
}