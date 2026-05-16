import React, { useState, useEffect } from 'react';

const DonorFind = ({ donors = [], bloodGroups = [], setRequestedBloodData }) => {
    const [searchGroup, setSearchGroup] = useState('');
    const [filteredDonors, setFilteredDonors] = useState([]);

    // App.jsx থেকে donors এর ডেটা আপডেট হলে বা ড্রপডাউন পরিবর্তন হলে এটি রান হবে
    useEffect(() => {
        if (searchGroup === "") {
            setFilteredDonors(donors); // কিছু সিলেক্ট না করলে শুরুতে সবাইকে দেখাবে
        } else {
            // সিলেক্ট করা গ্রুপের সাথে ডাটাবেজের গ্রুপ মিলিয়ে সবাইকে ফিল্টার করবে
            const filtered = donors.filter(donor => 
                donor.bloodGroup && donor.bloodGroup.toUpperCase().trim() === searchGroup.toUpperCase().trim()
            );
            setFilteredDonors(filtered);
        }
    }, [searchGroup, donors]);

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        setSearchGroup(value);
        
        // AI Matcher বক্সকে সচল রাখার জন্য ব্লাড গ্রুপ ডেটা পাঠানো
        if (setRequestedBloodData) {
            setRequestedBloodData(prev => ({ ...prev, bloodGroup: value }));
        }
    };

    return (
        <div className="card bg-slate-900 p-6 shadow-xl border border-slate-700 mt-6">
            <h2 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                🩸 ডোনর খুঁজুন (Search Donor)
            </h2>
            
            {/* ব্লাড গ্রুপ ড্রপডাউন সিলেক্ট */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-slate-300">রক্তের গ্রুপ সিলেক্ট করুন:</label>
                <select 
                    value={searchGroup}
                    onChange={handleDropdownChange}
                    className="select select-bordered bg-slate-800 text-white w-full border-slate-700 cursor-pointer"
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                >
                    <option value="">সব রক্তের গ্রুপ (All Groups)</option>
                    {bloodGroups.map((group) => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>
            </div>

            {/* ফিল্টার হওয়া ম্যাচিং ডোনরদের তালিকা */}
            <div className="overflow-x-auto max-h-80 overflow-y-auto pr-1">
                <h3 className="text-sm font-semibold mb-3 text-slate-400">ম্যাচিং ডোনর লিস্ট:</h3>
                {filteredDonors.length > 0 ? (
                    <div className="space-y-3">
                        {filteredDonors.map((donor) => (
                            <div key={donor.id} className="p-3 bg-slate-800 rounded border border-slate-700 flex items-center justify-between gap-2 text-xs hover:border-slate-500 transition">
                                <div className="flex items-center gap-3">
                                    {/* প্রোফাইল ছবি */}
                                    {donor.photo ? (
                                        <img src={donor.photo} alt="" className="w-9 h-9 rounded-full object-cover border border-red-500" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-[9px] text-gray-400">No Pic</div>
                                    )}
                                    <div>
                                        <p className="font-bold text-white text-sm">{donor.name}</p>
                                        <p className="text-slate-400">{donor.upazila ? `${donor.upazila}, ${donor.district}` : donor.district || 'বরগুনা'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-red-500 mr-1 bg-red-500/10 px-2 py-1 rounded text-sm">{donor.bloodGroup}</span>
                                    {donor.phone && (
                                        <div className="flex gap-1">
                                            {/* ফোন কল বাটন */}
                                            <a href={`tel:${donor.phone}`} className="btn btn-xs btn-info text-white px-2">📞</a>
                                            {/* হোয়াটসঅ্যাপ বাটন */}
                                            <a href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-success text-white px-2">💬</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-sm text-gray-500 py-6 bg-slate-800/30 rounded border border-dashed border-slate-800">এই গ্রুপের কোনো ডোনর পাওয়া যায়নি!</p>
                )}
            </div>
        </div>
    );
};

export default DonorFind;