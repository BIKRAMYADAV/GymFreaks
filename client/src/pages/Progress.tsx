import React, { useState } from 'react'
import EditProgress from '../components/EditProgress'
import NewEntry from '../components/NewEntry'
import { useEffect } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import axios from 'axios'
import { Link } from 'react-router-dom';


interface Ientry {
  id: number
  date: string
  exercises: string
  protein: number
}
//how I fixed the stale state issue:
//Even though I removed token from the local storage, Progress.tsx was still using the old token
//as it was stored in constant, needing to refresh
//so I am not going to store instead fetch dynamically instead
function Progress() {
  const [editing, setEditing] = useState<Ientry | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [progressData, setProgressData] = useState<Ientry[]>([]);
const [newEntryModalOpen, setNewEntryModalOpen] = useState(false);
const [newEntry, setNewEntry] = useState<Ientry>({
  id: Date.now(),
  date: '',
  exercises: '',
  protein: 0,
});
const [loading, setLoading] = useState(true);



//functions start from here
const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setNewEntry((prev) => ({
    ...prev,
    [name]: name === 'protein' ? parseInt(value) : value,
  }));
};

const handleAddNewEntry = async () => {
  console.log('add data is hit')
  if (!newEntry.date || !newEntry.exercises) return;
 
  try {
    const response = await axios.post('http://localhost:3000/add-data', {
      date: newEntry.date,
      exercises: newEntry.exercises,
      protein: newEntry.protein,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Add the saved entry to state
    setProgressData((prev) => [...prev, response.data.data]);

    // Reset input
    setNewEntry({
      id: Date.now(),
      date: '',
      exercises: '',
      protein: 0,
    });

    setNewEntryModalOpen(false);
  } catch (error) {
    console.error('There was an error in adding the new entry', error);
  }
};




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditing((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === 'protein' ? parseInt(value) : value,
          }
        : null
    )
  }

      const handleEdit = (entry: Ientry) => {
    setEditing({ ...entry })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!editing) return
    setProgressData((prev) =>
      prev.map((item) => (item.id === editing.id ? editing : item))
    )
    setModalOpen(false)
  }

  //useeffect
  useEffect(() => {
    const fetchProgress = async () => {
      try{
       const fetchedData = await axios.get('http://localhost:3000/get-data',{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
       });
       console.log('fetched data is : ', fetchedData);
       setProgressData(fetchedData.data.data);
      } catch(error){
        console.error('There was an error in fetching the progress data', error);
      } finally{
        setLoading(false);
      }
    }
    fetchProgress();
  }, [])


  return (
    
    <div className="min-h-screen bg-black py-10 px-6 ">
      <div className="max-w-4xl mx-auto bg-black shadow-lg rounded-lg p-6">
        <Link to='/'>
        <IoArrowBackOutline className='text-red-500 hover:text-red-700 text-2xl'/>
        </Link>
        

        <h2 className="text-3xl font-bold mb-6 text-center text-white">Daily Progress</h2>
      
            
        
      
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-white text-black">
                <th className="p-4">Date</th>
                <th className="p-4">Exercises</th>
                <th className="p-4">Protein Intake (g)</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
  {loading ? (
    <tr>
      <td colSpan={4} className="p-4 text-center">Loading progress data...</td>
    </tr>
  ) : progressData.length === 0 ? (
    <tr>
      <td colSpan={4} className="p-4 text-center">No progress data found.</td>
    </tr>
  ) : (
    progressData.map((entry) => (
      <tr key={entry.id} className="border-t">
        <td className="p-4">{entry.date}</td>
        <td className="p-4">{entry.exercises}</td>
        <td className="p-4">{entry.protein}</td>
        <td className="p-4">
          <button
            onClick={() => handleEdit(entry)}
            className="text-blue-600 hover:text-blue-800 font-medium transition"
          >
            ✏️ Edit
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>

        {/* Button to log a new entry */}
        <div className="flex justify-center mt-8">
         <button
  onClick={() => setNewEntryModalOpen(true)}
  className='bg-red-500 text-white px-2 h-7 rounded hover:bg-red-600 transition'
>
   Log New Entry
</button>

        </div>
      </div>
      {newEntryModalOpen && (
  <NewEntry
    newEntry={newEntry}
    handleChange={handleNewChange}
    handleAddNewEntry={handleAddNewEntry}
    setNewEntryModalOpen={setNewEntryModalOpen}
  />
)}


      {/* Modal */}
      {modalOpen && editing && (
         <EditProgress
    editing={editing}
    handleChange={handleChange}
    handleSave={handleSave}
    setModalOpen={setModalOpen}
  />
      )}
    </div>
  )
}

export default Progress
