import CardDataStats from "../../components/CardDataStats";
import React, { useState, useEffect, useRef } from "react";
import { signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { useNavigate } from "react-router-dom"; // Import hooks from react-router-dom
import {
  listTheClients,
  listTheStaffs,
  listTasks,
} from "../../graphql/queries";
import { getTableID } from "../../hooks/authServices";
import ChartOne from "../../components/Charts/ChartOne";
import { Smile, UserRound ,Clipboard, ClipboardList, Users} from "lucide-react";
const ECommerce: React.FC = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const client = generateClient();
  const [stafflist, setStaffList] = useState([]);
  const [clientlist, setClientList] = useState([]);
  const [tasklist, settaskList] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    //handleLogout();
    listAllCounts();
    console.log("name", name);
  }, []);
  const handleLogout = async () => {
    try {
      const response = await signOut();
      console.log("signout response ", response);
      localStorage.removeItem("loginTimestamp");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };
  const listAllCounts = async () => {
    try {
      const taskData = await client.graphql({
        query: listTasks,
        variables: {},
      });
      const tasklist = taskData.data.listTasks.items;
      settaskList(tasklist);
      const staffData = await client.graphql({
        query: listTheStaffs,
        variables: {},
      });
      const staffList = staffData.data.listTheStaffs.items;
      setStaffList(staffList);
      const clientData = await client.graphql({
        query: listTheClients,
        variables: {},
      });
      const clientList = clientData.data.listTheClients.items;
      setClientList(clientList);
      const taskCount = taskData.data.listTasks.items.length;
      const staffCount = staffData.data.listTheStaffs.items.length;
      const clientCount = clientData.data.listTheClients.items.length;

      console.log("Number of tasks:", taskCount);
      console.log("Number of staff:", staffCount);
      console.log("Number of clients:", clientCount);

      const totalCount = taskCount + staffCount + clientCount;
      console.log("Total count of all items:", totalCount);

      // You can also set these counts to the state if you want to display them in the UI
      setTaskCount(taskCount);
      setStaffCount(staffCount);
      setClientCount(clientCount);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  const [userId, setUserId] = useState(null);
  const fetchBatch = async () => {
    const id = await getTableID();
    console.log(id);
  };
  useEffect(() => {
    // Define an asynchronous function to fetch the data
    fetchBatch();

    // Call the asynchronous function
  }, []);
  return (
    <>
      <div className="mb-4">
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Clients" total={clientCount}>
          <Smile color="brown"/>
          {/* <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg> */}
        </CardDataStats>
        <CardDataStats title="Total Tasks" total={taskCount}>
          <ClipboardList color="brown"/>
          {/* <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg> */}
        </CardDataStats>
        <CardDataStats title="Total Employees" total={staffCount}>
          <Users color="brown"/>
          {/* <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
              fill=""
            />
            <path
              d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
              fill=""
            />
          </svg> */}
        </CardDataStats>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-primary">
            Recently Added Tasks
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">
                    Title
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">
                    Description
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-bold">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasklist.slice(0, 5).map((order) => (
                  <tr key={order.title}>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.title}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.description}
                    </td>

                    <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                      {order.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="flex justify-center mt-4"
            onClick={() => {
              navigation("/tasklist");
            }}
          >
            <button className="px-4 py-2 bg-primary text-white rounded-full">
              See more
            </button>
          </div>
        </div>
        <div className="w-full h-[100] bg-white bg-white shadow-lg rounded-lg p-10 pr-10 ">
          <ChartOne
            totalClient={clientCount}
            totalStaff={staffCount}
            totalTask={taskCount}
          />
        </div>
      </div>

      {/* 
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default ECommerce;
