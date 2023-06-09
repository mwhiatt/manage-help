import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

import ScheduleManagerComponent from '../components/Schedule/ScheduleManagerComponent'

const EditSchedules = () => {

    const { id } = useParams()
    const { user } = useAuthContext()

    const [selectDate, setSelectDate] = useState(new Date())
    const [selectedSchedule, setSelectedSchedule] = useState(null)
    const [runUseEffect, setRunUseEffect] = useState('')

    useEffect(() => {

        // Runs ever time the user selects a new date

        fetch(`/api/schedule/workspace/${id}/${selectDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(json => {
                setSelectedSchedule(json)
            })
        })

    }, [selectDate, runUseEffect])

    const createScheduleFunction = () => {
        
        fetch(`/api/schedule`, {
            method: 'POST',
            body: JSON.stringify({
                workspace_id: id,
                date: selectDate,
                published: false
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(json => {
                setRunUseEffect(response)
            })
        })

    }

    const dateSelectOnClick = (e) => {
        e.preventDefault()
        setSelectDate(e.target.value)
    }

    return (
        <div id='edit-schedules-container'>
            <h1>Edit Schedules</h1>

            <label>Select Schedule Date:</label>
            <input type="date" value={selectDate.toString()} onChange={dateSelectOnClick}/>
            {selectedSchedule ? <ScheduleManagerComponent schedule={selectedSchedule} render_func={setRunUseEffect}/> : 
                <div>
                    <p>No schedule found for this date.</p>
                    <button className='fancy-button' onClick={createScheduleFunction}>Create Schedule</button>
                </div>
            }

        </div>
    )

}

export default EditSchedules

/*
<Collapsible trigger={[<BsChevronDown />, " View Current / Future Schedules"]}>
                <ScheduleList workspace={id} />
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Create New Schedule"]}>
                <CreateScheduleForm workspace_id={id}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Publish / Un-Publish Schedule"]}>
                <PublishScheduleForm workspace_id={id}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " Add Shift to Schedule"]}>
                <AddShiftForm workspace_id={id}/>
            </Collapsible>

            <Collapsible trigger={[<BsChevronDown />, " View Past Schedules"]}>
                <h3>Past Schedules</h3>
            </Collapsible>
 */