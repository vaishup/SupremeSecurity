/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTheNote = /* GraphQL */ `
  subscription OnCreateTheNote($filter: ModelSubscriptionTheNoteFilterInput) {
    onCreateTheNote(filter: $filter) {
      id
      note
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTheNote = /* GraphQL */ `
  subscription OnUpdateTheNote($filter: ModelSubscriptionTheNoteFilterInput) {
    onUpdateTheNote(filter: $filter) {
      id
      note
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTheNote = /* GraphQL */ `
  subscription OnDeleteTheNote($filter: ModelSubscriptionTheNoteFilterInput) {
    onDeleteTheNote(filter: $filter) {
      id
      note
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateThePost = /* GraphQL */ `
  subscription OnCreateThePost($filter: ModelSubscriptionThePostFilterInput) {
    onCreateThePost(filter: $filter) {
      id
      note
      date
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateThePost = /* GraphQL */ `
  subscription OnUpdateThePost($filter: ModelSubscriptionThePostFilterInput) {
    onUpdateThePost(filter: $filter) {
      id
      note
      date
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteThePost = /* GraphQL */ `
  subscription OnDeleteThePost($filter: ModelSubscriptionThePostFilterInput) {
    onDeleteThePost(filter: $filter) {
      id
      note
      date
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTheResident = /* GraphQL */ `
  subscription OnCreateTheResident(
    $filter: ModelSubscriptionTheResidentFilterInput
  ) {
    onCreateTheResident(filter: $filter) {
      id
      Name
      phoneNo
      address
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTheResident = /* GraphQL */ `
  subscription OnUpdateTheResident(
    $filter: ModelSubscriptionTheResidentFilterInput
  ) {
    onUpdateTheResident(filter: $filter) {
      id
      Name
      phoneNo
      address
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTheResident = /* GraphQL */ `
  subscription OnDeleteTheResident(
    $filter: ModelSubscriptionTheResidentFilterInput
  ) {
    onDeleteTheResident(filter: $filter) {
      id
      Name
      phoneNo
      address
      clientID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTheClient = /* GraphQL */ `
  subscription OnCreateTheClient(
    $filter: ModelSubscriptionTheClientFilterInput
  ) {
    onCreateTheClient(filter: $filter) {
      id
      name
      phoneno
      bname
      email
      contactpersonpho
      address
      note
      attachments
      staffids
      theStaff {
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
      count
      countInt
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const onUpdateTheClient = /* GraphQL */ `
  subscription OnUpdateTheClient(
    $filter: ModelSubscriptionTheClientFilterInput
  ) {
    onUpdateTheClient(filter: $filter) {
      id
      name
      phoneno
      bname
      email
      contactpersonpho
      address
      note
      attachments
      staffids
      theStaff {
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
      count
      countInt
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const onDeleteTheClient = /* GraphQL */ `
  subscription OnDeleteTheClient(
    $filter: ModelSubscriptionTheClientFilterInput
  ) {
    onDeleteTheClient(filter: $filter) {
      id
      name
      phoneno
      bname
      email
      contactpersonpho
      address
      note
      attachments
      staffids
      theStaff {
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
      count
      countInt
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const onCreateTheStaff = /* GraphQL */ `
  subscription OnCreateTheStaff($filter: ModelSubscriptionTheStaffFilterInput) {
    onCreateTheStaff(filter: $filter) {
      id
      fname
      phoneno
      lname
      email
      joiningdate
      theClientID
      address
      clientIds
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
        staffids
        count
        countInt
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      staffType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTheStaff = /* GraphQL */ `
  subscription OnUpdateTheStaff($filter: ModelSubscriptionTheStaffFilterInput) {
    onUpdateTheStaff(filter: $filter) {
      id
      fname
      phoneno
      lname
      email
      joiningdate
      theClientID
      address
      clientIds
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
        staffids
        count
        countInt
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      staffType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTheStaff = /* GraphQL */ `
  subscription OnDeleteTheStaff($filter: ModelSubscriptionTheStaffFilterInput) {
    onDeleteTheStaff(filter: $filter) {
      id
      fname
      phoneno
      lname
      email
      joiningdate
      theClientID
      address
      clientIds
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
        staffids
        count
        countInt
        createdAt
        updatedAt
        theClientTheIncidentsId
        __typename
      }
      staffType
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
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
        staffids
        count
        countInt
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
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
        staffids
        count
        countInt
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
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
        staffids
        count
        countInt
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
export const onCreateTheIncidents = /* GraphQL */ `
  subscription OnCreateTheIncidents(
    $filter: ModelSubscriptionTheIncidentsFilterInput
  ) {
    onCreateTheIncidents(filter: $filter) {
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
        theClientID
        address
        clientIds
        staffType
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
        staffids
        count
        countInt
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
        staffids
        count
        countInt
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
export const onUpdateTheIncidents = /* GraphQL */ `
  subscription OnUpdateTheIncidents(
    $filter: ModelSubscriptionTheIncidentsFilterInput
  ) {
    onUpdateTheIncidents(filter: $filter) {
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
        theClientID
        address
        clientIds
        staffType
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
        staffids
        count
        countInt
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
        staffids
        count
        countInt
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
export const onDeleteTheIncidents = /* GraphQL */ `
  subscription OnDeleteTheIncidents(
    $filter: ModelSubscriptionTheIncidentsFilterInput
  ) {
    onDeleteTheIncidents(filter: $filter) {
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
        theClientID
        address
        clientIds
        staffType
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
        staffids
        count
        countInt
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
        staffids
        count
        countInt
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
