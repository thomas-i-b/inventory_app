import "./App.css";
import FileUpload from "./components/FileUpload";
import MovementDashboard from "./components/MovementDashboard";

function App() {
  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>Inventory Movement Dashboard</h1>
        <p>Validate and analyze stock movements</p>
      </header>

      <main className="dashboard">
        <section className="card">
          <h2>Upload JSON File</h2>
          <FileUpload
            onUploadSuccess={(data) => {
              console.log("Backend response:", data);
            }}
          />
        </section>

        <section className="card">
          <h2>Upload JSON File</h2>

          <input
            type="file"
            accept=".json,application/json"
          />

          <p className="hash-status">
            SHA-256: Not calculated
          </p>
        </section>

        <section className="card">
          <h2>Filters</h2>

          <div className="filters">
            <div>
              <label>From Date</label>
              <input type="date" />
            </div>

            <div>
              <label>To Date</label>
              <input type="date" />
            </div>

            <div>
              <label>Movement Type</label>

              <select>
                <option value="ALL">All</option>
                <option value="IN">IN</option>
                <option value="OUT">OUT</option>
              </select>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Stock Movements</h2>

          <table>
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>SKU</th>
                <th>Movement Type</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="4">
                  No movement data available
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className="charts">
          <section className="card">
            <h2>IN vs OUT Quantity</h2>
            <div className="chart-placeholder">
              Pie Chart
            </div>
          </section>

          <section className="card">
            <h2>Movement Over Time</h2>
            <div className="chart-placeholder">
              Time Series Chart
            </div>
          </section>
        </div>
     <MovementDashboard />
      </main>
    </div>
  );
}

export default App;