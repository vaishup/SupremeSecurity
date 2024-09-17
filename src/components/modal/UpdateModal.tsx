import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { Flex, Spin } from 'antd';
import * as mutation from '../../graphql/mutations.js';
import axios from 'axios';
import flatpickr from 'flatpickr';
import { generateClient } from 'aws-amplify/api';
import { useNavigate } from 'react-router-dom'; // Import hooks from react-router-dom
import {
  pharmacyGroupCreationRequestsByPharmacyID,
  listTheStaffs,
  getTheClient,
} from '../../graphql/queries';
const UpdateModal = ({ id, setIsShow }) => {
  console.log('id', id);

  const [isDialogShow, setIsDialogShow] = useState(false); // State to track if the dialog is open
  const [isModalShow, setIsModalShow] = useState(false); // State to track if the dialog is open
  const [selectedDClients, setSelectedClients] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const client = generateClient();
  const [loading, setLoading] = useState(true); // Add loading state
  const [errorMessage, setErrorMessage] = useState('');
  const [clientList, setClientList] = useState([]);
  const navigation = useNavigate();

  const handleDialogue = () => {
    setIsShow(true);
    setIsModalShow(false);
  };
  const handleCancle = () => {
    navigation('/stafflist');
    setIsModalShow(false);
    setIsShow(false);
  };
  useEffect(() => {
    if (isModalShow) {
      setSelectedClients([]); // Clear the selected clients array when the modal is opened
    }
  }, [isModalShow]); // Run when `isModalShow` changes

  useEffect(() => {
    listClient();
  }, []);

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
        }
        nextToken
        __typename
      }
    }
  `;

  const listClient = async () => {
    try {
      const response = await client.graphql({
        query: listTheClient,
        variables: {},
      });

      // Access the correct property from the response
      const clientData = response.data.listTheClients;

      console.log('clientData', clientData);

      // Set the client data to state
      setClientList(clientData.items);
      setLoading(false); // Ensure you're setting the items array to state
    } catch (error) {
      console.error('Error fetching client details:', error);
      setLoading(false);
    }
  };
  const triggerCreateBatchFunction = async (patientOrdersArray) => {
    console.log('patientOrdersArray..', patientOrdersArray);

    //setLoading(true); // Show loader
    try {
      setLoading(true);
      const response = await axios.post(
        'https://1k3mfl4tnb.execute-api.us-east-2.amazonaws.com/default/UpdateStaffIdInClient-dev',
        { orders: patientOrdersArray },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      //navigation(`/batchList`);

      console.log('Lambda response:', response.data);
      return response.data;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (selectedDClients.length === 0) {
      setErrorMessage('Please select at least one Client.');
      return;
    } else {
      //setErrorMessage('');
      try {
        const input = {
          id: id,
          clientIds: selectedDClients,
        };
        const updateTheStaffs = await client.graphql({
          query: mutation.updateTheStaff,
          variables: { input }, // Note the { input } wrapping here
        });

        // console.log('input...', input);
        // const transformedInput = {
        //   clientIds: input.clientIds,
        //   staffId: input.id, // Use the staff id here
        // };

        for (const clientId of input.clientIds) {
          try {
            // Step 1: Fetch the existing client record
            const clientData = await client.graphql({
              query: getTheClient, // Assuming `getTheClient` is your query to fetch client data
              variables: { id: clientId },
            });

            const existingClient = clientData.data.getTheClient;
            console.log('existingClient', existingClient);

            let existingStaffIds = existingClient.staffids || []; // Retrieve or initialize the staffIds array
            console.log('existingStaffIds', existingStaffIds);

            // Step 2: Add new staff ID if it's not already in the array
            if (!existingStaffIds.includes(input.id)) {
              existingStaffIds.push(input.id);

              // Step 3: Update the client record with the new staffIds array
              const updateTheClient = await client.graphql({
                query: mutation.updateTheClient, // Assuming `updateTheClient` is your mutation to update client data
                variables: {
                  input: {
                    id: clientId,
                    staffids: existingStaffIds, // Update staffIds array
                  },
                },
              });
              console.log(`Updated staffIds for clientId: ${clientId}`);
              console.log(`Updated staffIds for clientId: ${updateTheClient}`);
            } else {
              console.log(
                `StaffId ${input.id} already exists for clientId: ${clientId}`,
              );
            }
          } catch (error) {
            console.error(
              `Error updating staffIds for clientId: ${clientId}`,
              error,
            );
          }
        }
        //console.log('transformInnput ids ', transformedInput);

        //triggerCreateBatchFunction(transformedInput);

        console.log('updateTheStaffs...', updateTheStaffs);

        setIsShow(false);
        setIsDialogShow(false);
        setIsModalShow(true);
        console.log('Update result:', updateTheStaffs);
      } catch (error) {
        console.error('updateTheStaffs:', error);
      }
    }
  };

  const handleCheckboxChange = (event, client) => {
    if (event.target.checked) {
      setSelectedClients([...selectedDClients, client]);
    } else {
      setSelectedClients(selectedDClients.filter((d) => d !== client));
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handFetch = () => {
    setIsModalShow(false);
    navigation('/stafflist');
  };
  //   // Filter driverGroups based on the search value

  const filteredclients = clientList.filter((driver) =>
    driver.bname.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  return (
    <>
      {' '}
      {loading ? (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      ) : (
        <>
          <div>
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-bold font-medium text-lg">Select Clients</p>

              <div className="relative w-[300px] mt-5">
                <input
                  style={{ background: '#f2f2f2' }}
                  type="text"
                  placeholder="Search for Client..."
                  className="w-full pl-10 pr-2 py-1 rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <span className="absolute inset-y-0 left-1 flex items-center pl-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
              <div className="w-full h-64 overflow-y-auto mt-4">
                {filteredclients.map((driver) => (
                  <div
                    key={driver.id}
                    className="flex items-center justify-between p-4 m-3 rounded-lg shadow-lg bg-white"
                  >
                    <div>
                      <p className="font-medium">{driver.bname}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedDClients.includes(driver.id)}
                      onChange={(e) => handleCheckboxChange(e, driver.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {/* {!loading && ( */}
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
              <div className="">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded ml-10"
                  onClick={handleAssign}
                >
                  Assign
                </button>

                <button
                  className="border border-gray-400 px-4 py-2 rounded ml-3"
                  onClick={handleCancle}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
              {/* )} */}
            </div>
          </div>

          <Modal
            open={isModalShow}
            onCancel={handleCancle}
            footer={[
              <Button
                className="text-black bg-white border-gray-300 hover:bg-gray-100"
                key="back"
                onClick={handFetch}
              >
                OK
              </Button>,
            ]}
          >
            <div className="flex flex-col items-center justify-center p-8">
              <p className="text-2xl font-bold text-green-500 mb-2">Success!</p>
              <p className="text-lg text-gray-700 mb-4">
                Your Clients has been successfully assigned. Thank you!!!!
              </p>
              <div className="flex items-center justify-center rounded-full bg-green-100 p-6 mb-4">
                <svg
                  className="h-16 w-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default UpdateModal;
