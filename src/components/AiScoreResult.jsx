import React from "react";

const AiScoreResult = ({ matchedDonors = [] }) => {
  
  // জাভাস্ক্রিপ্ট দিয়ে সরাসরি ফোন কল করার ফাংশন
  const makeCall = (phoneNumber) => {
    if (!phoneNumber) return alert("ফোন নাম্বার পাওয়া যায়নি!");
    window.location.href = `tel:${phoneNumber}`;
  };

  // জাভাস্ক্রিপ্ট দিয়ে সরাসরি হোয়াটসঅ্যাপ চ্যাট ওপেন করার ফাংশন
  const openWhatsApp = (phoneNumber) => {
    if (!phoneNumber) return alert("হোয়াটসঅ্যাপ নাম্বার পাওয়া যায়নি!");
    
    // শুধু সংখ্যাগুলো আলাদা করা (কোনো +, -, বা স্পেস থাকবে না)
    let cleanPhone = String(phoneNumber).replace(/[^0-9]/g, "");
    
    // নাম্বার যদি ০ দিয়ে শুরু হয় (যেমন: 017...) তবে সামনে বাংলাদেশের কান্ট্রি কোড ৮৮ যোগ করে দেওয়া
    if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      cleanPhone = "88" + cleanPhone;
    }
    
    window.open(`https://wa.me/${cleanPhone}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card bg-slate-900 p-4 md:p-6 shadow-xl border border-slate-700">
      <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        ⚡ AI MATCH RESULTS
      </h2>

      <div className="space-y-3">
        {matchedDonors.length > 0 ? (
          matchedDonors.map((donor) => {
            const rawPhone = donor.phone || donor.number || donor.phoneNumber || "";

            return (
              <div
                key={donor.id}
                className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col gap-3 hover:border-blue-500 transition"
              >
                {/* উপর অংশ: ছবি, নাম ও ম্যাচ স্কোর */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    {donor.photo ? (
                      <img
                        src={donor.photo}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-gray-400">
                        No Pic
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white text-sm">{donor.name}</p>
                      <p className="text-xs text-slate-400">
                        📍 {donor.upazila || "বরগুনা"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    {donor.score}% Match
                  </span>
                </div>

                {/* নিচের অংশ: ব্লাড গ্রুপ এবং কল ও হোয়াটসঅ্যাপ অ্যাকশন বাটন */}
                <div className="flex items-center justify-between border-t border-slate-700/50 pt-3 mt-1">
                  <span className="text-base font-bold text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded">
                    {donor.bloodGroup}
                  </span>
                  
                  {rawPhone ? (
                    <div className="flex gap-2">
                      {/* কল করুন বাটন */}
                      <button
                        onClick={() => makeCall(rawPhone)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded flex items-center gap-1 shadow cursor-pointer transition active:scale-95"
                      >
                        📞 কল করুন
                      </button>
                      
                      {/* WhatsApp বাটন */}
                      <button
                        onClick={() => openWhatsApp(rawPhone)}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded flex items-center gap-1 shadow cursor-pointer transition active:scale-95"
                      >
                        💬 WhatsApp
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-xs">No Number</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-slate-400 py-8 border-2 border-dashed border-slate-800 rounded-lg bg-slate-950/30 text-sm">
            Enter patient details to find the best matching donors near you.
          </div>
        )}
      </div>
    </div>
  );
};

export default AiScoreResult;