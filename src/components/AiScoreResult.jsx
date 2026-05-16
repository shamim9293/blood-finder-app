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
            {matchedDonors.map((donor) => {
              // ডাটাবেজে phone, number বা phoneNumber যা-ই থাকুক, তা খুঁজে নেবে
              const rawPhone = donor.phone || donor.number || donor.phoneNumber || "";
              
              // হোয়াটসঅ্যাপের জন্য শুধু সংখ্যাগুলো আলাদা করা (কোনো +, -, বা স্পেস থাকবে না)
              let cleanPhone = String(rawPhone).replace(/[^0-9]/g, "");
              
              // নাম্বার যদি ০ দিয়ে শুরু হয় (যেমন: 017...) তবে সামনে বাংলাদেশের কান্ট্রি কোড ৮৮ যোগ করে দেওয়া
              if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
                cleanPhone = "88" + cleanPhone;
              }

              return (
                <div
                  key={donor.id}
                  className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500 transition"
                >
                  {/* ছবি ও নাম */}
                  <div className="flex items-center gap-4">
                    {donor.photo ? (
                      <img
                        src={donor.photo}
                        alt=""
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

                  {/* ব্লাড গ্রুপ ও বাটন */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-700/50 sm:border-t-0 pt-2 sm:pt-0">
                    <span className="text-lg font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-md">
                      {donor.bloodGroup}
                    </span>
                    
                    {rawPhone ? (
                      <div className="flex gap-2">
                        {/* কল বাটন */}
                        <a
                          href={`tel:${rawPhone}`}
                          className="btn btn-sm btn-info text-white font-medium flex items-center gap-1 shadow-md"
                        >
                          📞 কল করুন
                        </a>
                        {/* হোয়াটসঅ্যাপ বাটন */}
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-success text-white font-medium flex items-center gap-1 shadow-md"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">No Number</span>
                    )}
                  </div>
                </div>
              );
            })}
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