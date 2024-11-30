import React, {useState, useEffect} from "react";
import axios from "axios";
import Cards from "../components/Cards";

const Incomplete = () => {

    const [Data, setData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      useEffect(()=>{
        const fetch = async () => {
            const response = await axios.get("http://localhost:8000/api/v2/get-incomplete-tasks", {headers});
            setData(response.data.data);
        };

        fetch();
    });
    return(
        <div>
        <Cards home={"false"} data={Data}/>
    </div>
    )
}

export default Incomplete;