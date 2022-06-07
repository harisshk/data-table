import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

//Components
import { AlertSnackbar } from "../components/Snackbar";
import CandidateTable from "../components/Table";
import Loader from "../components/Loader";
import DeleteDialog from "../components/Dialog/DeleteDialog";

//Services
import { editCandidateData, getAllCandidates } from "../services/candidateService";

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
    const deleteHandler = async (id, payload, text) => {
        setIsLoading(true)
        const response = await editCandidateData(
            id, payload
        )
        const { success } = response
        if (success) {
            fetchData()
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Data ${text} successfully`,
                variant: "success",
            })
        }
        else {
            setSnackbarOpen(true)
            setSnackbarInfo({
                message: `Data cannot be  ${text}`,
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
            <Loader open={isLoading} />
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