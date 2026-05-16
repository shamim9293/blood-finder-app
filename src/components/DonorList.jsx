import React from 'react';
import { checkAvailability } from '../App';

const DonorList = ({ donors, onDelete }) => {
  return (
    <div className="card bg-slate-900 shadow-xl border border-slate-800 overflow-hidden">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-bold text-white mb-4">Donor Database</h2>
        
        <div className="hidden md:block overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
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
                  <tr key={donor.id} className="border-b border-slate-800 hover:bg-slate-950/30 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
                            {donor.photo ? (
                              <img src={donor.photo} alt={donor.name} className="object-cover w-full h-full" />
                            ) : (
                              <div className="text-slate-300 font-bold uppercase">{donor.name ? donor.name[0] : 'D'}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-bold text-white">{donor.name}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-error badge-sm text-white px-2.5 py-0.5 rounded font-semibold">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="text-xs text-slate-400">
                      {donor.upazila && donor.district ? `${donor.upazila}, ${donor.district}` : '—'}
                    </td>
                    <td>
                      {canDonate ? (
                        <span className="text-[11px] font-bold text-green-500 uppercase tracking-wider">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">
                          RESTING ({daysLeft}d)
                        </span>
                      )}
                    </td>
                    <td>
                      <button 
                        onClick={() => onDelete(donor.id)} 
                        className="btn btn-ghost btn-xs text-red-500 font-semibold hover:bg-red-500/10 normal-case"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden space-y-3">
          {donors.map(donor => {
            const { canDonate, daysLeft } = checkAvailability(donor.lastDonationDate);
            return (
              <div key={donor.id} className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
                        {donor.photo ? (
                          <img src={donor.photo} alt={donor.name} className="object-cover w-full h-full" />
                        ) : (
                          <div className="text-slate-300 font-bold uppercase">{donor.name ? donor.name[0] : 'D'}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{donor.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {donor.upazila && donor.district ? `${donor.upazila}, ${donor.district}` : '—'}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-error text-white font-bold px-2.5 py-1 text-xs">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <div>
                    {canDonate ? (
                      <span className="text-[11px] font-bold text-green-500 uppercase tracking-wider bg-green-500/10 px-2 py-1 rounded">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2 py-1 rounded">
                        RESTING ({daysLeft}d)
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => onDelete(donor.id)} 
                    className="text-xs text-red-500 font-bold px-2 py-1 rounded hover:bg-red-500/10 active:scale-95 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {donors.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">No donors available in database.</div>
        )}
      </div>
    </div>
  );
};

export default DonorList;