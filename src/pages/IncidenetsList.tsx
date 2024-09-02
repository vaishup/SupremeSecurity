import { EyeIcon, PencilIcon, Trash2 } from "lucide-react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
  pharmacyGroupCreationRequestsByPharmacyID,
  listTheIncidents,
  getTheClient,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const IncidenetsList = () => {
  const client = generateClient();

  const supportTickets = [
    {
      id: "001",
      subject: "Server Down",
      location: "New York Data Center",
      createdAt: "2024-08-15T09:30:00Z",
      description:
        "The main server is down and needs immediate attention. Multiple services are affected.",
    },
    {
      id: "002",
      subject: "Email Issues",
      location: "Los Angeles Office",
      createdAt: "2024-08-14T14:45:00Z",
      description:
        "Users are experiencing issues with receiving emails. The mail server might be down.",
    },
    {
      id: "003",
      subject: "Network Latency",
      location: "Chicago Branch",
      createdAt: "2024-08-13T11:15:00Z",
      description:
        "High network latency has been observed during peak hours. Investigation required.",
    },
    {
      id: "004",
      subject: "Software Update Failure",
      location: "San Francisco Office",
      createdAt: "2024-08-12T08:20:00Z",
      description:
        "The latest software update failed to install on multiple workstations. Rollback needed.",
    },
    {
      id: "005",
      subject: "Database Backup Error",
      location: "Miami Data Center",
      createdAt: "2024-08-11T07:50:00Z",
      description:
        "Scheduled database backup failed last night. Data integrity needs to be checked.",
    },
    {
      id: "006",
      subject: "Security Breach",
      location: "Dallas Headquarters",
      createdAt: "2024-08-10T18:10:00Z",
      description:
        "A potential security breach was detected in the main system. Immediate action required.",
    },
    {
      id: "007",
      subject: "Printer Malfunction",
      location: "Boston Office",
      createdAt: "2024-08-09T10:30:00Z",
      description:
        "The main office printer is malfunctioning, causing delays in document processing.",
    },
    {
      id: "008",
      subject: "Power Outage",
      location: "Seattle Data Center",
      createdAt: "2024-08-08T13:00:00Z",
      description:
        "A power outage occurred, affecting all servers in the Seattle Data Center.",
    },
  ];
  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    listIncident();
  }, []);
  console.log("incidentList", incidentList);

  const listIncident = async () => {
    try {
      const incidentdata = await client.graphql({
        query: listTheIncidents,
        variables: {},
      });
      const incidentdatas = incidentdata.data.listTheIncidents.items;

      const tasksWithClientName = await Promise.all(
        incidentdatas.map(async (task) => {
          console.log("clientId...", task.clientId);

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
            return { ...task, clientBname: "Unknown Client" }; // Default value if client is not found
          }
        })
      );
      const pendingTasks = tasksWithClientName.filter(
        (task) => task.status === "pending"
      );

      setIncidentList(pendingTasks);
    } catch (error) {
      console.error("Error fetching driver details:", error);
    }
  };
  const navigation = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
          Incident's List
        </h2>
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
            CreatedAt
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {incidentList.map((order) => (
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
              {order.createdAt}
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
    <div className="text-center py-10 text-gray-500">
      No data found
    </div>
  )}
</div>

    </>
  );
};
export default IncidenetsList;
