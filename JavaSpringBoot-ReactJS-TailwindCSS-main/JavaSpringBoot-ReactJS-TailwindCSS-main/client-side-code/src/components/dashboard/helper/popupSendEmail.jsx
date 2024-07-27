import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { genericPost } from '../../../shared/service';
import EmailTemplates from '../../../constants/emailTemplates.constants';

const PopupSendEmail = (props) => {
    const uriParams = useParams();
    const { showModal, setShowModal, tableData, popupData, handleSelectAll } = props;
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [ emailBcc, setEmailBcc ] = useState('')
    const [ emailCc, setEmailCc ] = useState('')

    // Function to render email message based on template selection
    const renderEmailMessage = () => {
        if( !EmailTemplates[selectedTemplate] ) return `<div>Please select a template</div>`;
        return EmailTemplates[selectedTemplate].preview;
    };

    const [apiResponse, setApiResponse] = useState({
        triggered: false,
        respMsg: '',
        success: null
    })

    const getSelectedEmail = () => {
        if( Array.isArray(tableData) && tableData.length < 0) return;
        const tempSelectedEmails = tableData
            .filter(item => item.isChecked) // Filter out items where isChecked is false
            .map(item => item.email); // Extract email from remaining items
        return tempSelectedEmails;
    }

    const resetForm = (respData) => {
        setSelectedTemplate('');
        setTimeout(() => {
            setShowModal(false)
            setApiResponse({...apiResponse, triggered: false})
            handleSelectAll(false)
        }, 1500)
    }

    const onsubmit = () => {
        setApiResponse({...apiResponse, triggered: false})
        const checkedEmails = getSelectedEmail()
        if( checkedEmails.length == 0 ) {
            return setApiResponse({
                triggered: true,
                respMsg: 'Atleast select one nonprofit from table.',
                success: false
            })
        }
        if( !selectedTemplate ) {
            return setApiResponse({
                triggered: true,
                respMsg: 'Please select an email template.',
                success: false
            })
        }
        apiCall(checkedEmails)
    }

    const apiCall = async (nonprofitEmails) => {
        const formData = {
            nonprofitEmails,
            messageTemplate: EmailTemplates[selectedTemplate].template,
            bcc: emailBcc,
            cc: emailCc
        }
        const pathPredicate = popupData.uri.predicate.exists ? uriParams[popupData.uri.predicate.key] : null
        console.log( "pathPredicate =>", pathPredicate,uriParams)
        const resp = await genericPost( popupData.uri.apiKey, formData, pathPredicate);
        setApiResponse({
            triggered: true,
            respMsg: resp.message,
            success: resp.success
        })
        if(resp.success) resetForm(resp.data);
    }

    const onClose = () => {
        setApiResponse({...apiResponse, triggered: false})
        setSelectedTemplate('');
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-4/5 h-4/5 flex">
                        <div className="w-1/2 p-4 border-r border-gray-200">
                            {/* Left Part - Email Message Preview */}
                            <div className="h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: renderEmailMessage() }} />
                               
                        </div>
                        <div className="w-1/2 p-4">
                            {/* Right Part - Form Section */}
                            <div className="h-full flex flex-col items-center justify-center">
                                <h1 className="text-2xl mb-4">{popupData.formName}</h1>
                                <select
                                    className={'w-3/4 p-2 border border-gray-300 rounded ' + (apiResponse.triggered ? 'mb-2' : 'mb-4')}
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                >
                                    <option disabled value="">Select a template</option>
                                    <option value="template1">Template will details</option>
                                    <option value="template2">Simple Template</option>
                                </select>

                                <div className="w-3/4 p-2  mb-4" key='bcc'>
                                    <label
                                        className="block text-left text-gray-700 font-bold mb-2"
                                    >
                                        BCC:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="bcc"
                                        type="text"
                                        placeholder="Enter Email here"
                                        name="bcc"
                                        value={emailBcc}
                                        onChange={(e) => setEmailBcc(e.target.value)}
                                    />
                                </div>
                                <div className="w-3/4 p-2  mb-4" key='bcc'>
                                    <label
                                        className="block text-left text-gray-700 font-bold mb-2"
                                    >
                                        CC:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="cc"
                                        type="text"
                                        placeholder="Enter Email here"
                                        name="cc"
                                        value={emailCc}
                                        onChange={(e) => setEmailCc(e.target.value)}
                                    />
                                </div>
                                
                                { apiResponse.triggered ? 
                                    (
                                        (
                                            <div className={'mb-4 ' + (apiResponse.success ? 'text-green-800' : 'text-red-500')}>
                                                <p> {apiResponse.respMsg} </p>
                                            </div>
                                        )
                                    ) 
                                    : null 
                                }

                                <div className="flex justify-center space-x-4">
                                    <button onClick={onsubmit}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        Submit
                                    </button>
                                    <button onClick={onClose}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Close
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default PopupSendEmail;
