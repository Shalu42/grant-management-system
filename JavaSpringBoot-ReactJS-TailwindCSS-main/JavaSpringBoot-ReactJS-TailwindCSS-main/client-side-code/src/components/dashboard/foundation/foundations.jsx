import React, { useState } from 'react';
import { genericGet } from '../../../shared/service';
import PopupForm from '../../common/popupForm';
import foundationConstant from '../../../constants/foundations.constants';
import { Link } from 'react-router-dom';

const Foundations = () => {
    const [showModal, setShowModal] = useState(false);
    const { data:tableData, setData:setTableData, loading, error } = genericGet('getFoundation');

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">Foundation</h2>
                    <p className="mt-1 text-sm text-gray-700">
                        This is a list of all foundation. You can add new foundation and also can add
                        its Non-profits.
                    </p>
                </div>
                <div>
                    <button
                        type="button"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        onClick={() => setShowModal(true)} >
                        Add new foundation
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
                            <th scope="col"
                             className="px-4 py-3.5 text-center text-sm font-normal text-gray-700" >
                                <span>S. No.</span>
                            </th>
                            <th scope="col"
                                className="px-12 py-3.5 text-center text-sm font-normal text-gray-700" >
                                Name
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
                                Nonprofit
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {Array.isArray(tableData) && tableData.map( (item, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {index + 1}.
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                        {item.name || 'N/A'}
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
                                        <Link to={`${item.id}/nonprofits`} className="text-yellow-950">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {loading && <tr><td><div>Loading...</div></td></tr>}
                            {error && <tr><td><div>Error: {error.message}</div></td></tr>}
                            {Array.isArray(tableData) && tableData.length == 0 && <tr><td><div>No Data found.</div></td></tr>}
                        </tbody>

                    </table>
                    </div>
                </div>
                </div>
            </div>

            <PopupForm tableData={tableData} setTableData={setTableData} showModal={showModal}
                setShowModal={setShowModal} popupForm={foundationConstant.popupForm}/>
        </section>
    )
}

export default Foundations