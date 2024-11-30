import React, {useEffect, useState} from "react";
import axios from "axios";
import Cards from "../components/Cards";

const Important = () => {
    const [Data, setData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      useEffect(()=>{
        const fetch = async () => {
            const response = await axios.get("http://localhost:8000/api/v2/get-imp-tasks", {headers});
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

export default Important;