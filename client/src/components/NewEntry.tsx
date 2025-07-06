import type { INewEntryProps } from '../interfaces/edit';



function NewEntry({newEntry,
  handleChange,
  handleAddNewEntry,
  setNewEntryModalOpen}:INewEntryProps) {
  return (
    <div>
           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Log New Entry</h3>
        <label className="block mb-2 text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Exercises</label>
        <input
          type="text"
          name="exercises"
          value={newEntry.exercises}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Protein Intake (g)</label>
        <input
          type="number"
          name="protein"
          value={newEntry.protein}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setNewEntryModalOpen(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNewEntry}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NewEntry