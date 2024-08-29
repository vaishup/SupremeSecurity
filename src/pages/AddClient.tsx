import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { ArrowUpFromLine } from "@heroicons/react/outline";
import * as mutation from "../graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks from react-router-dom
import { uploadData } from "aws-amplify/storage";
import { useDropzone } from "react-dropzone";
import { getUrl } from "aws-amplify/storage";
import { Modal } from "antd";
import { Check } from "lucide-react";
import UserOne from '../images/document.png';

import { getTheClient, listTheStaffs } from "../graphql/queries";
const AddClient = () => {
  const API = generateClient();
  const { id } = useParams(); // Get the staff ID from the URL, if it exists
  const navigation = useNavigate();
  const [filePreviewss, setFilePreviewss] = useState<File[]>([]);
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
  const [clientId, setClientId] = useState();

  const getS3Url = async (key) => {
    try {
      const getUrlResult = await getUrl({
        key,
        options: {
          accessLevel: "guest", // Change as necessary (guest, private, protected)
        },
      });

      //console.log('Fetched file URL:', getUrlResult.url.toString()); // Log the URL for verification
      return getUrlResult.url.toString(); // Ensure the URL is returned as a string
    } catch (error) {
      console.error("Error getting S3 URL: ", error);
      throw error;
    }
  };
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

          if (client.attachments && Array.isArray(client.attachments)) {
            const urls = await Promise.all(
              client.attachments.map(async (attachment) => {
                return await getS3Url(attachment);
              })
            );
            console.log("urls...", urls);

            setFilePreviews(urls);
          }
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

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setFiles(selectedFiles);
    setFilePreviewss([...filePreviewss, ...selectedFiles]);

    // Generate file previews
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const handleFileChanges = (event) => {
    const selectedFiles = Array.from(event.target.files);
  
    setFiles(selectedFiles);
  
    // Generate file previews
    const previews = selectedFiles.map((file) => {
      const isImage = file.type.startsWith("image/");
      return {
        url: isImage ? URL.createObjectURL(file) : null, // Generate preview for image files only
        name: file.name,
        isImage: isImage, // Flag to check if the file is an image
      };
    });
  
    setFilePreviews([...filePreviews, ...previews]); // Append the new previews to existing ones
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
    if (!formData.name) errors.name = "Name is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.contactPersonPhone)
      errors.contactPersonPhone = "Contact person's phone number is required";
    if (!formData.address) errors.address = "Address is required";
    if (files.length > 10) {
      errors.fileUpload = "You can only upload up to 10 images.";
    }
    return errors;
  };
  const onDrop = (acceptedFiles: File[]) => {
    setFilePreviewss([...filePreviewss, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

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
      const createdItem = clientesponse.data.updateTheClient;
      const clientId = createdItem.id; // Replace with actual client ID
      //--------------------------- upload images to s3 bucket--------------------------------------
      try {
        const uploadedFiles = await Promise.all(
          filePreviewss.map((file) => uploadToS3s(file, clientId, file.name))
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
        console.log(createdItem, "suceesfully created");

        // Handle the success (e.g., update UI, make further API calls)
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle the error (e.g., display error message to user)
      }
      ///----------------- fetch images-----------------------------------------------
    } else {
      console.log("addedsd,,", clientInput);

      clientesponse = await API.graphql({
        query: mutation.createTheClient,
        variables: { input: clientInput },
      });
      console.log(clientInput);

      const createdItem = clientesponse.data.createTheClient;
      const clientId = createdItem.id; // Replace with actual client ID
      console.log("clientId...", clientId);

      //--------------------------- upload images to s3 bucket--------------------------------------
      try {
        const uploadedFiles = await Promise.all(
          filePreviewss.map((file) => uploadToS3s(file, clientId, file.name))
        );
        // const uploadedFileKey = await uploadToS3(files, clientId);
        console.log("Files uploaded successfully:", uploadedFiles);
        const updateInput = {
          id: clientId,
          attachments: uploadedFiles,
        };

        await API.graphql({
          query: mutation.updateTheClient,
          variables: { input: updateInput },
        });
        console.log(createdItem, "suceesfully created");
        setClientId(clientId);
        setIsOpen(true);
        // Handle the success (e.g., update UI, make further API calls)
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle the error (e.g., display error message to user)
      }
      // navigation("/clientlist");
      // Create a new client member
    }

    // navigation("/clientlist");
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
  function renderFilePreview(file) {
    if (file.type.startsWith("image/")) {
      // Render image preview
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-16 h-16 object-cover rounded"
        />
      );
    } else if (file.type === "application/pdf") {
      // Render PDF preview icon
      return <i className="fas fa-file-pdf text-red-500 text-3xl"></i>;
    } else {
      // Render generic file icon
      return <i className="fas fa-file text-gray-500 text-3xl"></i>;
    }
  }

  // const uploadToS3 = async (files, clientId) => {
  //   try {
  //     const uploadedKeys = await Promise.all(
  //       files.map(async (file, index) => {
  //         const folderNumber = index + 1; // Create folders like 1, 2, 3, etc.
  //         const fileName = file.name;
  //         const fullKey = `ClientImages/${clientId}/image/${folderNumber}/${fileName}`;

  //         console.log("Uploading file:", fileName, "to", fullKey);

  //         const result = await uploadData({
  //           key: fullKey,
  //           data: file,
  //           options: {
  //             accessLevel: "guest", // Change as necessary (guest, private, protected)
  //           },
  //         });

  //         console.log("Uploaded file key:", fullKey); // Log the key for verification
  //         return fullKey; // Return the key to use it in the mutation or elsewhere
  //       })
  //     );

  //     return uploadedKeys; // Return the array of uploaded file keys
  //   } catch (error) {
  //     console.error("Error uploading to S3: ", error);
  //     throw error; // Rethrow the error for handling in the calling function
  //   }
  // };
  const uploadToS3s = async (file, ticketId, fileName) => {
    try {
      console.log("sds..", file, ticketId, fileName);

      const fullKey = `ClientImages/${ticketId}/image/${fileName}`;

      const result = await uploadData({
        key: fullKey,
        data: file,
        options: {
          accessLevel: "guest", // Change as necessary (guest, private, protected)
        },
      });

      console.log("Uploaded file key:", fullKey); // Log the key for verification
      return fullKey; // Return the key to use it in the mutation
    } catch (error) {
      console.error("Error uploading to S3: ", error);
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
    navigation("/stafflist");
  };
  return (
    <>
      <Breadcrumb pageName={id ? "Edit Client" : "Add Client"} />
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
            {" "}
            OK{" "}
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
            <form onSubmit={handleSubmit}>
              <div className="p-6.5 ">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
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
  {errors.fileUpload && (
    <p className="text-red-500 mt-2">{errors.fileUpload}</p>
  )}

  <div className="mt-4 flex flex-wrap gap-4">
    {filePreviews.map((preview, index) => (
      <div key={index} className="m-3">
        {preview.isImage ? (
          <img
            width={120}
            height={120}
            src={preview.url}
            alt={`Preview ${index}`}
            className="rounded border border-gray-300"
          />
        ) : (
          <div className="flex items-center justify-center w-28 h-28 bg-gray-200 border border-gray-300 rounded">
           <img src={UserOne} alt="User" width={80}height={80} />

            <p className="text-xs mt-2">{preview.name}</p>
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
