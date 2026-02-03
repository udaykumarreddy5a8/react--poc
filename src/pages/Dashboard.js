import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { pocApi } from "../services/api";


const DUMMY_POST_API = "https://jsonplaceholder.typicode.com/posts";

const Dashboard = () => {
  const navigate = useNavigate(); 

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
    sessionStorage.setItem("employeeForm", JSON.stringify(form));

    await fetch(DUMMY_POST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Submit Successful ✅");  
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.clear();

    navigate("/", { replace: true }); 
  } catch (e) {
    alert("Submit Failed ❌");
  }
};



const handleTechChange = (tech) => {
  setForm((prev) => ({
    ...prev,
    tech: prev.tech.includes(tech)
      ? prev.tech.filter((t) => t !== tech)
      : [...prev.tech, tech],
  }));
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
<div className="col-md-12" style={{ display: "flex", justifyContent: "space-between" }}>
  {["useEffect", "useState", "useMemo", "useCallback"].map((tech) => (
    <div
      key={tech}
      className="col-md-4"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#323030",
        fontWeight: "bold",
      }}
    >
      <input
        type="checkbox"
        checked={form.tech.includes(tech)}
        onChange={() => handleTechChange(tech)}
      />
      <div style={{ paddingBottom: "15px" }}>{tech}</div>
    </div>
  ))}
</div>
    <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Dashboard;
