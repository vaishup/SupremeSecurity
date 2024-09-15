/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTheClientPerson = /* GraphQL */ `
  mutation CreateTheClientPerson(
    $input: CreateTheClientPersonInput!
    $condition: ModelTheClientPersonConditionInput
  ) {
    createTheClientPerson(input: $input, condition: $condition) {
      id
      clientID
      name
      phone
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTheClientPerson = /* GraphQL */ `
  mutation UpdateTheClientPerson(
    $input: UpdateTheClientPersonInput!
    $condition: ModelTheClientPersonConditionInput
  ) {
    updateTheClientPerson(input: $input, condition: $condition) {
      id
      clientID
      name
      phone
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTheClientPerson = /* GraphQL */ `
  mutation DeleteTheClientPerson(
    $input: DeleteTheClientPersonInput!
    $condition: ModelTheClientPersonConditionInput
  ) {
    deleteTheClientPerson(input: $input, condition: $condition) {
      id
      clientID
      name
      phone
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTheNote = /* GraphQL */ `
  mutation CreateTheNote(
    $input: CreateTheNoteInput!
    $condition: ModelTheNoteConditionInput
  ) {
    createTheNote(input: $input, condition: $condition) {
      id
      note
      clientID
      staffID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTheNote = /* GraphQL */ `
  mutation UpdateTheNote(
    $input: UpdateTheNoteInput!
    $condition: ModelTheNoteConditionInput
  ) {
    updateTheNote(input: $input, condition: $condition) {
      id
      note
      clientID
      staffID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTheNote = /* GraphQL */ `
  mutation DeleteTheNote(
    $input: DeleteTheNoteInput!
    $condition: ModelTheNoteConditionInput
  ) {
    deleteTheNote(input: $input, condition: $condition) {
      id
      note
      clientID
      staffID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createThePost = /* GraphQL */ `
  mutation CreateThePost(
    $input: CreateThePostInput!
    $condition: ModelThePostConditionInput
  ) {
    createThePost(input: $input, condition: $condition) {
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
export const updateThePost = /* GraphQL */ `
  mutation UpdateThePost(
    $input: UpdateThePostInput!
    $condition: ModelThePostConditionInput
  ) {
    updateThePost(input: $input, condition: $condition) {
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
export const deleteThePost = /* GraphQL */ `
  mutation DeleteThePost(
    $input: DeleteThePostInput!
    $condition: ModelThePostConditionInput
  ) {
    deleteThePost(input: $input, condition: $condition) {
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
export const createTheResident = /* GraphQL */ `
  mutation CreateTheResident(
    $input: CreateTheResidentInput!
    $condition: ModelTheResidentConditionInput
  ) {
    createTheResident(input: $input, condition: $condition) {
      id
      Name
      phoneNo
      address
      clientID
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTheResident = /* GraphQL */ `
  mutation UpdateTheResident(
    $input: UpdateTheResidentInput!
    $condition: ModelTheResidentConditionInput
  ) {
    updateTheResident(input: $input, condition: $condition) {
      id
      Name
      phoneNo
      address
      clientID
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTheResident = /* GraphQL */ `
  mutation DeleteTheResident(
    $input: DeleteTheResidentInput!
    $condition: ModelTheResidentConditionInput
  ) {
    deleteTheResident(input: $input, condition: $condition) {
      id
      Name
      phoneNo
      address
      clientID
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTheClient = /* GraphQL */ `
  mutation CreateTheClient(
    $input: CreateTheClientInput!
    $condition: ModelTheClientConditionInput
  ) {
    createTheClient(input: $input, condition: $condition) {
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
      residentType
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const updateTheClient = /* GraphQL */ `
  mutation UpdateTheClient(
    $input: UpdateTheClientInput!
    $condition: ModelTheClientConditionInput
  ) {
    updateTheClient(input: $input, condition: $condition) {
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
      residentType
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const deleteTheClient = /* GraphQL */ `
  mutation DeleteTheClient(
    $input: DeleteTheClientInput!
    $condition: ModelTheClientConditionInput
  ) {
    deleteTheClient(input: $input, condition: $condition) {
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
      residentType
      createdAt
      updatedAt
      theClientTheIncidentsId
      __typename
    }
  }
`;
export const createTheStaff = /* GraphQL */ `
  mutation CreateTheStaff(
    $input: CreateTheStaffInput!
    $condition: ModelTheStaffConditionInput
  ) {
    createTheStaff(input: $input, condition: $condition) {
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
        residentType
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
export const updateTheStaff = /* GraphQL */ `
  mutation UpdateTheStaff(
    $input: UpdateTheStaffInput!
    $condition: ModelTheStaffConditionInput
  ) {
    updateTheStaff(input: $input, condition: $condition) {
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
        residentType
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
export const deleteTheStaff = /* GraphQL */ `
  mutation DeleteTheStaff(
    $input: DeleteTheStaffInput!
    $condition: ModelTheStaffConditionInput
  ) {
    deleteTheStaff(input: $input, condition: $condition) {
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
        residentType
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
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
        residentType
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
        residentType
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
        residentType
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
export const createTheIncidents = /* GraphQL */ `
  mutation CreateTheIncidents(
    $input: CreateTheIncidentsInput!
    $condition: ModelTheIncidentsConditionInput
  ) {
    createTheIncidents(input: $input, condition: $condition) {
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
        residentType
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
        residentType
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
export const updateTheIncidents = /* GraphQL */ `
  mutation UpdateTheIncidents(
    $input: UpdateTheIncidentsInput!
    $condition: ModelTheIncidentsConditionInput
  ) {
    updateTheIncidents(input: $input, condition: $condition) {
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
        residentType
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
        residentType
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
export const deleteTheIncidents = /* GraphQL */ `
  mutation DeleteTheIncidents(
    $input: DeleteTheIncidentsInput!
    $condition: ModelTheIncidentsConditionInput
  ) {
    deleteTheIncidents(input: $input, condition: $condition) {
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
        residentType
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
        residentType
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
