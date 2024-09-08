import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { generateClient } from 'aws-amplify/api';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks from react-router-dom
import { getTheStaff, listTheStaffs } from '../graphql/queries';
import { Modal } from 'antd';
import { Check } from 'lucide-react';
import UpdateModal from '../components/modal/UpdateModal.js';
import * as mutation from '../graphql/mutations.js';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const AddStaff = () => {
  const navigation = useNavigate();
  const API = generateClient();
  const { id } = useParams(); // Get the staff ID from the URL, if it exists
  console.log('ids', id);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    joiningDate: '',
    userName: '',
    staffType: '',
  });

  useEffect(() => {
    if (id) {
      const fetchStaffData = async () => {
        try {
          console.log('Fetching staff with ID:', id); // Debug log
          const staffData = await API.graphql({
            query: getTheStaff, // Replace with your actual query to get staff by ID
            variables: { id },
          });

          const staff = staffData.data.getTheStaff;
          console.log('staff...s', staff);

          setFormData({
            firstName: staff.fname,
            lastName: staff.lname,
            email: staff.email,
            phoneNumber: staff.phoneno,
            joiningDate: staff.joiningdate,
            userName: staff.userName,
            staffType: staff.staffType,
          });
          console.log("staff.joiningdate",staff.joiningdate);
          
          setSelectedDate(dayjs(staff.joiningdate))
        } catch (error) {
          console.error('Error fetching staff data:', error);
        }
      };

      fetchStaffData();
    }
  }, [id]);

  // State to manage form validation errors
  const [errors, setErrors] = useState({});
  const [ids, setId] = useState();

  // Handle input changes
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date); // Update selectedDate state

    setFormData((prevFormData) => ({
      ...prevFormData,
      joiningDate: dateString,
    }));
  };
  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!formData.staffType) errors.staffType = 'Please Select Staff Type';
    return errors;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Step 1: Perform validation
    const validationErrors = validate(); // Assume validate() is a function that returns an object of errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the errors in state to display in the UI
      return; // Stop the form submission if validation fails
    }
    try {
      // Step 2: Create the input object for staff creation or update
      const staffInput = {
        fname: formData.firstName,
        phoneno: formData.phoneNumber,
        lname: formData.lastName,
        email: formData.email,
        joiningdate: formData.joiningDate,
        staffType:formData.staffType
        // Add other fields as needed
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
      // Step 3: Handle the response and navigation
      const createdItem = staffResponse.data.createTheStaff || staffResponse.data.updateTheStaff;
      console.log(createdItem.id, 'successfully created/updated');
      setId(createdItem.id); // Set the ID if it's a new creation
      // Step 4: Show success message and optionally navigate
      setIsOpen(true);
      // navigation("/staffList"); // Uncomment this if you want to navigate to the staff list page after submission
    } catch (error) {
      console.error('Error creating or updating staff:', error);
      // Handle the error (display message, etc.)
    }
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [show, setIsShow] = useState(false);
  const handleDialogue = () => {
    setIsShow(true);
    setIsOpen(false);
  };
  const handleCancle = () => {
    setIsOpen(false);
    navigation('/stafflist');
  };
  const disabledDate = (current) => {
    // Can not select days after today
    return current && current > dayjs().endOf('day');
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={handleCancle}
        footer={[
          <button
            className="text-black mr-5  h-[30px] w-[60px] border border-gray-500 hover:bg-black-600 rounded-lg"
            key="back"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>,
          <button
            className="text-white h-[30px]  w-[60px] bg-green-500 hover:bg-green-600 border-none rounded-lg"
            key="back"
            onClick={handleDialogue}
          >
            OK
          </button>,

          ,
        ]}
      >
        <div className="flex flex-col items-center justify-center p-5">
          {/* Success Icon */}
          <div className="mb-4 p-4 rounded-full bg-green-100 text-green-500">
            {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2l4 -4m0 0l2 2l-6 6l-2 -2l-4 -4"
        />
      </svg> */}
            <Check color="green" size={40} />
          </div>

          {/* Modal Content */}
          <p className="text-xl font-semibold text-center mb-2">
            Staff added Successfully
          </p>
          <p className="text-center text-gray-600">
            Would you like to add Client Profile to this Employee?
          </p>
        </div>
      </Modal>

      <Modal open={show} onCancel={handleCancle} footer={[]}>
        <UpdateModal id={ids} setIsShow={setIsShow} />
      </Modal>
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
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.firstName ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.lastName ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.email ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.phoneNumber ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
                  <DatePicker
                    value={selectedDate}
                    placeholder="Enter joiningDate"
                    className="w-full text-left rounded border border-stroke bg-gray py-3  pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    format="YYYY-MM-DD"
                    disabledDate={disabledDate}
                    onChange={handleDateChange}
                  />
                  {/* <input
                    type="text"
                    name="joiningDate"
                    placeholder="Enter Joining Date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  /> */}
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Staff Type
                  </label>
                  <select
                    name="staffType"
                    value={formData.staffType}
                    onChange={handleChange}
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.frequency ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  >
                    <option value="">Select Staff Type</option>
                    <option value="driver">Driver</option>
                    <option value="security">Security</option>
                  </select>
                  {errors.staffType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.staffType}
                    </p>
                  )}
                </div>
                {/* <div className="w-full xl:w-1/2">
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
                </div> */}
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
