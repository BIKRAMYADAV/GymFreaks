export interface Ientry {
  id: number
  date: string
  exercises: string
  protein: number
}

export interface INewEntryProps {
  newEntry: Ientry;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNewEntry: () => void;
  setNewEntryModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface IEditProgressProps {
    editing:Ientry;
    handleChange: (e:any) => void;
    handleSave: () =>  void;
    setModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}
