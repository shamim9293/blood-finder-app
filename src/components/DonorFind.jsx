import React, { useState, useEffect } from 'react';

const DonorFind = ({ donors = [], bloodGroups = [], setRequestedBloodData }) => {
    const [searchGroup, setSearchGroup] = useState('');
    const [searchDistrict, setSearchDistrict] = useState('');
    const [searchUpazila, setSearchUpazila] = useState('');
    const [filteredDonors, setFilteredDonors] = useState([]);

    // কল করার ফাংশন
    const makeCall = (phoneNumber) => {
        if (!phoneNumber) return alert("ফোন নাম্বার পাওয়া যায়নি!");
        let cleanNumber = String(phoneNumber).trim().replace(/[^\d+]/g, "");
        window.location.href = `tel:${cleanNumber}`;
    };

    // হোয়াটসঅ্যাপ ফাংশন
    const openWhatsApp = (phoneNumber) => {
        if (!phoneNumber) return alert("হোয়াটসঅ্যাপ নাম্বার পাওয়া যায়নি!");
        let cleanPhone = String(phoneNumber).replace(/[^0-9]/g, "");
        if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
            cleanPhone = "88" + cleanPhone;
        }
        window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}`, "_blank", "noopener,noreferrer");
    };

    useEffect(() => {
        if (setRequestedBloodData) {
            setRequestedBloodData({
                bloodGroup: searchGroup,
                district: searchDistrict.trim(),
                upazila: searchUpazila.trim()
            });
        }
    }, [searchGroup, searchDistrict, searchUpazila, setRequestedBloodData]);

    useEffect(() => {
        if (searchGroup === "") {
            setFilteredDonors([]); 
        } else {
            const filtered = donors.filter(donor => 
                donor.bloodGroup && donor.bloodGroup.toUpperCase().trim() === searchGroup.toUpperCase().trim()
            );
            setFilteredDonors(filtered);
        }
    }, [searchGroup, donors]);

    return (
        <div className="card bg-slate-900 p-6 shadow-xl border border-slate-700 mt-6">
            <h2 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                🩸 ডোনর খুঁজুন (Search Donor)
            </h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium mb-1 text-slate-400">রক্তের গ্রুপ সিলেক্ট করুন *</label>
                    <select 
                        value={searchGroup}
                        onChange={(e) => setSearchGroup(e.target.value)}
                        className="select select-bordered bg-slate-800 text-white w-full border-slate-700 cursor-pointer text-sm"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    >
                        <option value="">রক্তের গ্রুপ বেছে নিন (Select Group)</option>
                        {bloodGroups.map((group) => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1 text-slate-400">রোগীর জেলা (যেমন: Barguna)</label>
                    <input 
                        type="text" 
                        value={searchDistrict}
                        onChange={(e) => setSearchDistrict(e.target.value)}
                        placeholder=" can be empty..." 
                        className="input input-bordered bg-slate-800 text-white w-full border-slate-700 text-sm"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium mb-1 text-slate-400">রোগীর উপজেলা/এলাকা (যেমন: Amtali)</label>
                    <input 
                        type="text" 
                        value={searchUpazila}
                        onChange={(e) => setSearchUpazila(e.target.value)}
                        placeholder=" can be empty..." 
                        className="input input-bordered bg-slate-800 text-white w-full border-slate-700 text-sm"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    />
                </div>
            </div>

            {/* ফিল্টার হওয়া ডোনরদের তালিকা (এখন বাটন সহ!) */}
            {searchGroup !== "" && (
                <div className="overflow-x-auto max-h-60 overflow-y-auto pr-1 mt-6 border-t border-slate-800 pt-4">
                    <h3 className="text-xs font-semibold mb-3 text-slate-400">রক্তের গ্রুপ অনুযায়ী সব ডোনর:</h3>
                    {filteredDonors.length > 0 ? (
                        <div className="space-y-2">
                            {filteredDonors.map((donor) => {
                                const donorPhone = donor.phone || donor.number || "";
                                return (
                                    <div key={donor.id} className="p-2.5 bg-slate-800/50 rounded border border-slate-800 flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">{donor.bloodGroup}</span>
                                            <p className="font-medium text-white">{donor.name}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-1.5">
                                            {donorPhone ? (
                                                <>
                                                    <button 
                                                        onClick={() => makeCall(donorPhone)}
                                                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold cursor-pointer transition active:scale-95"
                                                    >
                                                        📞 কল
                                                    </button>
                                                    <button 
                                                        onClick={() => openWhatsApp(donorPhone)}
                                                        className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-[10px] font-bold cursor-pointer transition active:scale-95"
                                                    >
                                                        💬 WA
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-slate-500 text-[10px]">No No.</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-xs text-gray-500 py-4 bg-slate-800/20 rounded border border-dashed border-slate-800">
                            এই গ্রুপের কোনো ডোনর পাওয়া যায়নি!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DonorFind;