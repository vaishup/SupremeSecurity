import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { generateClient } from "aws-amplify/api";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks from react-router-dom
import { getTheStaff, listTheStaffs } from "../graphql/queries";
import * as mutation from "../graphql/mutations.js";

const AddStaff = () => {
  const navigation = useNavigate();

  const API = generateClient();
  const { id } = useParams(); // Get the staff ID from the URL, if it exists

  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    joiningDate: "",
    userName: "",
  });

  useEffect(() => {
    if (id) {
      const fetchStaffData = async () => {
        try {
          console.log("Fetching staff with ID:", id); // Debug log

          const staffData = await API.graphql({
            query: getTheStaff, // Replace with your actual query to get staff by ID
            variables: { id },
          });

          const staff = staffData.data.getTheStaff;
          console.log("staff...s", staff);

          setFormData({
            firstName: staff.fname,
            lastName: staff.lname,
            email: staff.email,
            phoneNumber: staff.phoneno,
            joiningDate: staff.joiningdate,
            userName: staff.userName,
          });
        } catch (error) {
          console.error("Error fetching staff data:", error);
        }
      };

      fetchStaffData();
    }
  }, [id]);
  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    return errors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Step 2: Create PatientOrder
      const staffInput = {
        fname: formData.firstName,
        phoneno: formData.phoneNumber,
        lname: formData.lastName,
        email: formData.email,
        joiningdate: formData.joiningDate,
        // address:formData.address,
        // Mapping to 'frequency' field
      };
      let staffResponse;
      if (id) {
        // Update existing staff member
        staffResponse = await API.graphql({
          query: mutation.updateTheStaff,
          variables: { input: { id, ...staffInput } },
        });
      } else {
        // Create a new staff member
        staffResponse = await API.graphql({
          query: mutation.createTheStaff,
          variables: { input: staffInput },
        });
      }
      const createdItem = staffResponse.data.createTheStaff;
      console.log(createdItem, "suceesfully created");
      navigation("/staffList");
      // Add logic here to submit the taskData to your backend or API
    } catch (error) {
      console.error("Error creating PatientOrder:", error);
      throw new Error("Failed to create PatientOrder");
    }
  };
  return (
    <>
        <Breadcrumb pageName="Add Staff" />

        <div className="flex justify-center items-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h3 className="font-medium text-black dark:text-white border-b border-stroke dark:border-gray-700 pb-2">
              Staff's Details
            </h3>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.firstName ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.lastName ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 w-full flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.email ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone Number <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.phoneNumber ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Joining date
                    </label>
                    <input
                      type="text"
                      name="joiningDate"
                      placeholder="Enter Joining Date"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      UserName
                    </label>
                    <input
                      type="text"
                      name="userName"
                      placeholder="Enter UserName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <button className="btn-grad w-full py-3" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
     
    </>
  );
};

export default AddStaff;
