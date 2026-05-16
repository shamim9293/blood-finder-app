import React from 'react';
import { checkAvailability } from '../App';

const DonorList = ({ donors, onDelete }) => {
    return (
        <div className="card bg-slate-900 shadow-xl border border-slate-800 overflow-hidden">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Donor Database</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full text-slate-300">
                        <thead>
                            <tr className="bg-slate-950 text-slate-400">
                                <th>Donor</th>
                                <th>Group</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map(donor => {
                                const { canDonate, daysLeft } = checkAvailability(donor.lastDonationDate);
                                return (
                                    <tr key={donor.id} className="border-b border-slate-800">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 h-10 rounded-full bg-slate-700">
                                                        {donor.photo ? <img src={donor.photo} alt="" /> : <div className="flex items-center justify-center h-full uppercase font-bold">{donor.name[0]}</div>}
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold">{donor.name}</div>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-error badge-sm text-white">{donor.bloodGroup}</span></td>
                                        <td className="text-xs text-slate-400">{donor.upazila}, {donor.district}</td>
                                        <td>
                                            {canDonate ? <span className="text-[10px] text-green-500 font-bold">ACTIVE</span> : <span className="text-[10px] text-orange-400 font-bold">RESTING ({daysLeft}d)</span>}
                                        </td>
                                        <td>
                                            <button onClick={() => onDelete(donor.id)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-500/10">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default DonorList;