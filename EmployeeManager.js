import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageEmployees = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchVendors = async () => {
    try {
      const res = await axios.get("/api/vendors");
      setVendors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/vendors/${id}`);
      setMessage({ text: "Vendor deleted successfully!", type: "success" });
      fetchVendors();
    } catch (err) {
      setMessage({ text: "Error deleting vendor", type: "danger" });
    }
    setTimeout(() => setMessage({ text: "", type: "" }), 2000);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/vendors/${selectedVendor._id}`, selectedVendor);
      setMessage({ text: "Vendor updated successfully!", type: "success" });
      fetchVendors();
      document.getElementById("closeModalBtn").click();
    } catch (err) {
      setMessage({ text: "Error updating vendor", type: "danger" });
    }
    setTimeout(() => setMessage({ text: "", type: "" }), 2000);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Vendors</h2>

      {message.text && (
        <div className={`alert alert-${message.type} animate__animated animate__fadeIn`}>
          <i className={`bi bi-${message.type === "success" ? "check-circle" : "x-circle"}`}></i> {message.text}
        </div>
      )}

      <div className="row">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="col-md-4 mb-3">
            <div className="card shadow rounded">
              <div className="card-body">
                <h5 className="card-title text-primary">{vendor.name}</h5>
                <p className="card-text"><strong>Email:</strong> {vendor.email}</p>
                <p className="card-text"><strong>Phone:</strong> {vendor.phone}</p>
                <p className="card-text"><strong>Company:</strong> {vendor.company}</p>
                <button className="btn btn-warning me-2" onClick={() => setSelectedVendor(vendor)} data-bs-toggle="modal" data-bs-target="#updateModal">
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(vendor._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      <div className="modal fade" id="updateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleUpdate}>
            <div className="modal-header">
              <h5 className="modal-title">Update Vendor</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeModalBtn" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-2" placeholder="Name" value={selectedVendor?.name || ""} onChange={(e) => setSelectedVendor({ ...selectedVendor, name: e.target.value })} required />
              <input type="email" className="form-control mb-2" value={selectedVendor?.email || ""} disabled />
              <input type="text" className="form-control mb-2" placeholder="Phone" value={selectedVendor?.phone || ""} onChange={(e) => setSelectedVendor({ ...selectedVendor, phone: e.target.value })} required />
              <input type="text" className="form-control mb-2" placeholder="Company" value={selectedVendor?.company || ""} onChange={(e) => setSelectedVendor({ ...selectedVendor, company: e.target.value })} required />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
