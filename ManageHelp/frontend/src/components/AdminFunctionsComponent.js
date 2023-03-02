import InviteUserForm from './InviteUserForm'
import UpdateWorkspaceInfoForm from "./UpdateWorkspaceInfoForm"
import RemoveUserForm from './RemoveUserForm'
import EmployeeDetails from './EmployeeDetails'
import { useEffect } from 'react'
import { useEmployeeContext } from "../hooks/useEmployeeContext"
import { useAuthContext } from "../hooks/useAuthContext"

const AdminFunctionsComponent = ({workspace, render_func}) => {
    const { employees, dispatch } = useEmployeeContext()
    const {user} = useAuthContext() 

    const workspaceID = workspace._id

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch('/api/workspaces/getEmployees/' + workspaceID, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            })
            const json = await response.json()
        
            if (response.ok) {
                console.log('OK: ' + json)
                dispatch({type: 'SET_EMPLOYEES', payload: json})
                console.log('post set: ' + employees)
            }
        }

        if (user) {
            fetchEmployees()
        }
    }, [dispatch, user, workspaceID])

    console.log('array: ' + employees)

    return (
        <div id="admin-function-container">
            <h2>Admin Dashboard</h2>
            <div className="workspaces">
                <h3>Employee List</h3>
                {employees && employees.map(employee => (
                <EmployeeDetails workspace={workspace} 
                employee={employee}
                key={employee._id}/>
                ))}
            </div>
            <InviteUserForm joinCode={workspace.joinCode} spacename={workspace.companyName}/>
            <br />
            <UpdateWorkspaceInfoForm id={workspace._id} joinCode={workspace.joinCode} workspaceName={workspace.companyName} render_func={render_func}/>
            <br />
            <RemoveUserForm workspaceID={workspace._id} />
        </div>
    )
}

export default AdminFunctionsComponent