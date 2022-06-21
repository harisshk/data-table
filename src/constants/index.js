import { gql } from "@apollo/client";


export const states = ["Tamil Nadu", "Karnataka", "Kerala", "Maharastra", "West Bengal"]


export const CREATE_CANDIDATE = gql`
mutation CreateCandidate($name: String!, 
    $email: String!, 
    $state: String!,  
    $age: Int!){
      createCandidate(
        name:$name, 
        email:$email, 
        age:$age, 
        state:$state
        ){
        _id
        name
      }
 }
`;
export const UPDATE_CANDIDATE = gql`
mutation UpdateCandidate($name: String!, 
    $email: String!, 
    $state: String!,  
    $age: Int!,
    $id:ID!){
      updateCandidate(
        name:$name, 
        email:$email, 
        age:$age, 
        state:$state,
        id:$id
        ){
          name
          age
          email
          _id
          state
      }
 }
`;
export const DELETE_CANDIDATE = gql`
mutation DeleteCandidate( $id:ID! ){
      deleteCandidate(
        id:$id
        ){
          name
          age
          email
          _id
          state
      }
 }
`;

export const GET_ALL_CANDIDATES = gql`
query {
  candidates{
    name
    email
    age
    _id
  }
}
`

export const GET_CANDIDATES_BY_ID = gql`
query GetCandidateById($id:ID!){
  getCandidateById(id:$id){
    name
    email
    state
    age
    _id
  }
  }
`