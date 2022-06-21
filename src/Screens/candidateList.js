import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// redux
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/action/profile'

//Components
import { AlertSnackbar } from "../components/Snackbar";
import CandidateTable from "../components/Table";
import Loader from "../components/Loader";
import DeleteDialog from "../components/Dialog/DeleteDialog";

//Services
// import { editCandidateData, getAllCandidates } from "../services/candidateService";
import { gql, useMutation, useQuery } from "@apollo/client";
import { DELETE_CANDIDATE, GET_ALL_CANDIDATES } from "../constants";

const CandidateList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteUser, { loading:deleteLoading }] = useMutation(DELETE_CANDIDATE, 
        {
            onCompleted:()=>{
                setSnackbarInfo({
                    message: `Candidate deleted successfully`,
                    variant: "success",
                });
                setSnackbarOpen(true);
                refetch()
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/candidate/list', { replace: true });
                }, 1000);
            },
            onError:()=>{
                setSnackbarInfo({
                    message: `Candidate cannot be deleted `,
                    variant: "error",
                });
                setSnackbarOpen(true)
                setIsLoading(false)
            }
        });
    const [candidates, setCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState({
        message: "",
        variant: "",
    });
    const [deleteAction, setDeleteAction] = useState({
        isDeleteModalOpen: false,
        data: {}
    })
    const editUserHandler = (id) => {
        navigate(`/candidate/edit/${id}`);
    }

    const { loading, data, refetch } = useQuery(GET_ALL_CANDIDATES)
    const deleteHandler = async (id) => {
        deleteUser({variables:{
            id
        }})
    }
    return (
        <div className="homeContainer">
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        dispatch(setProfile({}))
                        localStorage.clear()
                        navigate('/')
                    }} size="medium">Logout</Button>
            </div>
            <p>Total Candidates : {data?.candidates?.length}</p>
            <CandidateTable
                users={data?.candidates || []}
                deleteHandler={(data) => {
                    console.log(data)
                    setDeleteAction({ isDeleteModalOpen: true, data })
                }}
                editHandler={editUserHandler}
                statusHandler={(id, payload) => {
                    deleteHandler(id, payload, 'Updated')
                }}
            />
            <br />
            <div>
                <Button startIcon={<AddIcon />} onClick={() => navigate("/candidate/create")} size="medium">Add new Candidate</Button>
            </div>


            <AlertSnackbar
                open={snackbarOpen}
                message={snackbarInfo.message}
                variant={snackbarInfo.variant}
                handleClose={() => setSnackbarOpen(false)}
            />
            <Loader open={loading || deleteLoading} />
            <DeleteDialog data={deleteAction?.data} open={deleteAction?.isDeleteModalOpen} onDelete={(id) => {
                deleteHandler(id, { isDeleted: true }, "Deleted")
                setDeleteAction({
                    isDeleteModalOpen: false,
                    data: {}
                })
            }} onClose={() => setDeleteAction({
                isDeleteModalOpen: false,
                data: {}
            })} />
        </div>
    )
}

export default CandidateList