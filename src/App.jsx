import React, { useState, useEffect, useMemo } from "react";
import { ref, push, onValue, remove } from "firebase/database";
import { db } from "./firebaseConfig";
import DonorList from "./components/DonorList";
import DonorRegistry from "./components/DonorRegistry";
import Header from "./components/Header";
import DonorFind from "./components/DonorFind";
import AiScoreResult from "./components/AiScoreResult";

// ব্লাড কম্প্যাটিবিলিটি এবং অ্যাভেইল্যাবিলিটি লজিক
const bloodCompatibility = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"]
};

export const checkAvailability = (lastDate) => {
  if (!lastDate) return { canDonate: true, daysLeft: 0 };
  const today = new Date();
  const donationDate = new Date(lastDate);
  const diffInMs = today - donationDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const canDonate = diffInDays >= 90;
  const daysLeft = 90 - diffInDays;
  return { canDonate, daysLeft: canDonate ? 0 : daysLeft };
};

function App() {
  const bloodGroups = Object.keys(bloodCompatibility);
  const [donors, setDonors] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [requestedBloodData, setRequestedBloodData] = useState({ name: "", bloodGroup: "", division: "", district: "", upazila: "" });

  useEffect(() => {
    const donorsRef = ref(db, 'donors');
    onValue(donorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setDonors(list);
      } else {
        setDonors([]);
      }
    });
  }, []);

  const handleRegister = (newDonor) => {
    const donorsRef = ref(db, 'donors');
    push(donorsRef, newDonor);
  };

  const handleDelete = (id) => {
    const password = prompt("Admin Security: Enter Password to Delete Donor");
    if (password === "naim123") {
      remove(ref(db, `donors/${id}`));
      alert("Donor removed successfully.");
    } else {
      alert("Access Denied: Incorrect Password");
    }
  };

  // AI Matching Score (Location-based prioritization)
  const matchedDonorsData = useMemo(() => {
    if (!requestedBloodData.bloodGroup) return [];
    return donors.map(donor => {
      let score = 0;
      const { canDonate } = checkAvailability(donor.lastDonationDate);
      
      if (canDonate && bloodCompatibility[donor.bloodGroup]?.includes(requestedBloodData.bloodGroup)) {
        score = 40; // ব্লাড গ্রুপ ম্যাচ করলে বেস স্কোর ৪০
        
        if (donor.division === requestedBloodData.division) {
          score += 20; // একই বিভাগ হলে +২০
          if (donor.district === requestedBloodData.district) {
            score += 20; // একই জেলা হলে +২০
            if (donor.upazila === requestedBloodData.upazila) {
              score += 20; // একই উপজেলা হলে +২০ (সর্বোচ্চ ১০০)
            }
          }
        }
      }
      return { ...donor, score };
    }).filter(d => d.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
  }, [donors, requestedBloodData]);

  return (
    <div className="bg-slate-800 min-h-screen text-slate-200 p-2 md:p-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonorRegistry bloodGroups={bloodGroups} onRegister={handleRegister} />
          <DonorFind bloodGroups={bloodGroups} requestedBloodData={requestedBloodData} setRequestedBloodData={setRequestedBloodData} />
        </div>
        <AiScoreResult 
          matchedDonorsData={matchedDonorsData} 
          onSendRequest={(d) => window.open(`https://wa.me/${d.phone.replace(/\D/g,'')}`, "_blank")} 
          onAcceptRequest={(id) => setAcceptedRequests([...acceptedRequests, id])} 
          acceptedRequests={acceptedRequests} 
        />
        <DonorList donors={donors} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;