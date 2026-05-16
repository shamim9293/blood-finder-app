import React, { useState, useEffect, useMemo } from "react";
import { collection, addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore"; 
import { db } from "./firebase"; 

import DonorList from "./components/DonorList";
import DonorRegistry from "./components/DonorRegistry";
import Header from "./components/Header";
import DonorFind from "./components/DonorFind";
import AiScoreResult from "./components/AiScoreResult";

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
  const daysLeft = diffInDays >= 90 ? 0 : 90 - diffInDays;
  return { canDonate, daysLeft };
};

function App() {
  const bloodGroups = Object.keys(bloodCompatibility);
  const [donors, setDonors] = useState([]);
  const [requestedBloodData, setRequestedBloodData] = useState({ name: "", bloodGroup: "", district: "", upazila: "" });

  // ফায়ারবেস থেকে রিয়েল-টাইম ডেটা লোড
  useEffect(() => {
    const donorsCollection = collection(db, "donors");
    const unsubscribe = onSnapshot(donorsCollection, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonors(list);
    });
    return () => unsubscribe();
  }, []);

  // নতুন ডোনর রেজিস্ট্রেশন হ্যান্ডলার
  const handleRegister = async (newDonor) => {
    try {
      const donorsCollection = collection(db, "donors");
      await addDoc(donorsCollection, newDonor);
      alert("Donor Registered Successfully!");
    } catch (error) {
      console.error("Error adding donor: ", error);
      alert("Something went wrong!");
    }
  };

  // ডোনর ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    const password = prompt("Admin Security: Enter Password to Delete Donor");
    if (password === "naim123") {
      try {
        const donorDocRef = doc(db, "donors", id);
        await deleteDoc(donorDocRef);
        alert("Donor removed successfully.");
      } catch (error) {
        console.error("Error deleting donor: ", error);
        alert("Could not delete donor!");
      }
    } else {
      alert("Access Denied: Incorrect Password");
    }
  };

  // AI স্কোর ম্যাচিং লজিক (দূরত্ব ও এলাকার ওপর ভিত্তি করে)
  const matchedDonorsData = useMemo(() => {
    if (!requestedBloodData.bloodGroup) return [];

    // বরগুনার উপজেলাগুলোর একটি আনুমানিক দূরত্ব বা জোনিং লিস্ট
    const bargunaUpazilas = ["বরগুনা সদর", "আমতলী", "তালতলী", "পাথরঘাটা", "বেতাগী", "বামনা", "barguna sadar", "amtali", "taltali", "patharghata", "betagi", "bamna"];

    return donors.map(donor => {
      let score = 0;

      // ১. ব্লাড গ্রুপ মিললে বেস স্কোর ৫০%
      if (donor.bloodGroup === requestedBloodData.bloodGroup) {
        score += 50;
      } else {
        return { ...donor, score: 0 }; // ব্লাড গ্রুপ না মিললে বাদ
      }

      const dDistrict = String(donor.district || "").toLowerCase().trim();
      const rDistrict = String(requestedBloodData.district || "").toLowerCase().trim();
      const dUpazila = String(donor.upazila || "").toLowerCase().trim();
      const rUpazila = String(requestedBloodData.upazila || "").toLowerCase().trim();

      if (rDistrict) {
        if (dDistrict === rDistrict) {
          // জেলা মিললে ৩০% বোনাস
          score += 30;

          // ২. জেলা মেলার পর যদি উপজেলাও হুবহু মিলে যায় (কাছাকাছি দূরত্ব)
          if (rUpazila && dUpazila === rUpazila) {
            score += 20; // মোট ১০০%
          } 
          // ৩. উপজেলা আলাদা কিন্তু দুজনেই বরগুনার ভেতরে (মাঝারি দূরত্ব)
          else if (rUpazila && bargunaUpazilas.includes(dUpazila) && bargunaUpazilas.includes(rUpazila)) {
            score += 10; // মোট ৯০% (কাছাকাছি উপজেলার জন্য)
          }
        }
      }

      return { ...donor, score };
    }).filter(donor => donor.score > 0).sort((a, b) => b.score - a.score);
  }, [donors, requestedBloodData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-10">
      <Header />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="space-y-8 lg:col-span-1">
          <DonorRegistry onRegister={handleRegister} bloodGroups={bloodGroups} />
          <DonorFind setRequestedBloodData={setRequestedBloodData} bloodGroups={bloodGroups} donors={donors} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <AiScoreResult matchedDonors={matchedDonorsData} />
          <DonorList donors={donors} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;