import React, {useEffect} from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setHide, data, setUpdateData,setData }) => {
  // const data = [
  //     {
  //         title: "do assign",
  //     desc: "Assignement",
  //     status: "Completed"
  //     },
  //     {
  //         title: "project",
  //         desc: "for me",
  //         status: "InComplete"
  //     },
  // ];

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getAllTask = () =>{
    const fetch = async () => {
        const response = await axios.get("http://localhost:8000/api/v2/get-all-tasks", {headers});
        setData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")) {
        fetch()
    }
    // fetch();
};

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      // alert(response.data.message);
      getAllTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImp = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      // alert(response.data.message);
      getAllTask();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v2/delete-task/${id}`,
        { headers }
      );
      // alert(response.data.message);
      getAllTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, title, desc) => {
    setHide("fixed");
    setUpdateData({id: id, title: title, desc: desc});
    getAllTask();
  }

  


  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div className="flex flex-col justify-between border bg-gray-700 rounded-sm p-4">
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-400" : "bg-green-300"
                } p-2 rounded w-3/6`}
                onClick={() => handleComplete(items._id)}
              >
                {items.complete === true ? "Completed" : "InComplete"}
              </button>
              <div className="text-white p-2 w-3/6 text-xl font-semibold flex justify-around">
                <button onClick={() => handleImp(items._id)}>
                  {items.important === false ? (
                    <FaStarHalfAlt />
                  ) : (
                    <FaStar className="text-yellow-400" />
                  )}
                </button>
               {home !== "false" && <button onClick={()=>handleUpdate(items._id, items.title, items.desc)}>
                  <MdEdit />
                </button> }
                <button onClick={()=>deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setHide("fixed")}
        >
          <IoAddCircle className="text-5xl" />
          <h2 className="text-gray-300 text-2xl mt-4"> Add task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
