import { useEffect, useState } from "react";
import { getMovements } from "../services/movementApi";

function MovementDashboard() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [from, setFrom] = useState("2026-03-10");
  const [to, setTo] = useState("2026-03-17");
  const [type, setType] = useState("OUT");

  const fetchMovements = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMovements({
        from,
        to,
        type,
      });

      setMovements(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <div className="card">

      <h2>Stock Movements</h2>

      <div className="filters">

        <div>
          <label>From Date</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div>
          <label>To Date</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div>
          <label>Movement Type</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>

        <button onClick={fetchMovements}>
          Search
        </button>

      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <p>
          Total movements: {movements.length}
        </p>
      )}

    </div>
  );
}

export default MovementDashboard;