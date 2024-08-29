const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Assuming event contains clientIds array and a staffId
  const { clientIds, staffId } = event;

  if (!clientIds || clientIds.length === 0 || !staffId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'clientIds array and staffId are required' }),
    };
  }

  try {
    for (const clientId of clientIds) {
      console.log(`Processing clientId: ${clientId}`);

      // Fetch the existing client record
      const getParams = {
        TableName: 'theClient-t5hrmxaoynel5apikrxqtm3bfq-dev', // Replace with your DynamoDB table name
        Key: {
          id: clientId,
        },
      };

      const clientData = await dynamodb.get(getParams).promise();
      const client = clientData.Item;

      if (!client) {
        console.log(`Client not found for id: ${clientId}`);
        continue;
      }

      // Update the staffIds array
      let staffIds = client.staffids || [];
      if (!staffIds.includes(staffId)) {
        staffIds.push(staffId);

        const updateParams = {
          TableName: 'theClient-t5hrmxaoynel5apikrxqtm3bfq-dev', // Replace with your DynamoDB table name
          Key: {
            id: clientId,
          },
          UpdateExpression: 'SET staffids = :staffids',
          ExpressionAttributeValues: {
            ':staffids': staffIds,
          },
          ReturnValues: 'UPDATED_NEW',
        };

        await dynamodb.update(updateParams).promise();
        console.log(`Updated staffIds for clientId: ${clientId}`);
      } else {
        console.log(`StaffId ${staffId} already exists for clientId: ${clientId}`);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Staff IDs updated successfully for all clients' }),
    };
  } catch (error) {
    console.error('Error updating staffIds:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
