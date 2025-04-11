import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: ''
  });

  const [applications, setApplications] = useState([]);

  // Fetch existing applications from backend
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs'); // update to deployed URL later
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', form);
      setForm({ company: '', role: '', status: 'Applied', appliedDate: '', link: '' });
      fetchApplications();
    } catch (err) {
      console.error('Error adding job:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      fetchApplications();
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, { status: newStatus });
      fetchApplications();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="container">
      <h1>Student Job Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company" required />
        <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} required />
        <input type="url" name="link" value={form.link} onChange={handleChange} placeholder="Job Link" />
        <button type="submit">Add Job</button>
      </form>

      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>All Applications</h2>
      {applications.map((app) => (
        <div key={app._id} style={{ background: '#eee', padding: '10px', borderRadius: '10px', margin: '10px 0' }}>
          <p><strong>{app.company}</strong> - {app.role}</p>
          <p>Status:
            <select value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </p>
          <p>Date: {new Date(app.appliedDate).toLocaleDateString()}</p>
          {app.link && (
            <a href={app.link} target="_blank" rel="noreferrer">View Job</a>
          )}
          <button onClick={() => handleDelete(app._id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
