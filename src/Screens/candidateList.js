import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateTable from "../components/Table";
import { Button } from '@mui/material';
import { editCandidateData, getAllCandidates } from "../services/candidateService";
import { AlertSnackbar } from "../components/Snackbar";
import Loader from "../components/Loader";
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from "../components/Dialog/DeleteDialog";

const CandidateList = () => {

    const navigate = useNavigate();

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
    const fetchData = async () => {
        setIsLoading(true)
        const response = await getAllCandidates()
        const { success, data } = response
        if (success) {
            setCandidates(data)
        }
        else {
            setSnackbarOpen(false)
            setSnackbarInfo({
                message: "Cannot fetch data",
                variant: "error",
            })
        }
        setIsLoading(false)
    }
    const deleteHandler = async (id) => {
        setIsLoading(true)
        const response = await editCandidateData(
            id, { isDeleted: true }
        )
        const { success } = response
        if (success) {
            fetchData()
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: "Data deleted successfully",
                variant: "success",
            })
        }
        else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: "Data cannot be deleted",
                variant: "error",
            })
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="homeContainer">
            <p>Total Candidates : {candidates?.length}</p>
            <CandidateTable
                users={candidates}
                deleteHandler={ (data)=>{
                    console.log(data)
                    setDeleteAction({ isDeleteModalOpen: true, data })}}
                editHandler={editUserHandler}
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
            <Loader open={isLoading} />
            <DeleteDialog data={deleteAction?.data} open={deleteAction?.isDeleteModalOpen} onDelete={(id) => {
                deleteHandler(id)
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