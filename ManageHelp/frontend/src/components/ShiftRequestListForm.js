// TODO: Use the form to send an 
// email to the user that tells them that they have been requested to cover a shift for x person at y time
import React, { useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect } from 'react'
import { useShiftrequestContext } from "../hooks/useShiftrequestContext"
import ShiftRequestDetails from './ShiftRequestDetails'

export default function ShiftRequestListForm() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuthContext()

  const { shiftrequests, dispatch } = useShiftrequestContext()

  useEffect(() => {
    const fetchShiftRequest = async () => {
      console.log("sent email: " + user.email)
      const response = await fetch('/api/shiftrequest/' + user.email, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_SHIFTREQUESTS', payload: json })
      }
    }

    if (user) {
      fetchShiftRequest()
    }
  }, [dispatch, user])

  return (
    <div>
      <div className="shiftrequest">
        {shiftrequests && shiftrequests.map(shiftrequest => (
          <ShiftRequestDetails requesterName={shiftrequest.requesterName}
            requestdate={shiftrequest.requestdate}
            accepteeName={shiftrequest.accepteeName}
            presentUser={user}
            key={shiftrequest._id} />
        ))}
      </div>
    </div>
  );
}