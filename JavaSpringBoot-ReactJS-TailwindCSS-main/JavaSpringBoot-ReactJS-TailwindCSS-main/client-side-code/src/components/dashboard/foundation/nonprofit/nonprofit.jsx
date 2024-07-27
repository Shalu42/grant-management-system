import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { genericGet } from '../../../../shared/service';
import BackNav from '../../../common/backNav'
import PopupForm from '../../../common/popupForm';
import NonprofitConstant from '../../../../constants/nonprofits.constants';
import PopupSendEmail from '../../helper/popupSendEmail';

const Nonprofit = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [tableData, setTableData] = useState([]);

    const { foundationId } = useParams();
    // if( !foundationId ) return (
    //     <>
    //         <div className='text-left'>
    //                 <BackNav />
    //         </div>
    //         <h2>404 Not Found</h2>
    //     </>
    // );
    
    const { data, setData, loading, error } = genericGet('getNonprofitByFoundation', foundationId);
    
    // Initialize isChecked property for each item in tableData
    useEffect(() => {
        if(Array.isArray(data) && data.length > 0) {
            const initialTableData = data.map(item => ({ ...item, isChecked: false }));
            setTableData(initialTableData);
        }
    }, [data]);

    const handleCheckboxChange = (isChecked, index) => {
        const updatedTableData = tableData.map((item, i) => {
            if (i === index) {
                return { ...item, isChecked };
            }
            return item;
        });
        setTableData(updatedTableData);
    };

    const handleSelectAll = (isChecked) => {
        const updatedTableData = tableData.map(item => ({ ...item, isChecked }));
        setTableData(updatedTableData);
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className='text-left'>
                <BackNav />
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">Nonprofits</h2>
                    <p className="mt-1 text-sm text-gray-700">
                        This is a list of all nonprofits. You can add new nonprofits and also can send
                        bulk emails to nonprofits.
                    </p>
                </div>
                <div>
                    <button type="button" onClick={() => setShowModalEmail(true)}
                        className="rounded-md bg-black mr-4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Send Email
                    </button>
                    <button type="button" onClick={() => setShowModal(true)}
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Add new nonprofits
                    </button>
                </div>
            </div>

            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                <input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} />
                            </th>
                            <th scope="col"
                             className="px-4 py-3.5 text-center text-sm font-normal text-gray-700" >
                                <span>S. No.</span>
                            </th>
                            <th scope="col"
                                className="px-12 py-3.5 text-center text-sm font-normal text-gray-700" >
                                Name
                            </th>
                            <th scope="col"
                                className="px-12 py-3.5 text-center text-sm font-normal text-gray-700" >
                                Address
                            </th>
                            <th scope="col"
                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                Email
                            </th>
                            <th scope="col"
                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                Status
                            </th>
                            <th scope="col"
                                className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                Email Logs
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {Array.isArray(tableData) && tableData.map( (item, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        <input type="checkbox" checked={item['isChecked']}
                                        onChange={(e) => handleCheckboxChange(e.target.checked, index)} />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {index + 1}.
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.name || 'N/A'}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.address || 'N/A'}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.email || 'N/A'}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                            Active
                                        </span>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                        <Link to={`${item.id}/emailLogs`} className="text-yellow-950">
                                            View
                                        </Link>
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

            <PopupForm tableData={data} setTableData={setData} showModal={showModal}
                setShowModal={setShowModal} popupForm={NonprofitConstant.popupForm}/>
            
            <PopupSendEmail showModal={showModalEmail} setShowModal={setShowModalEmail} 
                tableData={tableData} popupData={NonprofitConstant.popupSendEmail} handleSelectAll={handleSelectAll}/>
        </section>
    )
}

export default Nonprofit;