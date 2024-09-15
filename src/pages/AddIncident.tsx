import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { ArrowUpFromLine } from 'lucide-react';
import {
  getTableID,
  getUserInfo,
  getDriverByUserId,
} from '../hooks/authServices';
import {
  pharmacyGroupCreationRequestsByPharmacyID,
  listTheIncidents,
  getTheIncidents,
  getTheStaff,
} from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import * as mutation from '../graphql/mutations.js';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks from react-router-dom
import { uploadData } from 'aws-amplify/storage';
import { useDropzone } from 'react-dropzone';
import { getUrl } from 'aws-amplify/storage';
import { setDate } from 'date-fns';
import { Modal } from 'antd';
import { Check } from 'lucide-react';
import UserOne from '../images/document.png';

const AddIncident = () => {
  const [staffname, setStaffName] = useState();
  const [staffid, setStaffId] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState();
  const [desc, setDec] = useState();
  const [dateTime, setTime] = useState();
  const [status, setStatus] = useState();
  const [files, setFiles] = useState([]);
  const { id, add } = useParams();
  const [filePreviewss, setFilePreviewss] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // Formats the date and time based on the user's locale
    setTime(formattedDateTime);
    console.log('ad....', add);

   
  }, []);
  const client = generateClient();

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
      const fetchTheIncidents = async () => {
        try {
          const incidentData = await API.graphql({
            query: getTheIncidents, // Replace with your actual query to get staff by ID
            variables: { id },
          });
          const incident = incidentData.data.getTheIncidents;
          setTitle(incident.title);
          setDec(incident.description);
          setLocation(incident.address);
          setTime(incident.dateTime);
          setStatus(incident.status);

          // Fetch client details based on clientid
          const clientData = await client.graphql({
            query: getTheStaff, // Replace with your actual query to get client by ID
            variables: { id: incident.staffid },
          });

          const getTheStaffs = clientData.data.getTheStaff;
          console.log('getTheStaff', getTheStaffs);
          setStaffName(getTheStaffs.fname + getTheStaffs.lname);
          setEmail(getTheStaffs.email);
          setStaffId(getTheStaffs.id);
          // Check if client data is available

          if (incident.attachments && Array.isArray(incident.attachments)) {
            const urls = await Promise.all(
              incident.attachments.map(async (attachment) => {
                return await getS3Url(attachment);
              }),
            );
            console.log('urls...', urls);
            setFilePreviews(urls);
          }
        } catch (error) {
          console.error('Error fetching staff data:', error);
        }
      };
      fetchTheIncidents();
    }
  }, [id]);
  const navigation = useNavigate();

  // const handleChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
  //   setFile(filePreviews);
  // };

  const validate = () => {
    const errors = {};
    if (!title) errors.name = 'title is required';
    if (!desc) errors.desc = 'Descriptionis required';
    if (!dateTime) errors.datetime = 'Date and Time is required';

    if (!location) errors.address = 'Address is required';
    if (files.length > 10) {
      errors.fileUpload = 'You can only upload up to 10 images.';
    }
    return errors;
  };
  const API = generateClient();

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const incidentInput = {
      title: title, // Assuming `title` is a variable holding the title value
      description: desc, // Assuming `desc` is a variable holding the description value
      address: location, // Assuming `address` is a variable holding the address value
      staffid: staffid,
      dateTime: dateTime,
      //attachments: attachments, // Assuming `attachments` is an array holding file attachments
      //conversationHistory: conversationHistory, // Assuming `conversationHistory` is an object/JSON string holding the conversation history
      status: status, // Assuming `status` is a variable holding the status of the incident
      //comments: comments // Assuming `comments` is a variable holding any additional comments
    };
    const incidentResponse = await API.graphql({
      query: mutation.updateTheIncidents,
      variables: { input: { id, ...incidentInput } },
    });
    const createdItem = incidentResponse.data.updateTheIncidents;
    console.log(createdItem);
   navigation("/incidenetsList");

    // try {
    //   const uploadedFiles = await Promise.all(
    //     filePreviewss.map((file) => uploadToS3s(file, incidentid, file.name))
    //   );
    //   // const uploadedFileKey = await uploadToS3(files, clientId);
    //   console.log("Files uploaded successfully:", uploadedFiles);
    //   const updateInput = {
    //     id: incidentid,
    //     attachments: uploadedFiles,
    //   };

    //   await API.graphql({
    //     query: mutation.updateTheIncidents,
    //     variables: { input: updateInput },
    //   });
    //   console.log(createdItem, "suceesfully created");
    //   setIsOpen(true);
    //   // setClientId(clientId);
    //   // setIsOpen(true);
    //   // Handle the success (e.g., update UI, make further API calls)
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    //   // Handle the error (e.g., display error message to user)
    // }
    // navigation("/dashboard");
  };
  /// file  upload-------------------

  const onDrop = (acceptedFiles: File[]) => {
    setFilePreviewss([...filePreviewss, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const uploadToS3s = async (file, ticketId, fileName) => {
    try {
      console.log('sds..', file, ticketId, fileName);

      const fullKey = `Incidents/${ticketId}/image/${fileName}`;

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
  const handleDialogue = () => {
    setIsOpen(false);
    navigation(`/dashboard`);
  };

  const handleCancle = () => {
    setIsOpen(false);
    navigation('/dashboard');
  };
  return (
    <>
      <Breadcrumb pageName="Edit Incident" />
      <Modal
        open={isOpen}
        onCancel={handleCancle}
        footer={[
          // <button
          //   className="text-black mr-5  h-[30px] w-[60px] border border-gray-500 hover:bg-black-600 rounded-lg"
          //   key="back"
          //   onClick={() => setIsOpen(false)}
          // >
          //   Cancel
          // </button>,
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
            Incident added Successfully
          </p>
          <p className="text-xl font-semibold text-center mb-2">Thank you!!!</p>
        </div>
      </Modal>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Incident's information
              </h3>
            </div>
            <div className="p-6.5 ">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Staff's Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    readOnly
                    value={staffname}
                    onChange={(e) => setStaffName(e.target.value)} // Update the state with the new value
                    type="text"
                    placeholder="Enter your first Name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Staff's Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    readOnly
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter your  Email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4.5  w-full flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="Title"
                    placeholder="Enter your Title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date & Time
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={dateTime}
                    onChange={(e) => setDate(e.target.value)}
                    type="text"
                    placeholder="Enter your    Date & Time"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.datetime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.datetime}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Location <span className="text-meta-1">*</span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Enter Location"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <div className="">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDec(e.target.value)}
                  placeholder="Type your Description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Status
                </label>
                <select
                  name="frequency"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.frequency ? 'border-red-500' : ''} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </select>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                {filePreviews.length === 0 ? (
                  <p className="text-center text-black font-bold w-full p-10">
                    {' '}
                    No documents uploaded yet.
                  </p>
                ) : (
                  <>
                    <AttachmentPreviews filePreviews={filePreviews} />

                    {/* {filePreviews.map((preview, index) => (
        <img
          key={index}
          className="m-3"
          width={120}
          height={120}
          src={preview}
          alt={`Preview ${index}`}
        />
      ))} */}
                  </>
                )}
              </div>

              {errors.desc && (
                <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
              )}

              {/* <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Submit
                  </button> */}
              <button className="btn-grad w-full p-3" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const renderAttachment = (url) => {
  // Check if the file is an image
  const isImage = url.match(/\.(jpeg|jpg|gif|png|PNG)(\?.*)?$/);
  if (isImage) {
    // Render an image preview
    return (
      <div key={url} className="file-preview">
        <img className="m-3" width={120} height={120} src={url} />
        {/* <img src={url} alt="attachment" className="image-preview" /> */}
      </div>
    );
  } else {
    // Render a file icon with a download option
    return (
      <div key={url} className="file-preview">
        <a href={url} download className="file-download">
          <img src={UserOne} alt="User" width={80} height={80} />

          {/* Replace with a file icon */}
          <span>Download </span>
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
export default AddIncident;
