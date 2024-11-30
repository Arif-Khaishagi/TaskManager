import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Form from "../components/Form";
import { IoAddCircleOutline } from "react-icons/io5";
import axios from "axios";


const AllTasks = () => {
    const [hide, setHide] = useState("hidden");
    const [Data, setData] = useState();
    const [UpdateData, setUpdateData] = useState({
        id: "",
        title: "",
        desc: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(()=>{
        const fetch = async () => {
            const response = await axios.get("http://localhost:8000/api/v2/get-all-tasks", {headers});
            setData(response.data.data);
        };
        if(localStorage.getItem("id") && localStorage.getItem("token")) {
            fetch()
        }
        // fetch();
    }, []);



    return(
        <>
        <div>
            <div className="w-full flex justify-end px-4 py-2">
            <button onClick={()=>setHide("fixed")}>
                <IoAddCircleOutline className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
            </button>
            </div>
        </div>
        <div>
            { Data && <Cards home={"true"} setData={setData} setHide={setHide} data={Data.tasks} setUpdateData={setUpdateData}/> }
        </div>
        <Form hide={hide} setHide={setHide} UpdateData={UpdateData} setUpdateData={setUpdateData} setHomeData={setData}/>
        </>
    )
}

export default AllTasks;