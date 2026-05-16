import React from 'react';

const AiScoreResult = ({ matchedDonors }) => {
  const donorsList = matchedDonors || [];

  return (
    <div className="card bg-slate-900 shadow-xl border border-slate-800 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-400 mb-4 tracking-wide uppercase">⚡ AI Match Results</h2>
        
        {donorsList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th>Donor Name</th>
                  <th>Group</th>
                  <th>Match Score</th>
                </tr>
              </thead>
              <tbody>
                {donorsList.map((donor) => (
                  <tr key={donor.id} className="border-b border-slate-800 hover:bg-slate-950/50 transition-colors">
                    <td className="text-sm font-bold text-white">{donor.name}</td>
                    <td>
                      <span className="badge badge-error badge-sm text-white">{donor.bloodGroup}</span>
                    </td>
                    <td>
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
                        {donor.score}% Match
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-dashed border-slate-800 rounded-lg p-8 text-center bg-slate-950/20">
            <p className="text-sm text-slate-500 font-medium">
              Enter patient details to find the best matching donors near you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiScoreResult;