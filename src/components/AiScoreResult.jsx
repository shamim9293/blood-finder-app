import React from "react";

const AiScoreResult = ({ matchedDonors = [] }) => {
  
  // Directly trigger mobile dialer
  const makeCall = (phoneNumber) => {
    if (!phoneNumber) return alert("ফোন নাম্বার পাওয়া যায়নি!");
    let cleanNumber = String(phoneNumber).trim().replace(/[^\d+]/g, "");
    window.location.href = `tel:${cleanNumber}`;
  };

  // Open WhatsApp API window
  const openWhatsApp = (phoneNumber) => {
    if (!phoneNumber) return alert("হোয়াটসঅ্যাপ নাম্বার পাওয়া যায়নি!");
    let cleanPhone = String(phoneNumber).replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      cleanPhone = "88" + cleanPhone;
    }
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card bg-slate-900 p-4 shadow-xl border border-slate-700">
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
                {/* Top Row: Pic, Name and Match Score */}
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
                  
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                      {donor.score}% Match
                    </span>
                    <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                      {donor.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Full Width Call & WhatsApp Buttons for Mobile */}
                {rawPhone ? (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/50 w-full">
                    <button
                      type="button"
                      onClick={() => makeCall(rawPhone)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded flex items-center justify-center gap-1 shadow-md cursor-pointer transition active:scale-95"
                    >
                      📞 কল করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => openWhatsApp(rawPhone)}
                      className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded flex items-center justify-center gap-1 shadow-md cursor-pointer transition active:scale-95"
                    >
                      💬 WhatsApp
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-xs pt-2 border-t border-slate-700/50">
                    No Contact Number
                  </div>
                )}
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