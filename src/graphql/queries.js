/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTheClient = /* GraphQL */ `
  query GetTheClient($id: ID!) {
    getTheClient(id: $id) {
      id
      name
      phoneno
      bname
      email
      contactpersonpho
      address
      note
      attachments
      thestaffID
      thestaffs {
        nextToken
        __typename
      }
      theIncidents {
        id
        title
        description
        clientid
        address
        attachments
        conversationHistory
        status
        comments
        staffid
        dateTime
        createdAt
        updatedAt
        theIncidentsTheStaffId
        theIncidentsTheClientId
        theIncidentsBytheClientIDId
        __typename
      }
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const listTheClients = /* GraphQL */ `
  query ListTheClients(
    $filter: ModelTheClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        phoneno
        bname
        email
        contactpersonpho
        address
        note
        attachments
        thestaffID
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const theClientsByThestaffID = /* GraphQL */ `
  query TheClientsByThestaffID(
    $thestaffID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModeltheClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theClientsByThestaffID(
      thestaffID: $thestaffID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        phoneno
        bname
        email
        contactpersonpho
        address
        note
        attachments
        thestaffID
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTheStaff = /* GraphQL */ `
  query GetTheStaff($id: ID!) {
    getTheStaff(id: $id) {
      id
      fname
      phoneno
      lname
      email
      joiningdate
      address
      theClients {
        nextToken
        __typename
      }
      clientIds
      theClient {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTheStaffs = /* GraphQL */ `
  query ListTheStaffs(
    $filter: ModelTheStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheStaffs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fname
        phoneno
        lname
        email
        joiningdate
        address
        clientIds
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      title
      description
      frequency
      theClient {
        id
        name
        phoneno
        bname
        email
        contactpersonpho
        address
        note
        attachments
        thestaffID
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      clientId
      createdAt
      updatedAt
      taskTheClientId
      __typename
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        frequency
        clientId
        createdAt
        updatedAt
        taskTheClientId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTheIncidents = /* GraphQL */ `
  query GetTheIncidents($id: ID!) {
    getTheIncidents(id: $id) {
      id
      title
      description
      clientid
      address
      attachments
      conversationHistory
      status
      comments
      theStaff {
        id
        fname
        phoneno
        lname
        email
        joiningdate
        address
        clientIds
        createdAt
        updatedAt
        __typename
      }
      staffid
      dateTime
      theClient {
        id
        name
        phoneno
        bname
        email
        contactpersonpho
        address
        note
        attachments
        thestaffID
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      bytheClientID {
        id
        name
        phoneno
        bname
        email
        contactpersonpho
        address
        note
        attachments
        thestaffID
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      createdAt
      updatedAt
      theIncidentsTheStaffId
      theIncidentsTheClientId
      theIncidentsBytheClientIDId
      __typename
    }
  }
`;
export const listTheIncidents = /* GraphQL */ `
  query ListTheIncidents(
    $filter: ModelTheIncidentsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheIncidents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        clientid
        address
        attachments
        conversationHistory
        status
        comments
        staffid
        dateTime
        createdAt
        updatedAt
        theIncidentsTheStaffId
        theIncidentsTheClientId
        theIncidentsBytheClientIDId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phoneNo
      userType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phoneNo
        userType
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTheStafftheClient = /* GraphQL */ `
  query GetTheStafftheClient($id: ID!) {
    getTheStafftheClient(id: $id) {
      id
      theClientId
      theStaffId
      theClient {
        id
        name
        phoneno
        bname
        email
        contactpersonpho
        address
        note
        attachments
        thestaffID
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      theStaff {
        id
        fname
        phoneno
        lname
        email
        joiningdate
        address
        clientIds
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTheStafftheClients = /* GraphQL */ `
  query ListTheStafftheClients(
    $filter: ModelTheStafftheClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTheStafftheClients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        theClientId
        theStaffId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const theStafftheClientsByTheClientId = /* GraphQL */ `
  query TheStafftheClientsByTheClientId(
    $theClientId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTheStafftheClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theStafftheClientsByTheClientId(
      theClientId: $theClientId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        theClientId
        theStaffId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const theStafftheClientsByTheStaffId = /* GraphQL */ `
  query TheStafftheClientsByTheStaffId(
    $theStaffId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTheStafftheClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theStafftheClientsByTheStaffId(
      theStaffId: $theStaffId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        theClientId
        theStaffId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
