import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { ArrowUpFromLine } from "@heroicons/react/outline";
import * as mutation from "../graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks from react-router-dom

import { getTheClient, listTheStaffs } from "../graphql/queries";
const AddClient = () => {
  const API = generateClient();
  const { id } = useParams(); // Get the staff ID from the URL, if it exists
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    businessName: "",
    email: "",
    contactPersonPhone: "",
    address: "",
    note: "",
  });
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (id) {
      const fetchClientfData = async () => {
        try {
          console.log("Fetching staff with ID:", id); // Debug log

          const staffData = await API.graphql({
            query: getTheClient, // Replace with your actual query to get staff by ID
            variables: { id },
          });

          const client = staffData.data.getTheClient;
          console.log("staff...s", client);

          setFormData({
            name: client.name,
            phoneNumber: client.phoneno,
            email: client.email,
            businessName: client.bname,
            contactPersonPhone: client.contactpersonpho,
            note: client.note,
            address: client.address,
          });
          client;
        } catch (error) {
          console.error("Error fetching staff data:", error);
        }
      };

      fetchClientfData();
    }
  }, [id]);
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 10); // Limit to 10 files
    setFiles(selectedFiles);
    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(filePreviews);
  };

  // Remove selected file
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFilePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));
  };

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.contactPersonPhone)
      errors.contactPersonPhone = "Contact person's phone number is required";
    if (!formData.address) errors.address = "Address is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const clientInput = {
      name: formData.name, // Mapping to 'name' field
      phoneno: formData.phoneNumber, // Mapping to 'phoneno' field
      bname: formData.businessName, // Mapping to 'bname' field
      email: formData.email, // Mapping to 'email' field
      contactpersonpho: formData.contactPersonPhone, // Mapping to 'contactpersonpho' field
      address: formData.address, // Mapping to 'address' field
      note: formData.note, // Mapping to 'note' field
    };
    let clientesponse;

    if (id) {
      clientesponse = await API.graphql({
        query: mutation.updateTheClient,

        variables: { input: { id, ...clientInput } },
      });
    } else {
      clientesponse = await API.graphql({
        query: mutation.createTheClient,
        variables: { input: clientInput },
      });
      // Create a new staff member
    }
    const createdItem = clientesponse.data.createTheClient;
    console.log(createdItem, "suceesfully created");
    navigation("/clientlist");
    // Submit form data to your backend or API
    // Reset form if needed
    setFormData({
      name: "",
      phoneNumber: "",
      businessName: "",
      email: "",
      contactPersonPhone: "",
      address: "",
      note: "",
    });
    setFiles([]);
    setFilePreviews([]);
    setErrors({});
  };

  return (
    <>
      <Breadcrumb pageName="Add Client" />

      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Client's information
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5 ">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={formData.name}
                      onChange={handleInputChange}
                      name="name"
                      type="text"
                      placeholder="Enter your first Name"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errors.name ? "border-red-500" : ""
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone Number <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      name="phoneNumber"
                      type="text"
                      placeholder="Enter your Phone Number"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errors.phoneNumber ? "border-red-500" : ""
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Business Name
                    </label>
                    <input
                      value={formData.businessName}
                      onChange={handleInputChange}
                      name="businessName"
                      type="text"
                      placeholder="Enter your Business Name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5  w-full flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={formData.email}
                      onChange={handleInputChange}
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errors.email ? "border-red-500" : ""
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contact Person phone{" "}
                      <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={formData.contactPersonPhone}
                      onChange={handleInputChange}
                      name="contactPersonPhone"
                      type="text"
                      placeholder="Enter your Contact Person phone"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errors.contactPersonPhone ? "border-red-500" : ""
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.contactPersonPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contactPersonPhone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                      errors.address ? "border-red-500" : ""
                    } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    File Upload (Upload up to 10 images)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <div className="mt-4 space-y-4">
                    {filePreviews.map((file, index) => (
                      <img
                        key={index}
                        className="m-3"
                        width={120}
                        height={120}
                        src={file}
                        alt={`Preview ${index}`}
                      />
                    ))}
                  </div>
                  <div className="mt-4 space-y-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-lg border-stroke dark:border-form-strokedark"
                      >
                        <div className="flex items-center gap-2">
                          {renderFilePreview(file)}
                          <span className="text-sm text-black dark:text-white">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Note
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={handleInputChange}
                    name="note"
                    rows={3}
                    placeholder="Type your Note"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button type="submit" className="btn-grad w-full pr-20">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClient;
