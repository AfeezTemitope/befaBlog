import PlayerCreation from "./PlayerCreation.tsx";
import AdminSchedule from "./AdminSchedule.tsx";

const AdminPanel =()=> {
    return(
        <div className="text-center items-center justify-center">

            <AdminSchedule/>
            <PlayerCreation/>

        </div>
    )
}
export default AdminPanel
