import { Pencil, PencilIcon, Trash2 } from "lucide-react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/api";
import {
  pharmacyGroupCreationRequestsByPharmacyID,
  listTheClients,
} from "../graphql/queries";
import * as mutation from "../graphql/mutations.js";

const ClientList = () => {
  const [clientList, setClientList] = useState([]);
  const client = generateClient();

  const activeOrders = [
    {
      id: "001",
      name: "Alice Smith",
      phoneNo: "123-456-7890",
      contactphone: "234-567-8901",
      email: "alice.smith@example.com",
      address: "123 Maple Street, Springfield, IL",
    },
    {
      id: "002",
      name: "Bob Johnson",
      phoneNo: "234-567-8901",
      contactphone: "234-567-8901",
      email: "bob.johnson@example.com",
      address: "456 Oak Avenue, Lincoln, NE",
    },
    {
      id: "003",
      name: "Charlie Brown",
      phoneNo: "345-678-9012",
      contactphone: "234-567-8901",
      email: "charlie.brown@example.com",
      address: "789 Pine Road, Columbus, OH",
    },
    {
      id: "004",
      name: "Diana Prince",
      phoneNo: "456-789-0123",
      contactphone: "234-567-8901",
      email: "diana.prince@example.com",
      address: "101 Cedar Lane, Gotham City, NJ",
    },
    {
      id: "005",
      name: "Eve Adams",
      phoneNo: "567-890-1234",
      contactphone: "234-567-8901",
      email: "eve.adams@example.com",
      address: "202 Birch Boulevard, Metropolis, NY",
    },
    {
      id: "006",
      name: "Frank Wright",
      phoneNo: "678-901-2345",
      contactphone: "234-567-8901",
      email: "frank.wright@example.com",
      address: "303 Elm Street, Star City, CA",
    },
    {
      id: "007",
      name: "Grace Hopper",
      phoneNo: "789-012-3456",
      contactphone: "234-567-8901",
      email: "grace.hopper@example.com",
      address: "404 Willow Way, Central City, KS",
    },
    {
      id: "008",
      name: "Hank Green",
      phoneNo: "890-123-4567",
      contactphone: "234-567-8901",
      email: "hank.green@example.com",
      address: "505 Fir Drive, Keystone City, CO",
    },
    {
      id: "009",
      name: "Ivy Clarkson",
      phoneNo: "901-234-5678",
      contactphone: "234-567-8901",
      email: "ivy.clarkson@example.com",
      address: "606 Spruce Circle, Coast City, OR",
    },
    {
      id: "010",
      name: "Jack Daniels",
      phoneNo: "012-345-6789",
      contactphone: "234-567-8901",
      email: "jack.daniels@example.com",
      address: "707 Poplar Street, Starling City, WA",
    },
  ];
  const navigation = useNavigate();
  const handleDelete = async (id) => {
    try {
      // Confirm deletion with the user (optional)
      // const confirmed = window.confirm(
      //   "Are you sure you want to delete this item?"
      // );
      // if (!confirmed) return;

      // Perform the delete mutation
      await client.graphql({
        query: mutation.deleteTheClient, // Replace with your actual mutation
        variables: { input: { id } },
      });

      listClient();
      console.log(`Item with ID ${id} has been deleted`);

      // Optionally, you can update the state to remove the deleted item from the list
      // For example, if you have a state called `orders`:
      // setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    listClient();
  }, []);
  const listClient = async () => {
    try {
      const staffdata = await client.graphql({
        query: listTheClients,
        variables: {},
      });
      const clientData = staffdata.data.listTheClients.items;
      setClientList(clientData);
    } catch (error) {
      console.error("Error fetching driver details:", error);
    }
  };
  const filteredClients = clientList.filter(
    (client) =>
      client.bname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phoneno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactpersonpho
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-title-md2 font-semibold text-Sidebar dark:text-white">
          Client List
        </h2>
        <div className="flex flex-row">
          <div className="relative w-[300px] mr-3">
            <input
              style={{ background: "#e0e0e0" }} // Lighter gray background
              type="text"
              placeholder="Search client by businessname/phone no/email..."
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
              navigation("/addclient");
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
            Add New Client
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-10">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-gradient-to-r from-[#7a2828] to-[#a73737]">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Business Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                PHONE NO
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                EMAIL
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Contact Phone
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Address
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-white text-left text-sm uppercase font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
  <a
    href={`/clientdetail/${order.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
    {order.bname}
  </a>
</td>

                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.phoneno}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.contactpersonpho}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm">
                  {order.address}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 bg-white text-sm flex-row">
                  <div className="flex flex-row">
                    <PencilIcon
                      onClick={() => {
                        navigation(`/addclient/${order.id}`); // Navigate to AddStaff page with the staff ID
                      }}
                      className="mr-5 inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"
                      color="blue"
                      size={20}
                    />
                    <Trash2
                      onClick={() => handleDelete(order.id)}
                      className="inline-block transition duration-300 ease-in-out transform hover:text-red-600 hover:scale-110"
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
export default ClientList;
