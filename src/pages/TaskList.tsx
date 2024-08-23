import { PencilIcon, Trash2 } from "lucide-react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import {
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

  const listTaskss = async () => {
    try {
      const driverData = await client.graphql({
        query: listTasks,
        variables: {},
      });
      const listTasksss = driverData.data.listTasks.items;
      setTaskList(listTasksss);
      console.log("listTasksss---", listTasksss);
    } catch (error) {
      console.error("Error fetching driver details:", error);
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

      listTaskss()
      console.log(`Item with ID ${id} has been deleted`);

      // Optionally, you can update the state to remove the deleted item from the list
      // For example, if you have a state called `orders`:
      // setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
        <div className="flex items-center justify-between">
          <h2 className="text-title-md2 font-semibold text-primary dark:text-white">
            Task List
          </h2>

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

        <div className="overflow-x-auto mt-10">
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
        </div>
    </>
  );
};
export default TaskList;
