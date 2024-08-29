import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import axios from "axios";
import Users from "./components/Users";

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [exportLoading, setExportLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      const newUser = await axios.post(`${BASE_URL}/api/users`, formData);
      console.log("User data submitted successfully");
      setOpen(false);
      setDataSource([...dataSource, newUser.data]);
    } catch (error) {
      console.error("There was an error submitting the user data!", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await axios.get(`${BASE_URL}/api/users`);
        console.log(allUsers.data);
        setDataSource(allUsers.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle export
  const handleExport = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select at least one user to export.");
      return;
    }

    setExportLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/export`,
        { ids: selectedRowKeys },
        { responseType: "blob" }
      );

      // Create a URL for the file and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv"); // Default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      message.success("CSV file downloaded successfully.");
    } catch (error) {
      console.error("There was an error exporting the user data!", error);
      message.error("Failed to export user data.");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-4 justify-end">
        <Register
          showModal={showModal}
          open={open}
          confirmLoading={confirmLoading}
          handleCancel={handleCancel}
          handleOk={handleOk}
          handleChange={handleChange}
          formData={formData} // Pass formData to Register component
        />
        <button
          onClick={handleExport}
          className="border-2 border-blue-500/90 rounded-md px-2 hover:cursor-pointer"
        >
          EXPORT
        </button>
      </div>

      <Users
        dataSource={dataSource}
        setDataSource={setDataSource}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        exportLoading={exportLoading}
      />
    </div>
  );
}

export default App;
