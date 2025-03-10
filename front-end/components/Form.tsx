import React, { useState } from "react";
import InputField from "./ui/Input";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    acno: "",
    partNo: "",
    sectionNo: "",
    sino: "",
    houseNo: "",
    mainCaste: "",
    caste: "",
    subCaste: "",
    ename: "",
    gender: "",
    rname: "",
    rtype: "",
    age: "",
    idCardNo: "",
    statusType: "",
    contactNo: "",
    mobile2: "",
    relationContact1: "",
    relationContact2: "",
    address: "",
    psName: "",
    boothNumber: "",
    childAge: "",
    voterAccDetails: "",
    childGender: "",
    party: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/submit-form", {
        formData,
      });
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check the console for details.");
    }
  };

  const handleFind = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/find-form?acno=${formData.acno}`);
      if (response.data.success) {
        setFormData(response.data.formData[0]);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      alert("Error fetching form data. Check the console for details.");
    }
  };

  const fields = [
    { label: "ACNO", name: "acno" },
    { label: "Part No", name: "partNo" },
    { label: "Section No", name: "sectionNo" },
    { label: "Serial No", name: "sino" },
    { label: "House No", name: "houseNo" },
    {
      label: "Main Caste",
      name: "mainCaste",
      type: "select",
      options: ["SC", "ST", "BC", "OC", "OBC", "MINORITY"],
    },
    {
      label: "Caste",
      name: "caste",
      type: "select",
      options: ["REDDY", "NAIDU", "KAAPU", "O"],
    },
    { label: "Sub Caste", name: "subCaste" },
    { label: "Electoral Name", name: "ename" },
    { label: "Gender", name: "gender" },
    { label: "Relation Name", name: "rname" },
    { label: "Relation Type", name: "rtype" },
    { label: "Age", name: "age" },
    { label: "Voter ID Card No", name: "idCardNo" },
    { label: "Status Type", name: "statusType" },
    { label: "Contact No", name: "contactNo" },
    { label: "Mobile Number 2", name: "mobile2" },
    { label: "Relation Contact No 1", name: "relationContact1" },
    { label: "Relation Contact No 2", name: "relationContact2" },
    { label: "Address", name: "address" },
    { label: "Booth Name", name: "psName" },
    { label: "Booth Number", name: "boothNumber" },
    { label: "Child Age", name: "childAge" },
    { label: "Voter ACC Details", name: "voterAccDetails" },
    { label: "Child Gender", name: "childGender" },
    {
      label: "Party",
      name: "party",
      type: "select",
      options: ["PARTY1", "PARTY2", "PARTY3", "OTHERS", "NOTA"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-100">
        Voter Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-800 rounded-lg shadow-2xl"
      >
        {fields.map((field, index) => (
          <InputField
            key={index}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        <button
          type="submit"
          className="bg-green-600 p-4 rounded-full col-span-2 mt-6 text-lg font-semibold transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
      <button
        type="button"
        onClick={handleFind}
        className="bg-blue-600 p-4 rounded-full col-span-2 mt-6 text-lg font-semibold transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Find
      </button>
    </div>
  );
};

export default Form;
