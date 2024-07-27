import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { genericGet } from '../../../../shared/service';
import BackNav from '../../../common/backNav';
import PopupEmalViewer from '../../helper/popupEmalViewer';

const EmailLogs = () => {
    const [ viewEmailContent, setViewEmailContent ] = useState('')
    const [ showEmailModal, setShowEmailModal] = useState(false)

    const { foundationId, nonprofitId } = useParams();
    if( !foundationId || !nonprofitId ) return <h2>404 Not Found</h2>;

    const { data:tableData, setData:setTableData, loading, error } = genericGet('getNonprofitEmailLogs', nonprofitId);

    const onEmalMessageView = (message) => {
        setViewEmailContent(message)
        setShowEmailModal(true)
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className='text-left'>
                <BackNav />
            </div>
            <div className=" space-y-2 items-center">
                <div>
                    <h2 className="text-lg font-semibold">Email Logs</h2>
                    <p className="mt-1 text-sm text-gray-700">
                        This is a sent email list of all nonprofits.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                             className="px-4 py-3.5 text-center text-sm font-normal text-gray-700" >
                                <span>S. No.</span>
                            </th>
                            <th scope="col"
                                className="px-12 py-3.5 text-center text-sm font-normal text-gray-700" >
                                Recipient
                            </th>
                            <th scope="col"
                                className="px-12 py-3.5 text-center text-sm font-normal text-gray-700" >
                                Subject
                            </th>
                            <th scope="col"
                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                Message
                            </th>
                            <th scope="col"
                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                Time
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {Array.isArray(tableData) && tableData.map( (item, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.recipient || 'N/A'}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.subject || 'N/A'}
                                    </td>
                                    {/* <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.message || 'N/A'}
                                    </td> */}
                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium " >
                                        <a className="text-yellow-950 cursor-pointer" onClick={() => onEmalMessageView(item.message)}>
                                            View
                                        </a>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.sentAt ? format(new Date(item.sentAt), 'dd/MM/yyyy hh:mm a') : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {loading && <tr><td><div>Loading...</div></td></tr>}
                            {error && <tr><td><div>Error: {error.message}</div></td></tr>}
                            {!loading && Array.isArray(tableData) && tableData.length == 0 && <tr><td><div>No Data found.</div></td></tr>}
                        </tbody>

                    </table>
                    </div>
                </div>
                </div>
            </div>
            
            <PopupEmalViewer content={viewEmailContent}
                showModal={showEmailModal} onClose={setShowEmailModal} />
        </section>
    );
}

export default EmailLogs;