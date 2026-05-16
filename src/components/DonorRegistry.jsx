import { useForm } from "react-hook-form";
import { useState } from "react";

const DonorRegistry = ({ bloodGroups, onRegister }) => {
    const { register, handleSubmit, reset } = useForm();
    const [base64Image, setBase64Image] = useState("");

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setBase64Image(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        onRegister({ ...data, photo: base64Image });
        reset();
        setBase64Image("");
        alert("Registration Complete!");
    };

    return (
        <div className="card bg-slate-900 p-6 shadow-xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Donor Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <input type="text" placeholder="Your Full Name" className="input input-bordered bg-slate-800 text-white w-full border-slate-700" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("name", {required: true})} />
                
                <select className="select select-bordered bg-slate-800 text-white w-full border-slate-700" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("bloodGroup", {required: true})} defaultValue="">
                    <option value="" disabled>Blood Group</option>
                    {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                
                <input type="text" placeholder="Division (e.g. Barisal)" className="input input-bordered bg-slate-800 text-white w-full border-slate-700" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("division", {required: true})} />
                <input type="text" placeholder="District (e.g. Barguna)" className="input input-bordered bg-slate-800 text-white w-full border-slate-700" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("district", {required: true})} />
                <input type="text" placeholder="Upazila/Area" className="input input-bordered bg-slate-800 text-white w-full border-slate-700 md:col-span-2" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("upazila", {required: true})} />
                
                <input type="text" placeholder="WhatsApp No (e.g. 017...)" className="input input-bordered bg-slate-800 text-white w-full border-slate-700 md:col-span-2" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("phone", {required: true})} />
                
                <div className="relative w-full">
                    <span className="absolute left-3 top-[-10px] bg-slate-900 px-2 text-[11px] text-red-400 font-semibold z-10 rounded">Last Donation Date</span>
                    <input type="date" className="input input-bordered bg-slate-800 text-white w-full border-slate-700 text-sm" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} {...register("lastDonationDate")} />
                </div>

                <div className="relative w-full">
                    <span className="absolute left-3 top-[-10px] bg-slate-900 px-2 text-[11px] text-blue-400 font-semibold z-10 rounded">Profile Photo</span>
                    <input type="file" accept="image/*" className="file-input file-input-bordered file-input-primary bg-slate-800 text-white w-full border-slate-700" style={{ backgroundColor: '#1e293b', color: '#ffffff' }} onChange={handleImage} />
                </div>

                <button className="btn btn-primary md:col-span-2 shadow-lg text-white">Submit Profile</button>
            </form>
        </div>
    );
};

export default DonorRegistry;