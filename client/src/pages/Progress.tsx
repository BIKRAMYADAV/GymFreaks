import React, { useState } from 'react'
import EditProgress from '../components/EditProgress'
import NewEntry from '../components/NewEntry'
import { useEffect } from 'react'
import axios from 'axios'


interface Ientry {
  id: number
  date: string
  exercises: string
  protein: number
}

const progressDataInitial: Ientry[] = [
  { id: 1, date: '2025-07-01', exercises: 'Push-ups, Pull-ups', protein: 80 },
  { id: 2, date: '2025-07-02', exercises: 'Squats, Lunges', protein: 90 },
  { id: 3, date: '2025-07-03', exercises: 'Deadlifts, Bench Press', protein: 100 },
]




function Progress() {
  const [editing, setEditing] = useState<Ientry | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [progressData, setProgressData] = useState<Ientry[]>(progressDataInitial)
const [newEntryModalOpen, setNewEntryModalOpen] = useState(false);
const [newEntry, setNewEntry] = useState<Ientry>({
  id: Date.now(),
  date: '',
  exercises: '',
  protein: 0,
});

const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setNewEntry((prev) => ({
    ...prev,
    [name]: name === 'protein' ? parseInt(value) : value,
  }));
};

const handleAddNewEntry = async () => {
  if (!newEntry.date || !newEntry.exercises) return;

  try {
    const response = await axios.post('http://localhost:3000/add-data', {
      date: newEntry.date,
      exercises: newEntry.exercises,
      protein: newEntry.protein,
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
       const fetchedData = await axios.get('http://localhost:3000/get-data');
       console.log('fetched data is : ', fetchedData);
       setProgressData(fetchedData.data.data);
      } catch(error){
        console.error('There was an error in fetching the progress data', error);
      }
    }
    fetchProgress();

  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Daily Progress</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4">Date</th>
                <th className="p-4">Exercises</th>
                <th className="p-4">Protein Intake (g)</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((entry) => (
                <tr key={entry.id} className="border-t hover:bg-gray-50">
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Button to log a new entry */}
        <div className="flex justify-center mt-8">
         <button
  onClick={() => setNewEntryModalOpen(true)}
  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-white text-lg font-semibold shadow-md hover:scale-105 transition"
>
  ➕ Log New Entry
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
