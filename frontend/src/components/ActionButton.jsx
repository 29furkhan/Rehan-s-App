import axios from 'axios';
import ReadModal from './ReadModal';

const ActionButton = ({ core_url = "", patient = {}, primary_key = "" }) => {
    const handleDelete = async () => {
        const msg = `Are you sure you want to delete ${patient.name}'s data?`
        const isConfirmed = window.confirm(msg)

        if (isConfirmed) {
            try {
                const res = await axios.delete(core_url + "/api/delete", { params: { aadhar: primary_key } });
                if (res.data.status === "OK") {
                    window.alert(res.data.message)
                    window.location.reload()
                }
                else {
                    window.alert("Error in deleting the data!")
                }
            }
            catch (e) {
                console.log(e.message)
            }
        }
        else {
            console.log("Deletion rejected!")
        }
    }

    return (
        <>
            <button
                id="openModalBtn"
                className="btn btn-secondary action-btn-app"
                data-bs-toggle="modal"
                data-bs-target={"#" + patient.aadhar + "_patient"}
            >
                <i className="fa-regular fa-eye"></i>
            </button >

            <ReadModal
                //unique id made sure that modal takes dynamic data
                modal_id={patient.aadhar + "_patient"}
                patient={patient}
            />

            <button
                onClick={handleDelete}
                className="btn btn-danger action-btn-app"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete the row"
            >
                <i className="fas fa-trash"></i>
            </button>
        </>
    )
}

export default ActionButton;