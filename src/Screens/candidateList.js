import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CandidateTable from "../components/Table";
import { Button } from '@mui/material';


const CandidateList = () => {

    const navigate = useNavigate();



    const [snackBarState, setSnackBarState] = useState({
        isOpen: false,
        message: ""
    });
    const editUserHandler = (id) => {
        navigate(`candidate/edit/${id}`);
        // window.open(`edit/${id}`)
    }

    return (
        <div className="homeContainer">



            <CandidateTable
                users={[{
                    id: 12, name: "hari", email: "hk@gh.cd"
                }]}
            // deleteUserHandler={deleteUserHandler}
            // editUserHandler={editUserHandler}
            />
            <div>
                <Button onClick={()=>navigate("/candidate/create")} size="medium">Add new Candidate</Button>

            </div>
        </div>
    )
}

export default CandidateList