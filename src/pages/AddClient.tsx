import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { ArrowUpFromLine } from '@heroicons/react/outline';
import * as mutation from '../graphql/mutations.js';
import { generateClient } from 'aws-amplify/api';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks from react-router-dom
import { uploadData } from 'aws-amplify/storage';
import { useDropzone } from 'react-dropzone';
import { getUrl } from 'aws-amplify/storage';
import { Modal } from 'antd';
import { Check } from 'lucide-react';
import UserOne from '../images/document.png';
import { Pencil, PencilIcon, Trash2 } from 'lucide-react';

import {
  getTheClient,
  listTheStaffs,
  listTheClientPeople,
} from '../graphql/queries';
const AddClient = () => {
  const API = generateClient();
  const { id } = useParams(); // Get the staff ID from the URL, if it exists
  const navigation = useNavigate();
  const [filePreviewss, setFilePreviewss] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    businessName: '',
    email: '',
    contactPersonPhone: '',
    address: '',
    note: '',
    residentType: '',
  });
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]); // Ensure this is defined
  const [clientId, setClientId] = useState();
  const [errors, setErrors] = useState({});
  const [clientpeople, setClientPeople] = useState([]);

  const getS3Url = async (key) => {
    try {
      const getUrlResult = await getUrl({
        key,
        options: {
          accessLevel: 'guest', // Change as necessary (guest, private, protected)
        },
      });

      //console.log('Fetched file URL:', getUrlResult.url.toString()); // Log the URL for verification
      return getUrlResult.url.toString(); // Ensure the URL is returned as a string
    } catch (error) {
      console.error('Error getting S3 URL: ', error);
      throw error;
    }
  };
  useEffect(() => {
    if (id) {
      const fetchClientData = async () => {
        try {
          console.log('Fetching staff with ID:', id); // Debug log

          const staffData = await API.graphql({
            query: getTheClient, // Replace with your actual query to get staff by ID
            variables: { id },
          });

          const client = staffData.data.getTheClient;
          console.log('client', client);

          setFormData({
            name: client.name,
            phoneNumber: client.phoneno,
            email: client.email,
            businessName: client.bname,
            contactPersonPhone: client.contactpersonpho,
            note: client.note,
            address: client.address,
            residentType: client.residentType,
          });

          // Process attachments for file previews
          if (client.attachments && Array.isArray(client.attachments)) {
            const previews = await Promise.all(
              client.attachments.map(async (attachment) => {
                console.log('attachments...', attachment);
                const parts = attachment.split('/');

                // Get the folder type ('image')
                const folderType = parts[parts.length - 2];

                // Get the file name ('IMG_6458.PNG')
                const fileName = parts[parts.length - 1];

                const fileExtension = fileName.split('.').pop().toLowerCase();

                // Determine the file type based on the extension
                let fileType = '';
                
                if (['jpeg', 'jpg', 'png', 'gif' ,'PNG'].includes(fileExtension)) {
                  fileType = 'image';
                } else if (fileExtension === 'pdf') {
                  fileType = 'pdf';
                } else if (['xlsx', 'xls'].includes(fileExtension)) {
                  fileType = 'spreadsheet';
                } else {
                  fileType = 'unknown';
                }
                const imageExtensions = ['jpg', 'PNG', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

                console.log('File Name:', fileName);     // Output: IMG_6458.PNG
                console.log('File Type:', fileType);  
                // Check for type and fallback to empty string if undefined
                const attachmentType = folderType;
                const isImage = imageExtensions.includes(fileExtension);
                console.log('attachmentType', attachmentType);
                console.log('attachmentType', isImage);

                // Ensure you have the URL fetched correctly from S3
                const url = await getS3Url(attachment);
                console.log(url);

                return {
                  file: null, // No file object for previously uploaded files
                  url, // Fetched S3 URL
                  name: fileName || 'Unknown', // Fallback name if unavailable
                  isImage, // Flag to check if the file is an image
                };
              }),
            );

            setFilePreviews(previews);
          }
        } catch (error) {
          console.error('Error fetching staff data:', error);
        }
      };
      fetchClientData();
      listPeople(id);
    }
  }, [id]);
console.log("filePreviews",filePreviews);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChanges = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Generate file previews and store the actual file objects
    const previews = selectedFiles.map((file) => {
      const isImage = file.type.startsWith('image/');
      return {
        file: file, // Store the original File object
        url: isImage ? URL.createObjectURL(file) : null, // Generate preview for image files only
        name: file.name,
        isImage: isImage, // Flag to check if the file is an image
      };
    });

    setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]); // Ensure appending works correctly
  };

  // Handle file changes
  // const handleFileChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   setFiles(selectedFiles); // Store all selected files in state

  //   // Generate file previews
  //   const previews = selectedFiles.map(file => URL.createObjectURL(file));
  //   setFilePreviews(previews);
  // };

  // Remove selected file
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFilePreviews(updatedFiles.map((file) => URL.createObjectURL(file)));
  };

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.businessName) errors.name = 'BusinessName is required';
    if (!formData.contactPersonPhone)
      errors.name = 'Contact Person Phone is required';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required';
    if (!formData.email) errors.email = 'Email is required';

    if (!formData.address) errors.address = 'Address is required';
    if (files.length > 10) {
      errors.fileUpload = 'You can only upload up to 10 images.';
    }
    if (!formData.residentType)
      errors.residentType = 'Resident Type is required';
    return errors;
  };
  const onDrop = (acceptedFiles: File[]) => {
    setFilePreviewss([...filePreviewss, ...acceptedFiles]);
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep existing form data
      [name]: value, // Update the field with the new value
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  // Handle form submission
  const handleSubmits = async (e: React.FormEvent) => {
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
      residentType: formData.residentType,
    };
    let clientesponse;
    if (id) {
      clientesponse = await API.graphql({
        query: mutation.updateTheClient,
        variables: { input: { id, ...clientInput } },
      });
      const createdItem = clientesponse.data.updateTheClient;
      const clientId = createdItem.id; // Replace with actual client ID
      //--------------------------- upload images to s3 bucket--------------------------------------
      try {
        const uploadedFiles = await Promise.all(
          filePreviews.map((file) => uploadToS3s(file, clientId, file.name)),
        );
        // const uploadedFileKey = await uploadToS3(files, clientId);
        const updateInput = {
          id: clientId,
          attachments: uploadedFiles,
        };
        await API.graphql({
          query: mutation.updateTheClient,
          variables: { input: updateInput },
        });
        console.log(createdItem, 'suceesfully created');
        console.log('peopple...', people);

        // handeleAddCLient(clientId);
        // Handle the success (e.g., update UI, make further API calls)
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle the error (e.g., display error message to user)
      }
      if (filePreviews.length > 0) {
        // Upload files to S3 only if there are file previews
        try {
          const uploadedFiles = await Promise.all(
            filePreviews.map((file) =>
              uploadToS3s(file.file, clientId, file.name),
            ), // Make sure to pass the file object, not the entire preview object
          );

          const updateInput = {
            id: clientId,
            attachments: uploadedFiles,
          };
          console.log('updateInput/...', updateInput);

          const update = await API.graphql({
            query: mutation.updateTheClient,
            variables: { input: updateInput },
          });
          console.log(update, 'successfully updated');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
      handeleUpdateClient(id);
      navigation('/clientlist');
      ///----------------- fetch images-----------------------------------------------
    } else {
      console.log('clientInput..', clientInput);
      clientesponse = await API.graphql({
        query: mutation.createTheClient,
        variables: { input: clientInput },
      });
      console.log(clientesponse);
      console.log('clientInput', clientInput);
      console.log('clientesponse', clientesponse);

      const createdItem = clientesponse.data.createTheClient;
      const clientId = createdItem.id; // Replace with actual client ID
      handeleAddCLient(clientId);

      //--------------------------- upload images to s3 bucket--------------------------------------

      if (filePreviews.length > 0) {
        // Upload files to S3 only if there are file previews
        try {
          const uploadedFiles = await Promise.all(
            filePreviews.map((file) =>
              uploadToS3s(file.file, clientId, file.name),
            ), // Make sure to pass the file object, not the entire preview object
          );

          const updateInput = {
            id: clientId,
            attachments: uploadedFiles,
          };
          console.log('updateInput/...', updateInput);

          const update = await API.graphql({
            query: mutation.updateTheClient,
            variables: { input: updateInput },
          });
          console.log(update, 'successfully updated');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
      setIsOpen(true);
      // navigation("/clientlist");
      // Create a new client member
    }

    // navigation("/clientlist");
    // Submit form data to your backend or API
    // Reset form if needed
    setFormData({
      name: '',
      phoneNumber: '',
      businessName: '',
      email: '',
      contactPersonPhone: '',
      address: '',
      note: '',
      residentType: '',
    });
    setFiles([]);
    setFilePreviews([]);
    setErrors({});
  };

  const listPeople = async (id) => {
    try {
      const response = await API.graphql({
        query: listTheClientPeople,
        variables: {
          filter: {
            clientID: {
              eq: id,
            },
          },
        },
      });
      // Access the correct property from the response
      const clientData = response.data.listTheClientPeople;
      console.log('clientData', clientData);
      const sortedTasks = clientData.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      console.log('sortedTasks...', sortedTasks);

      // Set the client data to state
      setPeople(sortedTasks);
      // Ensure you're setting the items array to state
    } catch (error) {
      console.error('Error fetching listPost', error);
      //setLoading(false);
    }
  };

  const handeleUpdateClient = async (id) => {
    try {
      // Filter out people who already have a clientID or id
      const newPeople = people.filter(
        (person) => !person.clientID && !person.id,
      );

      // Map over the 'newPeople' array and create a client mutation for each person
      const promises = newPeople.map((person) => {
        const clientInputs = {
          clientID: id, // Mapping to 'clientId' field
          name: person.name, // Mapping to 'name' field
          phone: person.phone, // Mapping to 'phone' field
          email: person.email, // Mapping to 'email' field
        };

        // Return the API request promise for new people without clientID or id
        return API.graphql({
          query: mutation.createTheClientPerson,
          variables: { input: clientInputs },
        });
      });

      // Use Promise.all to send all requests concurrently
      const responses = await Promise.all(promises);

      // Handle successful responses if needed
      console.log('All people added successfully:', responses);
      setPeople([]); // Clear the people list after successful submission
      setErrorsp(''); // Clear any error messages
    } catch (error) {
      console.error('Error adding people:', error);
      setErrorsp('Failed to add some people.');
    }
  };

  const handeleAddCLient = async (id) => {
    try {
      // Map over the 'people' array and create a client mutation for each person

      const promises = people.map((person) => {
        const clientInputs = {
          clientID: id, // Mapping to 'clientId' field
          name: person.name, // Mapping to 'name' field
          phone: person.phone, // Mapping to 'phone' field
          email: person.email, // Mapping to 'email' field
        };
        // Return the API request promise
        return API.graphql({
          query: mutation.createTheClientPerson,
          variables: { input: clientInputs },
        });
      });

      // Use Promise.all to send all requests concurrently
      const responses = await Promise.all(promises);

      // Handle successful responses if needed
      console.log('All people added successfully:', responses);
      setPeople([]); // Clear the people list after successful submission
      setErrorsp(''); // Clear any error messages
    } catch (error) {
      console.error('Error adding people:', error);
      setErrorsp('Failed to add some people.');
    }
  };
  function renderFilePreview(file) {
    if (file.type.startsWith('image/')) {
      // Render image preview
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-16 h-16 object-cover rounded"
        />
      );
    } else if (file.type === 'application/pdf') {
      // Render PDF preview icon
      return <i className="fas fa-file-pdf text-red-500 text-3xl"></i>;
    } else {
      // Render generic file icon
      return <i className="fas fa-file text-gray-500 text-3xl"></i>;
    }
  }

  const uploadToS3s = async (file, ticketId, fileName) => {
    try {
      const fullKey = `ClientImages/${ticketId}/image/${fileName}`;

      const result = await uploadData({
        key: fullKey,
        data: file,
        options: {
          accessLevel: 'guest', // Change as necessary (guest, private, protected)
        },
      });

      console.log('Uploaded file key:', fullKey); // Log the key for verification
      return fullKey; // Return the key to use it in the mutation
    } catch (error) {
      console.error('Error uploading to S3: ', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogue = () => {
    setIsOpen(false);
    navigation(`/addtask/null/${clientId}`);
  };
  const handleCancle = () => {
    setIsOpen(false);
    navigation('/stafflist');
  };
  //-------- upto five person------------------------
  // State for the list of people
  const [people, setPeople] = useState([]);
  // State for the current input values
  const [personData, setPersonData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errorsp, setErrorsp] = useState('');
  // Errors (if needed)
  // Handle input changes for each person
  const handleInputChangePerson = (e) => {
    const { name, value } = e.target;
    setPersonData({
      ...personData,
      [name]: value,
    });
  };
  // Add a new person to the list
  const handleAddMore = () => {
    // Validation check for empty fields
    if (!personData.name || !personData.email || !personData.phone) {
      setErrorsp('Please fill out all fields before adding.');
      return;
    }
    if (people.length >= 5) {
      setErrorsp('You can only add up to 5 people.');
      return;
    }
    // If all fields are filled and the limit is not exceeded, add the person
    setPeople([...people, personData]); // Add the current person to the list
    setPersonData({ name: '', email: '', phone: '' }); // Clear the input fields
    setErrorsp(''); // Clear any error messages
  };
  // Delete a person from the list by index
  const handleDelete = async (index, ids) => {
    if (id) {
      try {
        const response = await API.graphql({
          query: mutation.deleteTheClientPerson,
          variables: { input: { id: ids } }, // Use id here for API deletion
        });

        // Handle successful response
        console.log('Client deleted successfully:', response);

        // Optionally refresh the list after deletion or update the state
        listPeople(id); // Assuming this refreshes the list of people

        setErrorsp(''); // Clear any error messages
      } catch (error) {
        // Handle errors during the API request
        console.error('Error deleting client:', error);
        setErrorsp('Failed to delete client.');
      }
    } else {
      // If no ID is provided, perform local deletion by index
      const updatedPeople = people.filter((_, i) => i !== index);
      setPeople(updatedPeople);
      console.log('Client deleted locally.');
    }
  };

  return (
    <>
      <Breadcrumb pageName={id ? 'Edit Client' : 'Add Client'} />
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
            {' '}
            OK{' '}
          </button>,
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
            Client added Successfully
          </p>
          <p className="text-center text-gray-600">
            Would you like to proceed with adding a task for this client?
          </p>
        </div>
      </Modal>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Client's information
              </h3>
            </div>
            <div className="p-6.5 ">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Business Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData.businessName}
                    onChange={handleInputChange}
                    name="businessName"
                    type="text"
                    placeholder="Enter your Business Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.businessName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.businessName}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Business Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                      errors.email ? 'border-red-500' : ''
                    } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Busines Phone Number <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter your Phone Number"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                      errors.phoneNumber ? 'border-red-500' : ''
                    } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber}
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
                    errors.address ? 'border-red-500' : ''
                  } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <div className="mb-6 flex flex-row justify-between items-center">
                  <p className="font-medium text-black">
                    You can add up to 5 people
                  </p>
                  <button
                    className="ml-auto p-2  btn-grad w-[120px]"
                    onClick={handleAddMore}
                  >
                    Add More
                  </button>
                </div>

                <div className="mb-4.5 w-full flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Name <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={personData.name}
                      onChange={handleInputChangePerson}
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errorsp.name ? 'border-red-500' : ''
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={personData.email}
                      onChange={handleInputChangePerson}
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errorsp.email ? 'border-red-500' : ''
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Phone Number <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={personData.phone}
                      onChange={handleInputChangePerson}
                      name="phone"
                      type="text"
                      placeholder="Enter your phone number"
                      className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                        errorsp.phone ? 'border-red-500' : ''
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                  </div>
                </div>
                {errorsp && (
                  <p className="text-red-500 text-sm mt-2">{errorsp}</p>
                )}
                {/* {errors && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors}
                      </p>
                    )} */}
                {/* Display the list of people */}

                {people.map((person, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 mb-2 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:gap-3 sm:items-center w-full mt-2 sm:mt-0">
                      <p className="text-lg text-black dark:text-white">
                        {index + 1}
                      </p>
                      <p className="text-black dark:text-white">
                        {person.name || 'N/A'}
                      </p>
                      <p className="text-black dark:text-white">
                        {person.phone || 'N/A'}
                      </p>
                      <p className="text-black dark:text-white">
                        {person.email || 'N/A'}
                      </p>
                    </div>

                    <Trash2
                      onClick={() => handleDelete(index, person.id)}
                      className="inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"
                      color="red"
                      size={20}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-4.5  w-full flex flex-col gap-6 xl:flex-row">
                {/* <div className="w-full xl:w-1/2">
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
                        errors.name ? 'border-red-500' : ''
                      } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div> */}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Resident Type
                  </label>
                  <select
                    name="residentType" // Ensure this matches the formData key
                    value={formData.residentType} // Bind the value to formData.residentType
                    onChange={handleChange} // Handle change to update formData
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.frequency ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  >
                    <option value="">Select Resident</option>
                    <option value="Residents">Residents</option>
                    <option value="Drivers/Contractors"> Drivers/Contractors</option>
                  </select>
                  {errors.residentType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.residentType}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contact Person phone <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={formData.contactPersonPhone}
                    onChange={handleInputChange}
                    name="contactPersonPhone"
                    type="text"
                    placeholder="Enter your Contact Person phone"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                      errors.contactPersonPhone ? 'border-red-500' : ''
                    } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {errors.contactPersonPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactPersonPhone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  File Upload (Upload up to 10 images)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChanges}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.fileUpload && (
                  <p className="text-red-500 mt-2">{errors.fileUpload}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-4">
                  {/* Check if id exists, render AttachmentPreviews */}
                  {/* {id ? (
                    <AttachmentPreviews filePreviews={filePreviews} />
                  ) : ( */}

                  {filePreviews.map((preview, index) => (
                    <div key={index} className="m-3">
                      {preview.isImage ? (
                        <>
                          <img
                            width={120}
                            height={120}
                            src={preview.url}
                            alt={`Preview ${index}`}
                            className="rounded border border-gray-300"
                          />
                          <p className="text-x text-black mt-2">
                            {preview.name}
                          </p>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-28 h-28 bg-gray-200 rounded">
                          <img
                            src={UserOne}
                            alt="User"
                            width={80}
                            height={80}
                          />
                          <p className="text-x text-black mt-2">
                            {preview.name}
                          </p>
                        </div>
                      )}
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

              <button
                onClick={handleSubmits}
                type="submit"
                className="p-3 btn-grad w-full pr-20"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const renderAttachment = (preview) => {
  // Check if the URL is a valid string
  if (typeof preview.url !== 'string') {
    console.log('url..', preview.url);
    console.error('Invalid URL:', preview.url); // Debugging log for invalid URLs
    return null; // Return nothing if URL is invalid
  }
  console.log('name.', name);

  // Check if the file is an image using regex match
  const isImage = url.match(/\.(jpeg|jpg|gif|png|PNG)(\?.*)?$/);
  if (isImage) {
    // Render an image preview
    return (
      <div key={url} className="file-preview">
        <img className="m-3" width={120} height={120} src={url} alt="Preview" />
      </div>
    );
  } else {
    console.log(url);
    // Render a file icon with a download option for non-image files
    return (
      <div key={url} className="file-preview">
        <a href={url} download className="file-download">
          <img src={UserOne} alt="User" width={80} height={80} />
          <span>Download</span>
        </a>
      </div>
    );
  }
};

const AttachmentPreviews = ({ filePreviews }) => {
  return (
    <div className="attachment-previews">
      {filePreviews.map((url) => renderAttachment(url))}
    </div>
  );
};
export default AddClient;
