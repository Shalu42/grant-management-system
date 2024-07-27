import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { genericPost } from '../../shared/service';

const PopupForm = ( props ) => {
    const uriParams = useParams();
    const { popupForm, tableData, setTableData, showModal, setShowModal } = props
    
    const [apiResponse, setApiResponse] = useState({
        triggered: false,
        respMsg: '',
        success: null
    })

    const defaultForm = {}
    for(let item of popupForm.fields) {
        defaultForm[item.key] = item.defaultValue
    }
    const [formData, setFormData] = useState(defaultForm);

    const submitForm = async() => {
        setApiResponse({...apiResponse, triggered: false})
        const rcdExists = isRecordExists();
        if(rcdExists) return;
        const pathPredicate = popupForm.uri.predicate.exists ? uriParams[popupForm.uri.predicate.key] : null
        const resp = await genericPost( popupForm.uri.apiKey, formData, pathPredicate);
        setApiResponse({
            triggered: true,
            respMsg: resp.message,
            success: resp.success
        })
        if(resp.success) resetForm(resp.data);
    }

    const isRecordExists = () => {
        const index = tableData.findIndex(it=> it.email === formData.email)
        if(index == -1) return false;
        setApiResponse({
            triggered: true,
            respMsg: "Email already exists.",
            success: false
        })
        return true;
    }

    const resetForm = (respData) => {
        setTableData([...tableData,respData])
        setFormData(defaultForm);
        setTimeout(() => {
            setShowModal(false)
            setApiResponse({...apiResponse, triggered: false})
        }, 1000)
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log(formData);
        submitForm();
    };

    return (
        <>
            {showModal ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">{popupForm.formName}</h3>

                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                        <form onSubmit={handleSubmit}>
                            { Array.isArray(popupForm.fields) && popupForm.fields.map((item, index) => (
                            <div className="mb-4" key={'block' + '-' + index}>
                                <label
                                    className="block text-left text-gray-700 font-bold mb-2"
                                    htmlFor={item.key + '-' + index}
                                >
                                    {item.displayLabel}
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id={item.key + '-' + index}
                                    type={item.type}
                                    placeholder={`Enter ${item.displayLabel}`}
                                    name={item.key}
                                    value={formData[item.key]}
                                    onChange={handleInputChange}
                                    {...(item.required && { required: true })}
                                />
                                { item.required ? (<p className="text-left text-xs text-gray-500">*This field is required</p>) : null }
                            </div>
                            ))}

                            { apiResponse.triggered ? 
                                (
                                    (
                                        <div className={'mb-3 ' + (apiResponse.success ? 'text-green-800' : 'text-red-500')}>
                                            <p> {apiResponse.respMsg} </p>
                                        </div>
                                    )
                                ) 
                                : null 
                            }

                            <div className="flex items-center" >
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                    style={{ marginLeft: '20%' }}
                                >
                                    Submit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    style={{ marginLeft: '15px' }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default PopupForm;
