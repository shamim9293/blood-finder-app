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

    const dDistrict = String(donor.district).toLowerCase().trim();
    const rDistrict = String(requestedBloodData.district).toLowerCase().trim();
    const dUpazila = String(donor.upazila).toLowerCase().trim();
    const rUpazila = String(requestedBloodData.upazila).toLowerCase().trim();

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
      } else {
        // জেলা আলাদা হলে কোনো অতিরিক্ত স্কোর পাবে না (দূরত্ব বেশি)
        score += 0; 
      }
    }

    return { ...donor, score };
  }).filter(donor => donor.score > 0).sort((a, b) => b.score - a.score);
}, [donors, requestedBloodData]);