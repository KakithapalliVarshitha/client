import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Checking...");
  const [lastUpdated, setLastUpdated] = useState("-");
  const [data, setData] = useState([]);

 const fetchStatus = async () => {
  try {
    const res = await fetch("https://server-sigma-teal-92.vercel.app/api/status");
    const result = await res.json();

    const formattedDate = new Date(result.lastUpdated).toLocaleString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    );

    setStatus(result.backendStatus);
    setLastUpdated(formattedDate);
  } catch (err) {
    setStatus("DOWN");
    setLastUpdated("-");
  }
};


  const fetchData = async () => {
    const res = await fetch("https://az-backend-puce.vercel.app/api/employees");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="container">
      <h2>CI/CD PRACTICE DASHBOARD</h2>

      <div className="status-box">
        <p>
          <span className={`status-indicator ${status === 'UP' ? 'status-up' : 'status-down'}`}></span>
          <strong>Backend Status:</strong> {status}
        </p>
        <p><strong>Last Updated:</strong> {lastUpdated}</p>
      </div>

      <button onClick={fetchData}>Fetch Employee Data</button>

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.empId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
