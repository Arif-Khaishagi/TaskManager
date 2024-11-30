import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GiCancel } from "react-icons/gi";

function Form({hide, setHide, UpdateData,setHomeData, setUpdateData}) {
  const [Data, setData] = useState({title:"", desc:""})

  useEffect(()=>{
    setData({title: UpdateData.title, desc: UpdateData.desc})
  }, [UpdateData]);

  const change = (e) => {
    const {name, value} = e.target;
    setData({ ...Data, [name]: value});
  }

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async () => {
    if(Data.title === "" || Data.desc === ""){
      alert("All fields are required");
    }else{
      await axios.post("http://localhost:8000/api/v2/create-task",Data, {headers,})
      setData({title:"", desc:""});
      setHide("hidden");

    }
    getAllTask();
  }

  const closeSubmitModal = async () => {
    setHide("hidden");
    setData({title:"", desc:""});
    setUpdateData({id:"", title:"", desc:""});
    getAllTask();

  }

  const getAllTask = () =>{
    const fetch = async () => {
        const response = await axios.get("http://localhost:8000/api/v2/get-all-tasks", {headers});
        setHomeData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")) {
        fetch()
    }
    // fetch();
};

  const updateTask = async() => {
    if(Data.title=== "" || Data.desc===""){
      alert("All fields are required");
    }else{
      await axios.put(`http://localhost:8000/api/v2/update-task/${UpdateData.id}`,Data, {headers,});
      setUpdateData({id:"", title:"", desc:"",})
      setData({title:"", desc:""});
      setHide("hidden");
    }
  }

  return (
  <>
  <div className={`${hide} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
  <div className={`${hide} top-0 left-0 flex items-center justify-center h-screen w-full`}>
    <div className="w-2/6 bg-gray-900 p-4 rounded">
    <div className='flex justify-end mb-3'>
        <button className='text-2xl' onClick={()=>{closeSubmitModal()}}>
        <GiCancel />
        </button>
    </div>
    <input 
    type='text'
    placeholder='Title'
    name='title'
    className='px-3 py-2 rounded w-full bg-gray-700'
    value={Data.title}
    onChange={change}
    />
    <textarea 
    name='desc'
    cols="30"
    rows="10"
    placeholder='Enter your description...'
    value={Data.desc}
    onChange={change}
    className='px-3 py-2 rounded w-full bg-gray-700 my-4'>
    </textarea>
    {UpdateData.id === "" ?(<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={submitData}>
        Submit
    </button>):(<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={updateTask}>
        Update
    </button>)}
    
    
    </div>
  </div>

  </>
  )
}

export default Form