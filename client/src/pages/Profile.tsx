import { useEffect, useState } from "react"
import type { IUserProfile } from "../interfaces/profile";
import axios from "axios";
import { apiUrl } from "../utils";


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
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.profileImage || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <textarea
              name="bio"
              rows={3}
              value={formData.bio || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Bio"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Phone"
            />
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="text-gray-500 underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.bio || "No bio available"}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone || "No phone provided"}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile