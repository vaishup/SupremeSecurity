import { EyeIcon, PencilIcon, Trash2, Mail } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
  pharmacyGroupCreationRequestsByPharmacyID,
  listTheIncidents,
  getTheClient,
} from '../graphql/queries';
import { Modal } from 'antd';

import axios from 'axios';

import { generateClient } from 'aws-amplify/api';

const IncidenetsList = () => {
  const client = generateClient();

  const [incidentList, setIncidentList] = useState([]);
  const [mailto, setMailto] = useState();
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); // State to store the selected item id

  useEffect(() => {
    listIncident();
  }, []);

  const listIncident = async () => {
    try {
      const incidentdata = await client.graphql({
        query: listTheIncidents,
        variables: {},
      });
      const incidentdatas = incidentdata.data.listTheIncidents.items;
      console.log('incidentdatas...', incidentdatas);

      const tasksWithClientName = await Promise.all(
        incidentdatas.map(async (task) => {
          // Fetch client details based on clientid
          const clientData = await client.graphql({
            query: getTheClient, // Replace with your actual query to get client by ID
            variables: { id: task.clientid },
          });

          const clients = clientData.data.getTheClient;

          // Check if client data is available
          if (clients && clients.bname) {
            // Add client bname to the task object
            return { ...task, clientBname: clients.bname };
          } else {
            console.warn(`Client not found for task with ID ${task.id}`);
            // Return the task without modifying it
            return { ...task, clientBname: 'Unknown Client' }; // Default value if client is not found
          }
        }),
      );
      // const pendingTasks = tasksWithClientName.filter(
      //   (task) => task.status === "pending"
      // );
      const sortedTasks = tasksWithClientName.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setIncidentList(sortedTasks);
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };
  const handleMailIconClick = (itemId) => {
    setSelectedItemId(itemId); // Store the item id
    setIsOpen(true); // Open the modal
  };
  const navigation = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');

  // const sendEmail = async (id) => {
  //   console.log(id);

  //   const apiUrl = 'https://kwe0mvlph9.execute-api.us-east-2.amazonaws.com/default/sendReportMail-dev';

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST', // Assuming it's a POST request
  //       headers: {
  //         'Content-Type': 'application/json', // Set content type if you're sending JSON
  //       },
  //       body: JSON.stringify({
  //         id: id, // Pass any data required by the function
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     console.log('Email sent successfully:', data);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // };

  const sendEmail = async () => {
    // Set loading state to true
    try {
      const response = await axios.post(
        'https://kwe0mvlph9.execute-api.us-east-2.amazonaws.com/default/sendReportMail-dev', // Replace with your API Gateway URL
        { selectedItemId,mailto }, // Passing id in the body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Lambda response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error calling Lambda function:', error);
      // Handle error if necessary
    } finally {
      // Set loading state to false
    }
  };

  const handleSubmit = async () => {
    if (!mailto) {
      setError('Email id is Required');
    } else {
      console.log(mailto);
      setIsOpen(false)
      sendEmail()
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
          Incident's List
        </h2>

        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={
            [
             
            ]
          }
        >
          <div className="flex flex-col ">
            {/* Success Icon */}
            <div className="flex  pl-10 pr-10 bg-gray-100">
              <div className="bg-white w-full max-w-xl">
                  <div className="flex flex-col  xl:flex-row">
                    <div className="w-full mt-4 ">
                      <label className="block text-black dark:text-white">
                        Mail to <span className="text-meta-1">*</span>
                      </label>
                      <input
                        value={mailto}
                        onChange={(e) => setMailto(e.target.value)}
                        type="text"
                        name="firstName"
                        placeholder="Enter Email"
                        className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${
                          error ? 'border-red-500' : ''
                        } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}

                  <button onClick={handleSubmit} className="mt-4 btn-grad w-full py-3" type="submit">
                    Submit
                  </button>
              </div>
            </div>
          </div>
        </Modal>
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="Approved">Approved</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        {incidentList.length > 0 ? (
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
                  Client Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                  Created Date
                </th>

                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {incidentList
                .filter(
                  (order) =>
                    selectedStatus === 'All' || order.status === selectedStatus,
                )
                .map((order) => (
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
                      {order.clientBname}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`px-2 py-1 rounded  font-semibold ${
                          order.status === 'Approved'
                            ? ''
                            : order.status === 'pending'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-red-500'
                        }`}
                        style={{
                          backgroundColor:
                            order.status === 'Approved' ? '#00cc66' : undefined,
                          color:
                            order.status === 'Approved' ? 'white' : undefined,
                        }}
                      >
                        {order.status === 'pending' ? 'Pending' : order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm flex-row">
                      <div className="flex flex-row">
                        <PencilIcon
                          onClick={() => {
                            navigation(`/addIncident/${order.id}`);
                          }}
                          className="mr-5 inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"
                          color="blue"
                          size={20}
                        />
                        <Mail
                                 color="black"                   className="mr-5 inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"

                          onClick={() => {
                            handleMailIconClick(order.id)
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-10 text-gray-500">No data found</div>
        )}
      </div>
    </>
  );
};
export default IncidenetsList;
