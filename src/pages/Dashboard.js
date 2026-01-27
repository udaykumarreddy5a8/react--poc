import { useEffect, useState } from "react";
import Header from "../components/Header";
import { pocApi, submitApi } from "../services/api";

const Dashboard = () => {
  const [pocList, setPocList] = useState([]);
  const [form, setForm] = useState({
    empId: "",
    name: "",
    startDate: "",
    endDate: "",
    poc: "",
    tech: [],
  });

  useEffect(() => {
    fetch(pocApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("POC API Response:", data);

        // ✅ if API returns array directly
        if (Array.isArray(data)) {
          setPocList(data);
        } else if (Array.isArray(data?.data)) {
          // ✅ if API returns {data:[...]}
          setPocList(data.data);
        } else {
          setPocList([]);
        }
      })
      .catch(() => {
        setPocList([]);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch(submitApi, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      sessionStorage.setItem("employeeData", JSON.stringify(data));
      alert("Submitted Successfully");
    } catch (e) {
      alert("Submit Failed ❌");
    }
  };

  return (
    <>
      <Header />
      <div className="form-card">
        <h3>Employee Details</h3>

        <label>Emp Id</label>
        <input
          placeholder="Emp Id"
          onChange={(e) => setForm({ ...form, empId: e.target.value })}
        />

        <label>Name</label>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div style={{ display: "flex", gap: "45px" }}>
          <div>
            <label>Start Date</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="dateInput"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
          </div>

          <div>
            <label>Completion date</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="dateInput"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>

        <label>POC</label>
        <select onChange={(e) => setForm({ ...form, poc: e.target.value })}>
          <option value="">Select POC</option>

          {(Array.isArray(pocList) ? pocList : []).map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Tech Checkboxes */}
        <div style={{ display: "flex", justifyContent: "space-between" }} className="col-md-12">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "#323030", fontWeight: "bold" }} className="col-md-4">
            <input type="checkbox" />
            <div style={{ paddingBottom: "15px" }}>useEffect</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "#323030", fontWeight: "bold" }} className="col-md-4">
            <input type="checkbox" />
            <div style={{ paddingBottom: "15px" }}>useState</div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "#323030", fontWeight: "bold" }} className="col-md-4">
            <input type="checkbox" />
            <div style={{ paddingBottom: "15px" }}>useMemo</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }} className="col-md-12">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", color: "#323030", fontWeight: "bold" }} className="col-md-4">
            <input type="checkbox" />
            <div style={{ paddingBottom: "15px" }}>useCallback</div>
          </div>
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Dashboard;
