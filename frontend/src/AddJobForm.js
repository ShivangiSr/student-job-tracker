import React, { useState } from 'react';
import axios from 'axios';

const AddJobForm = () => {
  const [job, setJob] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', job);
      alert('Job added successfully!');
      setJob({ company: '', role: '', status: 'Applied', appliedDate: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add job');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="company" value={job.company} onChange={handleChange} placeholder="Company" required />
      <input name="role" value={job.role} onChange={handleChange} placeholder="Role" required />
      <select name="status" value={job.status} onChange={handleChange}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input name="appliedDate" value={job.appliedDate} onChange={handleChange} type="date" required />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJobForm;
