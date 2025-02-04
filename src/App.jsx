import { useState } from 'react';
import './App.css';
import { IoAdd, IoClose, IoSettings, IoSearch, IoCheckmark, IoList, IoTrash, } from 'react-icons/io5';
import { MdMoreHoriz } from "react-icons/md";
import Btn from './components/Btn';

const App = () => {
  const blankNote = {
    text: '',
    createdon: null,
    bgcolor: '#feff9c',
    view: true,
    options: false,
  };
  const colorArr = ['#feff9c', '#fff740', '#7afcff', '#ff65a3', '#e4eeff', '#d2ccf2', '#c8a8d5'];
  const [notes, setNotes] = useState([]);
  const [listview, setListView] = useState(true);
  const [search, setSearch] = useState('');
  const [filternotes, setFilterNotes] = useState([]);

  const addNote = (val) => {
    let newNotes = [...notes];
    val.createdon = new Date().toDateString();
    newNotes.push(val);
    setNotes(newNotes);
  };

  const updateNote = (val, i) => {
    let newNotes = [...notes];
    newNotes[i].text = val;
    setNotes(newNotes);
  };

  const updateColor = (color, noteIndex) => {
    let newNotes = [...notes];
    newNotes[noteIndex].bgcolor = color;
    setNotes(newNotes);
  };

  const updateView = (i) => {
    let newNotes = [...notes];
    newNotes[i].view = !newNotes[i].view;
    setNotes(newNotes);
  };

  const updateOpt = (i) => {
    let newNotes = [...notes];
    newNotes[i].options = !newNotes[i].options;
    setNotes(newNotes);
  };

  const searchNote = () => {
    let newNotes = [...notes];
    let filterData = newNotes.filter((note) => note.text.includes(search));
    setFilterNotes(filterData);
  };

  const deleteNote = (index) => {
    let newNotes = [...notes];
    newNotes.splice(index,1);
    setNotes(newNotes);
  };

  const openAllNotes = () => {
    let newNotes = notes.map(note => ({ ...note, view: true }));
    setNotes(newNotes);
  };

  return (
    <div className="flex p-5 flex-row">
      <div className={`noteslist ${listview ? 'scale-100 w-[280px] h-full mr-2 bg-[#f1f1f1] border' : 'scale-0 w-0 h-0'} flex-shrink-0 rounded overflow-hidden transition-all linear duration-700`}>
        <div className="toolbar flex justify-between bg-black bg-opacity-10 items-center">
          <Btn click={() => addNote(blankNote)} icon={<IoAdd size={20} />} />
          <div className="flex">
            <Btn click={() => addNote()} icon={<IoSettings size={18} />} />
            <Btn click={() => setListView(!listview)} icon={<IoClose size={20} />} />
          </div>
        </div>
        <h1 className="text-2xl p-2">Sticky Notes</h1>
        <div className="flex m-2 bg-slate-300 justify-center items-center">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent w-full p-1 focus:visible-none" />
          <Btn click={() => searchNote()} icon={<IoSearch size={20} />} />
        </div>

        {search == "" && notes.length > 0 && notes.map((note, noteIndex) => (
            <div key={noteIndex} className="m-2 relative cursor-pointer" onClick={() => updateView(noteIndex)}>
              <div className={`noteview ${note.view ? 'active' : ''} flex flex-col w-full p-2`} style={{ backgroundColor: `${note.bgcolor}` }}>
                <div className="flex justify-end">
                  <span className="text-xs">{note.createdon}</span>
                </div>
                <textarea value={note.text} readOnly placeholder="Take a note..." className="w-full resize-none cursor-pointer bg-transparent focus:visible:outline-none" name="" id="" cols="30" rows="2"></textarea>
              </div>
            </div>
          ))}

          {search !== "" && filternotes.length > 0 && filternotes.map((note, noteIndex) => (
              <div key={noteIndex} className="m-2 relative cursor-pointer" onClick={() => updateView(noteIndex)}>
                <div className={`noteview ${note.view ? 'active' : ''} flex flex-col w-full p-2`} style={{ backgroundColor: `${note.bgcolor}` }}>
                  <div className="flex justify-end">
                    <span className="text-xs">{note.createdon}</span>
                  </div>
                  <textarea value={note.text} readOnly placeholder="Take a note..." className="w-full resize-none cursor-pointer bg-transparent focus:visible:outline-none" name="" id="" cols="30" rows="2"></textarea>
                </div>
              </div>
            ))} 
        <button onClick={openAllNotes} className="flex jusitfy-start items-center hover:bg-slate-200 py-1 px-2">
          <IoList className='mr-2'></IoList>Open All Notes
        </button>
      </div>
      <div className="notesview w-full">
        {notes.length > 0 && notes.map((note, noteIndex) => (
          note.view ? 
          <div key={noteIndex} className="flex flex-col rounded overflow-hidden w-[400px] pb-1 mb-2" style={{ backgroundColor: `${note.bgcolor}` }}>
            <div className="toolbar flex justify-between bg-black bg-opacity-10 items-center">
              <Btn click={() => addNote(blankNote)} icon={<IoAdd size={20} />} />
              <div className="flex">
                <Btn click={() => updateOpt(noteIndex)} icon={<MdMoreHoriz size={18}/>}></Btn>
                <Btn click={() => updateView(noteIndex)} icon={<IoClose size={20} />}></Btn>
              </div>
            </div>
            {note.options &&
            <div className="toolarea flex flex-col bg-gray-100">
             <div className='colorarea w-full flex'>
              {colorArr.map((color, colorIndex) => (
                <span onClick={() => updateColor(color, noteIndex)} key={colorIndex} className="flex flex-row w-full h-8 justify-center items-center cursor-pointer" style={{ backgroundColor: color }}>
                  {note.bgcolor === color ? <IoCheckmark size={20}></IoCheckmark> : <></>}
                </span>
              ))}
            </div>

            <button onClick={() => setListView(!listview)} className='flex jusitfy-start items-center hover:bg-slate-200 py-1 px-2'>
              <IoList className='mr-2'></IoList>Notes List
            </button>
            <button onClick={() => deleteNote(noteIndex)} className='flex jusitfy-start items-center hover:bg-slate-200 py-1 px-2'>
              <IoTrash className='mr-2'></IoTrash>Delete List
            </button>
            </div>
            }
            <textarea value={note.text} onChange={(e) => updateNote(e.target.value, noteIndex)} placeholder="Take a note..." className="w-full bg-transparent focus-visible:outline-none p-2" name="" id="" cols="30" rows="4"></textarea>
          </div> : null
        ))}
      </div>
    </div>
  );
};

export default App;
