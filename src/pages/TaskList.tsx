import { PencilIcon, Trash2 } from "lucide-react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import {
  getTheClient,
  pharmacyGroupCreationRequestsByPharmacyID,
  listTasks,
} from "../graphql/queries";
import * as mutation from "../graphql/mutations.js";

const TaskList = () => {
  const tasks = [
    {
      id: "001",
      title: "Daily Backup",
      description:
        "Perform daily backup of all databases and critical systems.",
      frequency: "Daily",
      createdDate: "2024-08-14",
    },
    {
      id: "002",
      title: "Weekly Security Audit",
      description:
        "Conduct a weekly audit of all security protocols and update any necessary patches.",
      frequency: "Weekly",
      createdDate: "2024-08-07",
    },
    {
      id: "003",
      title: "Monthly Report Generation",
      description:
        "Generate and submit monthly performance and financial reports to the management team.",
      frequency: "Monthly",
      createdDate: "2024-08-01",
    },
    {
      id: "004",
      title: "Quarterly System Maintenance",
      description:
        "Carry out quarterly maintenance of all physical and virtual servers.",
      frequency: "Quarterly",
      createdDate: "2024-07-15",
    },
    {
      id: "005",
      title: "Annual Disaster Recovery Test",
      description:
        "Perform an annual test of the disaster recovery plan to ensure readiness in case of an emergency.",
      frequency: "Annually",
      createdDate: "2024-01-10",
    },
  ];
  const [taskList, setTaskList] = useState([]);

  const navigation = useNavigate();
  useEffect(() => {
    listTaskss();
  }, []);
  const client = generateClient();
  const [searchQuery, setSearchQuery] = useState("");

  const listTaskss = async () => {
    try {
      const driverData = await client.graphql({
        query: listTasks,
        variables: {},
      });
      const listTasksss = driverData.data.listTasks.items;

      // Fetch client details for each task and add bname
      const tasksWithClientName = await Promise.all(
        listTasksss.map(async (task) => {
          // Fetch client details based on clientid
          const clientData = await client.graphql({
            query: getTheClient, // Replace with your actual query to get client by ID
            variables: { id: task.clientId },
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

      // Set the updated task list
      setTaskList(tasksWithClientName);
      console.log("Tasks with Client Names:", tasksWithClientName);
    } catch (error) {
      console.error("Error fetching tasks or client details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Confirm deletion with the user (optional)
      // const confirmed = window.confirm(
      //   "Are you sure you want to delete this item?"
      // );
      // if (!confirmed) return;

      // Perform the delete mutation
      await client.graphql({
        query: mutation.deleteTask, // Replace with your actual mutation
        variables: { input: { id } },
      });

      listTaskss();
      console.log(`Item with ID ${id} has been deleted`);

      // Optionally, you can update the state to remove the deleted item from the list
      // For example, if you have a state called `orders`:
      // setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const filteredTasks = taskList.filter(
    (client) =>
      client.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.frequency.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
          Task List
        </h2>
        <div className="flex flex-row">
          <div className="relative w-[300px] mr-3">
            <input
              style={{ background: "#e0e0e0" }} // Lighter gray background
              type="text"
              placeholder="Search Task by Title/Decription/Frequency..."
              className="w-full pl-10 pr-3 py-2 rounded-[10px] bg-[#e0e0e0] text-gray-700 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute inset-y-0 left-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.2-4.95a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </span>
          </div>
          <button
            className="btn-grad w-[180px] pr-20"
            onClick={() => {
              navigation("/addTask");
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add New Task
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
      {taskList.length > 0 ? (
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gradient-to-r from-[#7a2828] to-[#a73737]">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Title
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Business Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Description
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Createdat
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Frequency
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.title}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.clientBname}
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
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm flex-row">
                  <div className="flex flex-row">
                    <PencilIcon
                      onClick={() => {
                        navigation(`/addTask/${order.id}`); // Navigate to AddStaff page with the staff ID
                      }}
                      className="mr-5 inline-block transition duration-300 ease-in-out transform hover:text-black hover:scale-110"
                      color="blue"
                      size={20}
                    />
                    <Trash2
                      onClick={() => handleDelete(order.id)}
                      className="inline-block transition duration-300 ease-in-out transform  hover:text-black hover:scale-110"
                      color="red"
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
export default TaskList;
