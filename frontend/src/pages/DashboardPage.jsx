import { useState, useEffect } from 'react';
import authService from '../services/authService.js';

function DashboardPage() {
  
  const [agentFormData, setAgentFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  
  const [file, setFile] = useState(null);
  
  const [agents, setAgents] = useState([]);
  const [listItems, setListItems] = useState([]);

  const fetchData = async () => {
    try {
      const adminUser = JSON.parse(localStorage.getItem('user'));
      const agentData = await authService.getAgents(adminUser.token);
      const itemData = await authService.getListItems(adminUser.token);
      setAgents(agentData);
      setListItems(itemData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onAgentFormChange = (e) => {
    setAgentFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onAgentSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminUser = JSON.parse(localStorage.getItem('user'));
      const agentData = { ...agentFormData, role: 'Agent' };
      await authService.register(agentData, adminUser.token);
      alert('Agent created successfully!');
      setAgentFormData({ name: '', email: '', mobile: '', password: '' });
      fetchData(); 
    } catch (error) {
      alert(`Error creating agent: ${error.response.data.message}`);
    }
  };

  const onFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    try {
      const adminUser = JSON.parse(localStorage.getItem('user'));
      const response = await authService.uploadCsv(file, adminUser.token);
      alert(response.message);
      setFile(null);
      document.getElementById('fileInput').value = null; 
      fetchData();
    } catch (error) {
      const message = (error.response?.data?.message) || error.message || error.toString();
      alert(`Error uploading file: ${message}`);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Upload and Distribute List</h2>
        <form onSubmit={onFileUpload}>
          <input type="file" id="fileInput" accept=".csv" onChange={onFileChange} />
          <button type="submit">Upload CSV</button>
        </form>
      </section>

      <hr />

      <section>
        <h2>Create New Agent</h2>
        <form onSubmit={onAgentSubmit}>
          <input type="text" name="name" value={agentFormData.name} placeholder="Agent Name" onChange={onAgentFormChange} required />
          <input type="email" name="email" value={agentFormData.email} placeholder="Agent Email" onChange={onAgentFormChange} required />
          <input type="text" name="mobile" value={agentFormData.mobile} placeholder="Agent Mobile (e.g., +919876543210)" onChange={onAgentFormChange} required />
          <input type="password" name="password" value={agentFormData.password} placeholder="Create a Password" onChange={onAgentFormChange} required />
          <button type="submit">Add Agent</button>
        </form>
      </section>

      <hr />

      <section>
        <h2>All Agents</h2>
        <ul>
          {agents.map((agent) => (<li key={agent._id}>{agent.name} - {agent.email}</li>))}
        </ul>
      </section>

      <hr />

      <section>
        <h2>Distributed List Items</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Assigned Agent</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) => (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.phone}</td>
                <td>{item.notes}</td>
                <td>{item.assignedAgent ? item.assignedAgent.name : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default DashboardPage;