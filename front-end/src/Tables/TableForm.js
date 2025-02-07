import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import "./TableForm.css"

function TableForm({loadDashboard}) {
    const history = useHistory();

    const [error,  setError] = useState(null);
   
    const initialFormState = {
        table_name: "",
        capacity: ""
    }
    const [ formData, setFormData ] = useState({ ...initialFormState})


    function handleChange ({ target }) {
        setFormData({
            ...formData,
            [target.name]: target.name === "capacity" ? Number(target.value) : target.value,
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
       // const abortController = new AbortController();
        //console.log("Submit clicked");

        const validationError = vaildTable(formData);
        const abortController = new AbortController();

        if (validationError) {
            setError(validationError);
        } else {
            const parseCapacity = {
                ...formData,
                capacity: parseInt(formData.capacity, 10)
            }

            try {
                console.log("Submitted:", parseCapacity);
                await createTable(parseCapacity, abortController.signal);
                await loadDashboard()
                setFormData({ ...initialFormState})
                history.push(`/dashboard`);
            } catch (error) {
                console.error("Error creating table:", error);
            }
        }
    }

    function vaildTable(table) {
        if (table.table_name.length < 2) {
            return "Table name must be at least 2 characters long.";
        }

        if (table.capacity < 1) {
            return "Capacity must be at least 1 person";
        }

        return null;
    }

    return (
        <div>
            <h2>Create New Table</h2>
            <form onSubmit={handleSubmit} >
                <div className="table-form">
                <label>Table Name:</label>
                <input 
                id="table_name"
                name="table_name"
                type="text"
                min={2}
                onChange={handleChange}
                value={formData.table_name}
                required
                />
                <label>Capacity:</label>
                <input
                id="capacity"
                name="capacity"
                type="number"
                onChange={handleChange}
                value={formData.capacity}
                required
                />
                </div>
                <button 
                type="submit"
                className="btn btn-primary">Submit</button>
                <button
                type="button"
                className="btn btn-danger"
                onClick={history.goBack}>Cancel</button>
            </form>
            <ErrorAlert error={error} />
        </div>
    )
}

export default TableForm;