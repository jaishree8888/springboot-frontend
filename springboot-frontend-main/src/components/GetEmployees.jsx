import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const GetEmployees = () => { 
    const [employees, setEmployees] = useState([]);
    const token = localStorage.getItem("token");
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    const isAdmin = roles.includes("ROLE_ADMIN");

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8080/employee", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployees(response.data);
            } catch (err) {
                console.error("Error fetching employees:", err);
                alert("Unauthorized or error fetching employees.");
            }
        };

        if (token) {
            fetchEmployees();
        }
    }, [token]);

    const handleDelete = async (empID) => {
        try {
            await axios.delete(`http://localhost:8080/employee/${empID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEmployees(employees.filter((emp) => emp.empID !== empID));
            alert("Employee deleted successfully");
        } catch (err) {
            console.error("Error deleting employee:", err);
            alert("Delete failed. Check your permissions.");
        }
    };


    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2 className="mb-4">Employee List</h2>
                {employees.length === 0 ? (
                    <p>Please wait .... </p>
                ) : (
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                {isAdmin && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.empID}>
                                    <td>{emp.empID}</td>
                                    <td>{emp.name}</td>
                                     <td>{emp.email}</td>
                                    {isAdmin && (
                                        <td>
                                            <button
                                                onClick={() => handleDelete(emp.empID)}
                                                className="btn btn-danger btn-sm me-2"
                                            >
                                                Delete
                                            </button>
                                            <button className="btn btn-primary btn-sm">Edit</button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default GetEmployees;
