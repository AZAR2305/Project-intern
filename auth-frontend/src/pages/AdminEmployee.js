// src/pages/AdminEmployees.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminEmployees.css';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    phone: '',
    joiningDate: ''
  });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');

  const API_URL = 'http://localhost:5000/api/employees';

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? 'put' : 'post';

    try {
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: '', email: '', department: '', position: '', phone: '', joiningDate: '' });
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

 return (
    <div className="admin-emp-container">
      <h2>Employee Management</h2>

      <form onSubmit={handleSubmit} className="emp-form">
        {['name', 'email', 'position', 'department', 'phone'].map((f) => (
          <input
            key={f}
            name={f}
            placeholder={f}
            value={form[f] || ''}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            required
          />
        ))}
        <input
          type="date"
          name="joiningDate"
          value={form.joiningDate || ''}
          onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
        />
        <button type="submit">{editId ? 'Update' : 'Add'} Employee</button>
      </form>

    <ul className="employee-list">
  {employees.map((emp) => (
    <li key={emp._id}>
      <p><strong>Name:</strong> {emp.name}</p>
      <p><strong>Position:</strong> {emp.position}</p>
      <p><strong>Email:</strong> {emp.email}</p>
      <p><strong>Phone:</strong> {emp.phone}</p>
      <p><strong>Department:</strong> {emp.department}</p>
      <p><strong>Joined:</strong> {new Date(emp.joiningDate).toLocaleDateString()}</p>
      <div className="action-buttons">
        <button onClick={() => handleEdit(emp)}>✏️ Edit</button>
        <button onClick={() => handleDelete(emp._id)}>🗑️ Delete</button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}

export default AdminEmployees;
