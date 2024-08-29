import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { generateClient } from 'aws-amplify/api';

import * as mutation from '../graphql/mutations.js';
import {
  getTask,
  getTheClient,
  listTheStafftheClients,
  listTasks,
  listTheIncidents,
  getTheStaff,
  theStaffsByTheClientID,
  theStafftheClientsByTheClientId,
} from '../graphql/queries';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks from react-router-dom
import { FileIcon, Pencil, PencilIcon, Phone, Trash2 } from 'lucide-react';
import UserTwo from '../images/user/user-01.png';
import { getUrl } from 'aws-amplify/storage';
import UserOne from '../images/document.png';

interface TaskData {
  title: string;
  description: string;
  frequency: string;
  clientId: string;
}

const ClientDetails = () => {
  const [loading, setLoading] = useState(true); // Add loading state
  const client = generateClient();
  const { id } = useParams();
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [contactPersonPhone, setContactPersonPhone] = useState();
  const [address, setAddress] = useState();
  const [bname, setBname] = useState();

  const [filePreviews, setFilePreviews] = useState([]);
  const [IncidentList, setIncidentList] = useState([]);

  // Get the staff ID from the URL, if it exists
  const navigation = useNavigate();
  const [taskList, setTskist] = useState([]);
  const [staffList, setStaffList] = useState([]);
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
      const fetchclientData = async () => {
        try {
          let clientesponse;

          clientesponse = await client.graphql({
            query: getTheClient, // Replace with your actual query to get staff by ID
            variables: { id },
          });
          const clientData = clientesponse.data.getTheClient;

          if (clientData.attachments && Array.isArray(clientData.attachments)) {
            const urls = await Promise.all(
              clientData.attachments.map(async (attachment) => {
                return await getS3Url(attachment);
              }),
            );
            console.log('urls...', urls);

            setFilePreviews(urls);
          }
          setName(clientData.name);
          setEmail(clientData.email);
          setMobile(clientData.phoneno);
          setContactPersonPhone(clientData.contactPersonPhone);
          setAddress(clientData.address);
          setBname(clientData.bname);


          if (clientData.staffids && Array.isArray(clientData.staffids)) {
            const staffMembers = await Promise.all(
              clientData.staffids.map(async (staffId) => {
                const staffResponse = await client.graphql({
                  query: getTheStaff, // Replace with your actual query to get staff data
                  variables: { id: staffId },
                });
                return staffResponse.data.getTheStaff;
              }),
            );
            console.log("staffMembers",staffMembers);
            
            setStaffList(staffMembers);
          }
        } catch (error) {
          console.error('Error fetching staff data:', error);
        }
      };
      fetchclientData();
      listTask(id);
      listTheIncidentss(id);
     
    }
  }, [id]);

  const listTheIncidentss = async (id) => {
    try {
      const response = await client.graphql({
        query: listTheIncidents,
        variables: {
          filter: {
            clientid: {
              eq: id,
            },
          },
        },
      });
      const incidentData = response.data.listTheIncidents;
      setIncidentList(incidentData.items);
    } catch (error) {
      console.error('Error fetching client details:', error);
      setLoading(false);
    }
  };
  const listTask = async (id) => {
    try {
      const response = await client.graphql({
        query: listTasks,
        variables: {
          filter: {
            clientId: {
              eq: id,
            },
          },
        },
      });

      console.log('listTask', id);

      // Access the correct property from the response
      const clientData = response.data.listTasks;
      console.log('clientData', clientData);
      // Set the client data to state
      setTskist(clientData.items);
      setLoading(false); // Ensure you're setting the items array to state
    } catch (error) {
      console.error('Error fetching client details:', error);
      setLoading(false);
    }
  };



  // Handle form submission
  const [activeTab, setActiveTab] = useState('TaskList'); // State to manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Breadcrumb pageName={'Client Details'} />

      <div className=" mt-10  w-full h-full bg-white shadow-lg rounded-sm border border-stroke dark:border-strokedark dark:bg-boxdark">
        <div className="p-10">
          <div className="flex justify-between items-center  w-full">
            <h4 className="font-medium text-3xl text-black dark:text-white">
              {bname}
            </h4>
            <Pencil
              onClick={() => {
                navigation(`/addclient/${id}`); // Navigate to AddStaff page with the staff ID
              }}
              className="text-black dark:text-white cursor-pointer"
            />
          </div>
          <div className="mt-3">
            <p className="text-blue-800">Basic Info </p>

            <div className="tab-container">
              <div className="tab-content">
                <div className="info-row">
                  <div className="info-column">
                    <p>Name</p>
                    <strong>{name}</strong>
                  </div>
                  <div className="info-column">
                    <p>Mobile</p>
                    <strong>{mobile}</strong>
                  </div>
                  <div className="info-column">
                    <p>Email</p>
                    <strong>{email}</strong>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-column">
                    <p>Contact Person Phone</p>
                    <strong>{contactPersonPhone ? contactPersonPhone : 'N/A'}</strong>
                  </div>
                  <div className="info-column">
                    <p>Address</p>
                    <strong>{address}</strong>
                  </div>
                  <div className="info-column"></div>
                </div>
              </div>
            </div>

            {/* sdsd */}
          </div>
        </div>
      </div>
      <div className="mt-10 w-full h-full bg-white shadow-lg rounded-sm border border-stroke dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col">
          <h4 className=" p-4 font-medium text-xl text-black dark:text-white">
            Client's Documents
          </h4>
          <div className="mt-4 flex flex-wrap gap-4">

          <AttachmentPreviews filePreviews={filePreviews} />

            {filePreviews.map((preview, index) => (
              <img
                key={index}
                className="m-3"
                width={120}
                height={120}
                src={preview}
                alt={`Preview ${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        {/* Tab Navigation */}
        <div className="flex mt-4">
          <button
            onClick={() => handleTabClick('TaskList')}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === 'TaskList'
                ? 'border-[#7a2828]'
                : 'border-transparent'
            }`}
          >
            Task List
          </button>
          <button
            onClick={() => handleTabClick('IncidentList')}
            className={`ml-2 px-4 py-2 font-medium border-b-2 ${
              activeTab === 'IncidentList'
                ? 'border-[#7a2828]'
                : 'border-transparent'
            }`}
          >
            Incident List
          </button>
          <button
            onClick={() => handleTabClick('AssignedStaff')}
            className={`ml-2 px-4 py-2 font-medium border-b-2 ${
              activeTab === 'AssignedStaff'
                ? 'border-[#7a2828]'
                : 'border-transparent'
            }`}
          >
            Assigned Staffs
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-x-auto mt-10">
          {activeTab === 'TaskList' &&
            (taskList.length > 0 ? (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gradient-to-r from-[#7a2828] to-[#a73737]">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      Title
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      Description
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      CreatedAt
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      Frequency
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.title}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.description}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.updatedAt}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.frequency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No data found
              </div>
            ))}

          {activeTab === 'IncidentList' &&
            (IncidentList.length > 0 ? (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gradient-to-r from-[#7a2828] to-[#a73737]">
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      Title
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      Description
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      Address
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                      CreatedAt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {IncidentList.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.title}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.description}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.address}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                        {order.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No data found
              </div>
            ))}


{activeTab === 'AssignedStaff' &&
            (staffList.length > 0 ? (
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gradient-to-r from-[#7a2828] to-[#a73737]">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                    First Name{' '}
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                    Joining date
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {staffList.map((order, index) => (
                  <tr key={order.index}>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.fname}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.lname}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.phoneno}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.joiningdate}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No data found
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
const renderAttachment = (url) => {
  // Check if the file is an image
  const isImage = url.match(/\.(jpeg|jpg|gif|png)$/);

  if (isImage) {
    // Render an image preview
    return (
      <div key={url} className="file-preview">
        <img src={url} alt="attachment" className="image-preview" />
      </div>
    );
  } else {
    // Render a file icon with a download option
    return (
      <div key={url} className="file-preview">
        <a href={url} download className="file-download">
        <img src={UserOne} alt="User" width={80}height={80} />

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
export default ClientDetails;
