import React from 'react';

const DonorFind = ({ setRequestedBloodData, bloodGroups }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestedBloodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card bg-slate-900 shadow-xl border border-slate-800 overflow-hidden">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Donor Request</h2>
        <p className="text-[11px] text-slate-400 italic mb-2">
          * AI will prioritize donors from the same Upazila first, then District, then Division.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <input
              type="text"
              name="name"
              placeholder="Patient Name"
              onChange={handleChange}
              className="input input-bordered w-full bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="form-control w-full">
            <select 
              name="bloodGroup" 
              onChange={handleChange} 
              className="select select-bordered w-full bg-slate-950 border-slate-800 text-slate-100 focus:border-slate-700 focus:outline-none"
            >
              <option value="">Required Blood Group</option>
              {bloodGroups?.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <input
              type="text"
              name="division"
              placeholder="Patient Division"
              onChange={handleChange}
              className="input input-bordered w-full bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="form-control w-full">
            <input
              type="text"
              name="district"
              placeholder="Patient District"
              onChange={handleChange}
              className="input input-bordered w-full bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="form-control w-full">
          <input
            type="text"
            name="upazila"
            placeholder="Patient Upazila/Area"
            onChange={handleChange}
            className="input input-bordered w-full bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DonorFind;