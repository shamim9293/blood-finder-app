import React from "react";

const AiScoreResult = ({ matchedDonors = [] }) => {
  return (
    <div className="card bg-slate-900 p-6 shadow-xl border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        ⚡ AI MATCH RESULTS
      </h2>

      <div className="overflow-x-auto">
        {matchedDonors.length > 0 ? (
          <div className="space-y-3">
            {matchedDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500 transition"
              >
                {/* ডোনরের প্রোফাইল ছবি ও বিস্তারিত */}
                <div className="flex items-center gap-4">
                  {donor.photo ? (
                    <img
                      src={donor.photo}
                      alt={donor.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xs text-gray-400">
                      No Pic
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-base">{donor.name}</p>
                      <span className="badge badge-sm badge-primary text-xs font-bold">
                        Score: {donor.score}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">
                      📍 {donor.upazila ? `${donor.upazila}, ${donor.district}` : donor.district || "বরগুনা"}
                    </p>
                  </div>
                </div>

                {/* ব্লাড গ্রুপ এবং কল/হোয়াটসঅ্যাপ অ্যাকশন বাটন */}
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-700/50 sm:border-t-0 pt-2 sm:pt-0">
                  <span className="text-lg font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-md">
                    {donor.bloodGroup}
                  </span>
                  
                  {donor.phone ? (
                    <div className="flex gap-2">
                      {/* সরাসরি ফোন কল করার বাটন */}
                      <a
                        href={`tel:${donor.phone}`}
                        className="btn btn-sm btn-info text-white font-medium flex items-center gap-1 shadow-md hover:scale-105 transition active:scale-95"
                      >
                        📞 কল করুন
                      </a>
                      {/* সরাসরি হোয়াটসঅ্যাপ মেসেজ করার বাটন */}
                      <a
                        href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-success text-white font-medium flex items-center gap-1 shadow-md hover:scale-105 transition active:scale-95"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">N/A</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-8 border-2 border-dashed border-slate-800 rounded-lg bg-slate-950/30">
            Enter patient details to find the best matching donors near you.
          </div>
        )}
      </div>
    </div>
  );
};

export default AiScoreResult;