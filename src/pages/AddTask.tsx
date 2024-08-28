import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { generateClient } from "aws-amplify/api";

import * as mutation from "../graphql/mutations.js";
import { getTask } from "../graphql/queries";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks from react-router-dom

interface TaskData {
  title: string;
  description: string;
  frequency: string;
  clientId: string;
}

const AddTask = () => {
  const [loading, setLoading] = useState(true); // Add loading state

  const API = generateClient();
  const { id, clientid } = useParams();

  let edit = "edit";
  if (id === "null") {
    edit = "add";
  } else {
    edit = "edit";
  }

  // Get the staff ID from the URL, if it exists
  const navigation = useNavigate();
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    if (clientid) {
      setTaskData((prevData) => ({
        ...prevData,
        clientId: clientid,
      }));
    }
  }, [clientid]);

  // State to manage form inputs
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
    frequency: "",
    clientId: "",
  });
  useEffect(() => {
    if (id) {
      const fetchTaskData = async () => {
        try {
          let clientesponse;

          clientesponse = await API.graphql({
            query: getTask, // Replace with your actual query to get staff by ID
            variables: { id },
          });
          const task = clientesponse.data.getTask;
          setTaskData({
            title: task.title,
            description: task.description,
            frequency: task.frequency,
            clientId: task.clientId,
          });
        } catch (error) {
          console.error("Error fetching staff data:", error);
        }
      };
      fetchTaskData();
    }
  }, [id]);
  // State to manage form validation errors
  const [errors, setErrors] = useState<Partial<TaskData>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
      [e.target.name]: e.target.value,
    });
  };
  const client = generateClient();

  const listTheClient = /* GraphQL */ `
    query ListTheClients(
      $filter: ModelTheClientFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listTheClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          bname
          address
        }
        nextToken
        __typename
      }
    }
  `;
  useEffect(() => {
    listClient();
  }, []);

  const listClient = async () => {
    try {
      const response = await client.graphql({
        query: listTheClient,
        variables: {},
      });
      // Access the correct property from the response
      const clientData = response.data.listTheClients;
      console.log("clientData", clientData);
      // Set the client data to state
      setClientList(clientData.items);
      setLoading(false); // Ensure you're setting the items array to state
    } catch (error) {
      console.error("Error fetching client details:", error);
      setLoading(false);
    }
  };
  const validate = () => {
    const errors: Partial<TaskData> = {};
    if (!taskData.title) errors.title = "Title is required";
    if (!taskData.description) errors.description = "Description is required";
    if (!taskData.frequency) errors.frequency = "Frequency is required";
    return errors;
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const taskInput = {
        title: taskData.title, // Mapping to 'title' field
        description: taskData.description, // Mapping to 'description' field
        frequency: taskData.frequency, // Mapping to 'frequency' field
        clientId: taskData.clientId,
      };
      let taskResponse;
      if (id !== "null") {
        taskResponse = await API.graphql({
          query: mutation.updateTask,
          variables: { input: { id, ...taskInput } },
        });
      } else {
        taskResponse = await API.graphql({
          query: mutation.createTask,
          variables: { input: taskInput },
        });
      }
      navigation("/tasklist");
      const createdItem = taskResponse.data.createTask;
      setTaskData({
        title: "",
        description: "",
        frequency: "",
        clientId: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName={id ? "Edit Task" : "Add Task"} />
      <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
          <h3 className="font-medium text-black dark:text-white mb-6">
            Task's Details
          </h3>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Location
              </label>
              <select
                name="clientId"
                value={taskData.clientId}
                onChange={handleChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.clientId ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select Location</option>
                {clientList.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.bname} - {client.address}{" "}
                    {/* Assuming you have an address field */}
                  </option>
                ))}
              </select>
              {errors.clientId && (
                <p className="text-red-500 text-sm mt-1">{errors.clientId}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={taskData.title}
                onChange={handleChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.title ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={3}
                name="description"
                placeholder="Enter Description"
                value={taskData.description}
                onChange={handleChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.description ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Frequency
              </label>
              <select
                name="frequency"
                value={taskData.frequency}
                onChange={handleChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary ${errors.frequency ? "border-red-500" : ""} dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select Frequency</option>
                <option value="Every Day">Every Day</option>
                <option value="Every Week">Every Week</option>
                <option value="Every Month">Every Month</option>
                <option value="Every Year">Every Year</option>
              </select>
              {errors.frequency && (
                <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>
              )}
            </div>

            <button type="submit" className="btn-grad w-full py-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
