import { signUp, signIn, fetchUserAttributes } from "@aws-amplify/auth";
import { generateClient } from "@aws-amplify/api";
const client = generateClient();

type SignUpParam = {
  username: string;
  email: string;
  password: string;
  phone_number: string;
  dOB: string;
};

export async function signUpUser({ username, password, email, phone_number }) {
  try {
    const signUpResponse = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          phone_number, // Make sure phone_number is in E.164 format
        },
        autoSignIn: {
          // If you want to enable auto sign-in after registration, set this to true
          enabled: false,
        },
      },
    });

    return signUpResponse;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function getTableID() {
  try {
    const user = await fetchUserAttributes();
    return user["custom:TableID"];
  } catch (err) {
    console.log(err);
  }
}

export async function getCustomAttributes() {
  try {
    const user = await fetchUserAttributes();
    const tableID = user["custom:TableID"];

    return {
      tableID,

    };
  } catch (err) {
    console.log("Error fetching custom attributes:", err);
    throw err;
  }
}

export async function getUserInfo() {
  try {
    const user = await fetchUserAttributes();
    const tableID = user["custom:TableID"];

    const userInfo = `
    query MyQuery($id:ID!){
      getUsers(id: $id) {
        email
        full_name
        id
        phone
        driverType
        dOB
      }
    }
    `;
    const { data } = await client.graphql({
      query: userInfo,
      variables: { id: tableID },
    });
    const { getUsers } = data;
    return getUsers;
  } catch (err) {
    console.log("err in getUserInfo...", err);
  }
}

export async function getOtherUserInfo(userId: string) {
  try {
    const tableID = userId;

    const userInfo = `
    query MyQuery($id:ID!){
      getUsers(id: $id) {
        email
        full_name
        id
        phone
        userType
        dOB
      }
    }
    `;
    const { data } = await client.graphql({
      query: userInfo,
      variables: { id: tableID },
    });
    const { getUsers } = data;
    return getUsers;
  } catch (err) {
    console.log("err in getUserInfo...", err);
  }
}

// need query from sherman : get driving license by user id
export async function getLicenseInfoByUserId() {
  try {
    const user = await fetchUserAttributes();
    const tableID = user["custom:TableID"];
    const query = `
    `;
  } catch (Err) {
    console.error("error in getUserLicenseInfo....", Err);
  }
}

export async function getPhramacyByUserId(userId: string) {
  try {
    const query = `
    query MyQuery {
      getPharmacyUser(id: "${userId}") {
            id
      email
      phone
      full_name
      position
      notiTokenAndroid
      address
      pharmacyID
      }
    }
    
    `;
    const driverDetail = await client.graphql({
      query: query,
    });
    return driverDetail?.data.getPharmacyUser;
  } catch (err) {
    console.log("err...", err);
  }
}
