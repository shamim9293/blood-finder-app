import React from 'react';

const DonorFind = ({ bloodGroups, requestedBloodData, setRequestedBloodData }) => {
    return (
        <div className="card bg-slate-900 p-6 shadow-xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Donor Request</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <input 
                    type="text" 
                    placeholder="Patient Name" 
                    className="input input-bordered bg-slate-800 text-white w-full border-slate-700 placeholder-slate-400"
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    value={requestedBloodData.name || ""}
                    onChange={(e) => setRequestedBloodData({ ...requestedBloodData, name: e.target.value })}
                />

                <select 
                    className="select select-bordered bg-slate-800 text-white w-full border-slate-700"
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    value={requestedBloodData.bloodGroup || ""}
                    onChange={(e) => setRequestedBloodData({ ...requestedBloodData, bloodGroup: e.target.value })}
                >
                    <option value="" disabled>Required Blood Group</option>
                    {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>

                <input 
                    type="text" 
                    placeholder="Patient Division" 
                    className="input input-bordered bg-slate-800 text-white w-full border-slate-700"
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    value={requestedBloodData.division || ""}
                    onChange={(e) => setRequestedBloodData({ ...requestedBloodData, division: e.target.value })}
                />

                <input 
                    type="text" 
                    placeholder="Patient District" 
                    className="input input-bordered bg-slate-800 text-white w-full border-slate-700"
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    value={requestedBloodData.district || ""}
                    onChange={(e) => setRequestedBloodData({ ...requestedBloodData, district: e.target.value })}
                />

                <input 
                    type="text" 
                    placeholder="Patient Upazila/Area" 
                    className="input input-bordered bg-slate-800 text-white w-full border-slate-700 md:col-span-2"
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    value={requestedBloodData.upazila || ""}
                    onChange={(e) => setRequestedBloodData({ ...requestedBloodData, upazila: e.target.value })}
                />
            </div>
            
            <p className="text-[10px] text-slate-500 mt-4 italic">
                * AI will prioritize donors from the same Upazila first, then District, then Division.
            </p>
        </div>
    );
};

export default DonorFind;