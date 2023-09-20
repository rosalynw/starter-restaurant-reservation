import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationRow from "../reservations/ReservationRow";
import ErrorAlert from "../layout/ErrorAlert";
import "./SearchReservation.css"

export default function SearchReservation() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);

    function handleChange({target}) {
        setMobileNumber(target.value)
    }
    const handleFind = async (event) => {
        event.preventDefault();
        
        const formattedMobileNumber = mobileNumber.replace(/[-()]/g, "");

        //if empty
        if (!formattedMobileNumber) {
            setError("Please enter a mobile number.");
            return;
        }

        if (!/^[\d()-]+$/.test(formattedMobileNumber)) {
            setError("Mobile number must only contain numbers, dashes, and parentheses.");
            return;
        }
        const abortController = new AbortController();

        try {
            const response = await listReservations({ mobile_number: formattedMobileNumber}, abortController.signal);
            setReservations(response);
            setError(null);
            setSearched(true);
        } catch (error) {
            console.error("There was an error:", error);
            setError("An error occurred while fetching reservations");
            setSearched(false);
        }
        return () => abortController.abort();
    }

    const searchResults = () => {
        if (searched) {
            if (reservations.length === 0) {
                return <h4 className="no-reservations">No reservations found</h4>
            } else {
            return (
            <section>
                <div className="found-reservations-table table-responsive">
                  <table className="found-reservations">
                    <thead>
                      <tr>
                        <th>Reservation ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>People</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Cancel</th>
                        <th>Seat</th>
                      </tr>
                    </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                    <ReservationRow
                    key={reservation.reservation_id}
                    reservation={reservation}
                    />
                ))}
                </tbody>
                </table>
                </div>
                </section>
                )
            }
        }
        return null;
    }

    return (
        <div className="search-reservations">
            <h2>Search Reservations</h2>
            <form className="mobile-search" onSubmit={handleFind}>
                <label>Mobile Number:</label>
                <input
                    name="mobile_number"
                    id="mobile_number"
                    type="number"
                    placeholder="Enter a customer's phone number"
                    onChange={handleChange}
                    value={mobileNumber}
                />
                <button 
                type="submit"
                className="btn btn-primary"
                >Find</button>
                <ErrorAlert error={error} />
            </form>
            {searchResults()}
        </div>
    );
}