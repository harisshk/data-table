import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader(props) {
    const { open } = props

    return (
        <div>
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
                &nbsp;&nbsp;&nbsp; Loading...
            </Backdrop>
        </div>
    )
}