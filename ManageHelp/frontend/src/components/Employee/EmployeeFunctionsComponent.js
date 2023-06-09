// Forms
import DayOffRequestForm from './DayOffRequestForm'
import ShiftRequestOffForm from './ShiftRequestOffForm'
import EmployeeCoverList from '../Workspace/EmployeeCoverList'
import EmpApproveRejectTradeForm from './EmpApproveTradeRequest'
import TaskList from './TaskList'
import AnnouncementList from './AnnouncementList'

// context and effects
import '../../index.css';
import { Link } from 'react-router-dom'

//Collapsing UI Components
import Collapsible from 'react-collapsible'
import { BsChevronDown } from "react-icons/bs"
import Schedule from '../../pages/Schedule'

const EmployeeFunctionsComponent = ({workspace, user, render_func}) => {
    //console.log("wid in empfunc: " + workspace._id)
    //console.log("uid in empfunc: " + user._id)
    return (
        <div id="employee-functions-container">
            <h2>Employee Dashboard</h2>
            <Link className="fancy-button" to={"/ViewSchedules/"+workspace._id}>View Schedules</Link>
            <br/>
            <br/>

            <Collapsible trigger={[<BsChevronDown />, " Submit a Day-Off Request"]}>
                <DayOffRequestForm workspace={workspace} user={user}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " Submit a Shift Cover Request"]}>
                <ShiftRequestOffForm workspace={workspace}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, "My Open Shift Cover Requests"]}>
                <EmployeeCoverList wid={workspace._id}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, "Approve/Reject Incoming Cover Requests"]}>
                <EmpApproveRejectTradeForm/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, " My Tasks"]}>
                <TaskList wid={workspace._id} user={user}/>
            </Collapsible>
            <Collapsible trigger={[<BsChevronDown />, "Announcements"]}>
                <AnnouncementList wid={workspace._id}/>
            </Collapsible>
        </div>
    )
}

export default EmployeeFunctionsComponent