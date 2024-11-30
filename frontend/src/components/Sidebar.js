import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdNotificationImportant } from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { BiTaskX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const Sidebar = () => {
const dispatch = useDispatch();
const history = useNavigate();


    const data = [
        {
            title: "All tasks",
            icons: <FaTasks />,
            link: "/",
        },
        {
            title: "Important tasks",
            icons: <MdNotificationImportant />,
            link: "/importantTasks"
        },
        {
            title: "Completed tasks",
            icons: <RiTaskFill />,
            link: "/completedTasks"
        },
        {
            title: "Incompleted tasks",
            icons: <BiTaskX />,
            link: "/incompletedTasks"
        },
    ];

    const [Data, setData] = useState();

    const logout = () => {
        localStorage.clear("id");
        localStorage.clear("token");
        dispatch(authActions.logout());
        history("/signup")
    };

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
            {Data && <div>
            <h2 className="text-xl font-semibold">{Data.username}</h2>
            <h4 className="mb-1 text-gray-400">{Data.email}</h4>
            <hr />
            </div>}
            <div>
                {data.map((items, i)=>(
                    <Link to={items.link} key={i} className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300">{items.icons} &nbsp;&nbsp;{items.title}</Link>
                ))}
            </div>
            <div>
                <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>LOG OUT</button>
            </div>
            </>
    )
}

export default Sidebar;