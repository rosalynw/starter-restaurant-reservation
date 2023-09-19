import React from "react";
import { Link } from "react-router-dom";
import { updateReservation } from "../utils/api";

export default function ReservationTable({ reservation, loadDashboard }) {
  if (!reservation || reservation.status === "finished") return null;


 async function handleCancel() {
   if (
     window.confirm(
       "Do you want to cancel this reservation?"
     )
   ) {
     const abortController = new AbortController();

    await updateReservation(reservation.reservation_id, "cancelled", abortController.status)
    
    await loadDashboard();
     return () => abortController.abort();
   }
 }

  return (
    <div>
      <table className="reservations-small table">
        <tbody>
          <tr>
            <th className="descriptor">Reservation ID:</th>
            <td>{reservation.reservation_id}</td>
          </tr>
          <tr>
            <th className="descriptor">First Name:</th>
            <td>{reservation.first_name}</td>
          </tr>
          <tr>
            <th className="descriptor">Last Name:</th>
            <td>{reservation.last_name}</td>
          </tr>
          <tr>
            <th className="descriptor">Mobile Number:</th>
            <td>{reservation.mobile_number}</td>
          </tr>
          <tr>
            <th className="descriptor">Date:</th>
            <td>{reservation.reservation_date.substr(0, 10)}</td>
          </tr>
          <tr>
            <th className="descriptor">Time:</th>
            <td>{reservation.reservation_time.substr(0, 5)}</td>
          </tr>
          <tr>
            <th className="descriptor">People:</th>
            <td>{reservation.people}</td>
          </tr>
          <tr>
            <th className="descriptor">Status:</th>
            <td data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </td>
          </tr>
          <tr>
          {reservation.status === "booked" ? (
        <>
          <td>
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              <button 
              type="button"
              className="btn btn-warning"
              >Edit</button>
            </Link>
          </td>

          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
              data-reservation-id-cancel={reservation.reservation_id}
            >
              Cancel
            </button>
          </td>

          <td>
            <a href={`/reservations/${reservation.reservation_id}/seat`}>
              <button 
              type="button"
              className="btn btn-primary"
              >Seat</button>
            </a>
          </td>
        </>
      ) : (
        <>
          <td>
            <button 
            type="button" 
            className="btn btn-warning"
            disabled>Edit</button>
          </td>
          <td>
            <button 
            type="button"
            className="btn btn-danger"
            disabled>Cancel</button>
          </td>
          <td>
            <button 
              type="button"
              className="btn btn-primary"
              disabled>Seat</button>
          </td>
        </>
      )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}