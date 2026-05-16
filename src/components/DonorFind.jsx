import React, { useState, useEffect } from 'react';

const DonorFind = ({ donors = [], bloodGroups = [], setRequestedBloodData }) => {
    const [searchGroup, setSearchGroup] = useState('');
    const [searchDistrict, setSearchDistrict] = useState('');
    const [searchUpazila, setSearchUpazila] = useState('');
    const [filteredDonors, setFilteredDonors] = useState([]);

    // ব্লাড গ্রুপ, জেলা বা উপজেলা যেকোনোটি পরিবর্তন হলেই অ্যাপের মেইন স্টেট আপডেট হবে
    useEffect(() => {
        if (setRequestedBloodData) {
            setRequestedBloodData({
                bloodGroup: searchGroup,
                district: searchDistrict.trim(),
                upazila: searchUpazila.trim()
            });
        }
    }, [searchGroup, searchDistrict, searchUpazila, setRequestedBloodData]);

    // ডাটাবেজ থেকে ফিল্টার করে শুধুমাত্র সিলেক্ট করা ব্লাড গ্রুপের ডোনরদের বাম পাশে দেখাবে
    useEffect(() => {
        if (searchGroup === "") {
            setFilteredDonors(donors); // কিছু সিলেক্ট না করলে শুরুতে সবাইকে দেখাবে
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
                {/* ১. ব্লাড গ্রুপ ড্রপডাউন সিলেক্ট */}
                <div>
                    <label className="block text-xs font-medium mb-1 text-slate-400">রক্তের গ্রুপ সিলেক্ট করুন *</label>
                    <select 
                        value={searchGroup}
                        onChange={(e) => setSearchGroup(e.target.value)}
                        className="select select-bordered bg-slate-800 text-white w-full border-slate-700 cursor-pointer text-sm"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    >
                        <option value="">সব রক্তের গ্রুপ (All Groups)</option>
                        {bloodGroups.map((group) => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                {/* ২. জেলা ইনপুট বক্স */}
                <div>
                    <label className="block text-xs font-medium mb-1 text-slate-400">রোগীর জেলা (যেমন: Barguna)</label>
                    <input 
                        type="text" 
                        value={searchDistrict}
                        onChange={(e) => setSearchDistrict(e.target.value)}
                        placeholder="জেলার নাম লিখুন..." 
                        className="input input-bordered bg-slate-800 text-white w-full border-slate-700 text-sm"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    />
                </div>

                {/* ৩. উপজেলা ইনপুট বক্স */}
                <div>
                    <label className="block text-xs font-medium mb-1 text-slate-400">রোগীর উপজেলা/এলাকা (যেমন: Amtali)</label>
                    <input 
                        type="text" 
                        value={searchUpazila}
                        onChange={(e) => setSearchUpazila(e.target.value)}
                        placeholder="উপজেলার নাম লিখুন..." 
                        className="input input-bordered bg-slate-800 text-white w-full border-slate-700 text-sm"
                        style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                    />
                </div>
            </div>

            {/* ফিল্টার হওয়া ডোনরদের ছোট তালিকা (সহজ ট্র্যাকিংয়ের জন্য) */}
            <div className="overflow-x-auto max-h-60 overflow-y-auto pr-1 mt-6 border-t border-slate-800 pt-4">
                <h3 className="text-xs font-semibold mb-3 text-slate-400">রক্তের গ্রুপ অনুযায়ী সব ডোনর:</h3>
                {filteredDonors.length > 0 ? (
                    <div className="space-y-2">
                        {filteredDonors.map((donor) => (
                            <div key={donor.id} className="p-2.5 bg-slate-800/50 rounded border border-slate-800 flex items-center justify-between gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">{donor.bloodGroup}</span>
                                    <p className="font-medium text-white">{donor.name}</p>
                                </div>
                                <p className="text-slate-500 text-[11px]">{donor.upazila || 'বরগুনা'}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-xs text-gray-500 py-2">কোনো ডোনর পাওয়া যায়নি</p>
                )}
            </div>
        </div>
    );
};

export default DonorFind;