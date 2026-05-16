import React, { useState, useEffect } from 'react';

const AiScoreResult = ({ matchedDonorsData, onSendRequest, onAcceptRequest, acceptedRequests }) => {
    const [requestedIds, setRequestedIds] = useState(() => {
        const saved = localStorage.getItem("blood_requests");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("blood_requests", JSON.stringify(requestedIds));
    }, [requestedIds]);

    const handleAction = (donor) => {
        if (!requestedIds.includes(donor.id)) {
            setRequestedIds([...requestedIds, donor.id]);
            onSendRequest(donor);
        }
    };

    return (
        <div className="card bg-[#0f172a] shadow-xl border border-slate-800 text-white">
            <div className="card-body p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-6 text-blue-400 border-l-4 border-blue-500 pl-3">
                    AI Match Results
                </h2>
                
                <div className="space-y-4">
                    {matchedDonorsData.length > 0 ? matchedDonorsData.map((donor) => {
                        const isRequested = requestedIds.includes(donor.id);
                        const isAccepted = acceptedRequests.includes(donor.id);

                        return (
                            <div key={donor.id} className={`p-4 rounded-lg border transition-all duration-300 ${isAccepted ? "border-green-500 bg-green-900/10" : "bg-slate-800/40 border-slate-700"}`}>
                                
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 bg-slate-700 ring ring-primary ring-offset-base-100 ring-offset-1">
                                                {donor.photo ? (
                                                    <img src={donor.photo} alt={donor.name} />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-lg font-bold uppercase text-slate-400">
                                                        {donor.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-lg font-bold text-white">{donor.name}</h3>
                                                {isAccepted && <span className="badge badge-success badge-sm text-white font-bold">VERIFIED</span>}
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                                                {donor.bloodGroup} • {donor.upazila}, {donor.district}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons with Call Feature */}
                                    <div className="flex gap-2 w-full sm:w-auto justify-end flex-wrap">
                                        {/* Direct Call Button */}
                                        <a 
                                            href={`tel:${donor.phone}`} 
                                            className="btn btn-xs md:btn-sm btn-error text-white px-4 shadow-lg flex items-center gap-1"
                                        >
                                            📞 Call Now
                                        </a>

                                        {isRequested && !isAccepted && (
                                            <button 
                                                onClick={() => onAcceptRequest(donor.id)} 
                                                className="btn btn-xs md:btn-sm btn-success text-white px-4 shadow-lg"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleAction(donor)}
                                            className={`btn btn-xs md:btn-sm px-6 shadow-lg ${isRequested ? "btn-disabled bg-slate-700 text-slate-500" : "btn-primary text-white"}`}
                                        >
                                            {isRequested ? (isAccepted ? "In Contact" : "Requested") : "WhatsApp"}
                                        </button>
                                    </div>
                                </div>

                                {/* Match Score Progress Bar */}
                                <div className="w-full bg-slate-900 h-5 rounded-full relative overflow-hidden ring-1 ring-slate-700">
                                    <div 
                                        className={`h-full transition-all duration-1000 ease-out flex items-center justify-center ${isAccepted ? "bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"}`} 
                                        style={{ width: `${donor.score}%` }}
                                    >
                                        <span className="text-[10px] font-black absolute w-full text-center text-white drop-shadow-md">
                                            {isAccepted ? "DONOR READY" : `LOCATION MATCH SCORE: ${donor.score}%`}
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                        );
                    }) : (
                        <div className="text-center py-8 bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                            <p className="text-slate-500 italic">Enter patient details to find the best matching donors near you.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiScoreResult;