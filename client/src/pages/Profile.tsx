import { useEffect, useState } from "react"
import type { IUserProfile } from "../interfaces/profile";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { apiUrl } from "../utils";
import { Link } from "react-router-dom";


function Profile() {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState<Partial<IUserProfile>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    useEffect( () => {
        const getProfile = async () => {
            try{
              console.log('get profile has been called')
            const response = await axios.get(apiUrl+'profile', {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            console.log('We recieved an appropriate response: ', response.data);
            setUser(response.data.data);
            setFormData(response.data.data);
        }catch(error){
            console.log('There was an error in fetching user profile', error);
        }
        }
        getProfile();
      
    }, [])

    const handleSave = async () => {
        try{
        const response = await axios.put(apiUrl+'profile', formData);
        if(response){
            console.log('data updated successfully');
        }
        setUser(response.data.profile);
        setEditMode(false);
        } catch (error){
            console.error('There was an error in updating the information', error);
        }

    }

    if(!user) return <div className="text-center mt-10">
        Loading...
    </div>

return (
  <div className="min-h-screen w-full bg-black text-white flex flex-col">
    {/* Top bar */}
    <div className="flex items-center p-4">
      <Link to="/home">
        <IoArrowBackOutline className="text-red-500 hover:text-red-700 text-2xl" />
      </Link>
      <h1 className="flex-1 text-center text-3xl font-bold">User Profile</h1>
    </div>

    {/* Profile content */}
    <div className="flex flex-col items-center flex-1 px-6 pb-10">
      <img
        src={user.profileImage || "/default-avatar.webp"}
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover shadow-lg"
      />

      {editMode ? (
        <div className="mt-6 w-full max-w-md space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full text-gray-400"
            placeholder="Name"
          />
          <textarea
            name="bio"
            rows={3}
            value={formData.bio || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full text-gray-400"
            placeholder="Bio"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full text-gray-400"
            placeholder="Phone"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="text-gray-400 underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center space-y-2">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-300">{user.bio || "No bio available"}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400">{user.phone || "No phone provided"}</p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  </div>
);

}

export default Profile