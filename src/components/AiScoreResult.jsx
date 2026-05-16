import React from "react";

const AiScoreResult = ({ matchedDonors = [] }) => {
  
  // জাভাস্ক্রিপ্ট দিয়ে সরাসরি ফোন করার ফাংশন
  const makeCall = (phoneNumber) => {
    if (!phoneNumber) return alert("ফোন নাম্বার পাওয়া যায়নি!");
    window.location.href = `tel:${phoneNumber}`;
  };

  // জাভাস্ক্রিপ্ট দিয়ে সরাসরি হোয়াটসঅ্যাপ ওপেন করার ফাংশন
  const openWhatsApp = (phoneNumber) => {
    if (!phoneNumber) return alert("হোয়াটসঅ্যাপ নাম্বার পাওয়া যায়নি!");
    
    // শুধু সংখ্যাগুলো আলাদা করা
    let cleanPhone = String(phoneNumber).replace(/[^0-9]/g, "");
    
    // নাম্বার যদি ০ দিয়ে শুরু হয় তবে সামনে ৮৮ কান্ট্রি কোড যোগ করা
    if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      cleanPhone = "88" + cleanPhone;
    }
    
    // নতুন ট্যাবে হোয়াটসঅ্যাপ ওপেন করা
    window.open(`https://wa.me/${cleanPhone}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card bg-slate-900 p-6 shadow-xl border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        ⚡ AI MATCH RESULTS
      </h2>

      <div className="overflow-x-auto">
        {matchedDonors.length > 0 ? (
          <div className="space-y-3">
            {matchedDonors.map((donor) => {
              const rawPhone = donor.phone || donor.number || donor.phoneNumber || "";

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
                        {/* জাভাস্ক্রিপ্ট ক্লিক ইভেন্ট সহ কল বাটন */}
                        <button
                          onClick={() => makeCall(rawPhone)}
                          className="btn btn-sm btn-info text-white font-medium flex items-center gap-1 shadow-md cursor-pointer"
                        >
                          📞 কল করুন
                        </button>
                        
                        {/* জাভাস্ক্রিপ্ট ক্লিক ইভেন্ট সহ হোয়াটসঅ্যাপ বাটন */}
                        <button
                          onClick={() => openWhatsApp(rawPhone)}
                          className="btn btn-sm btn-success text-white font-medium flex items-center gap-1 shadow-md cursor-pointer"
                        >
                          💬 WhatsApp
                        </button>
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