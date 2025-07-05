import React, { useState } from 'react'

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

  const handleEdit = (entry: Ientry) => {
    setEditing({ ...entry })
    setModalOpen(true)
  }

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

  const handleSave = () => {
    if (!editing) return
    setProgressData((prev) =>
      prev.map((item) => (item.id === editing.id ? editing : item))
    )
    setModalOpen(false)
  }

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
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-400 text-white text-lg font-semibold shadow-md hover:scale-105 transition">
            ➕ Log New Entry
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && editing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Edit Entry</h3>

            <label className="block mb-2 text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={editing.date}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Exercises</label>
            <input
              type="text"
              name="exercises"
              value={editing.exercises}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Protein Intake (g)</label>
            <input
              type="number"
              name="protein"
              value={editing.protein}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Progress
