import { EyeIcon, PencilIcon, Trash2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import {
  pharmacyGroupCreationRequestsByPharmacyID,
  listTheIncidents,
  getTheClient,
} from '../graphql/queries';
import { generateClient } from 'aws-amplify/api';

const IncidenetsList = () => {
  const client = generateClient();

  const supportTickets = [
    {
      id: '001',
      subject: 'Server Down',
      location: 'New York Data Center',
      createdAt: '2024-08-15T09:30:00Z',
      description:
        'The main server is down and needs immediate attention. Multiple services are affected.',
    },
    {
      id: '002',
      subject: 'Email Issues',
      location: 'Los Angeles Office',
      createdAt: '2024-08-14T14:45:00Z',
      description:
        'Users are experiencing issues with receiving emails. The mail server might be down.',
    },
    {
      id: '003',
      subject: 'Network Latency',
      location: 'Chicago Branch',
      createdAt: '2024-08-13T11:15:00Z',
      description:
        'High network latency has been observed during peak hours. Investigation required.',
    },
    {
      id: '004',
      subject: 'Software Update Failure',
      location: 'San Francisco Office',
      createdAt: '2024-08-12T08:20:00Z',
      description:
        'The latest software update failed to install on multiple workstations. Rollback needed.',
    },
    {
      id: '005',
      subject: 'Database Backup Error',
      location: 'Miami Data Center',
      createdAt: '2024-08-11T07:50:00Z',
      description:
        'Scheduled database backup failed last night. Data integrity needs to be checked.',
    },
    {
      id: '006',
      subject: 'Security Breach',
      location: 'Dallas Headquarters',
      createdAt: '2024-08-10T18:10:00Z',
      description:
        'A potential security breach was detected in the main system. Immediate action required.',
    },
    {
      id: '007',
      subject: 'Printer Malfunction',
      location: 'Boston Office',
      createdAt: '2024-08-09T10:30:00Z',
      description:
        'The main office printer is malfunctioning, causing delays in document processing.',
    },
    {
      id: '008',
      subject: 'Power Outage',
      location: 'Seattle Data Center',
      createdAt: '2024-08-08T13:00:00Z',
      description:
        'A power outage occurred, affecting all servers in the Seattle Data Center.',
    },
  ];
  const [incidentList, setIncidentList] = useState([]);

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
      const sortedTasks = tasksWithClientName.sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
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
  const navigation = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
          Incident's List
        </h2>
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
