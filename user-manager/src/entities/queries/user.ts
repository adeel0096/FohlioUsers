import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
      status
      createdDate
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String, $role: String, $status: String) {
    addUser(name: $name, email: $email, role: $role, status: $status) {
      name
      email
      role
      status
    }
  }
`;;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String!, $email: String, $role: String, $status: String) {
    updateUser(id: $id, name: $name, email: $email, role: $role, status: $status) {
      id
      name
      email
      role
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;