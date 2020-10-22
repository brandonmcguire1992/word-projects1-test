const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Project{
  _id: ID
  title:String
  ideasText:String
  date:String
}

type User {
    _id: ID
    firstName:String
    lastName:String
    email:String    
    projects:[Project]
    projectCount:Int
  }

input projectInput{
  _id: ID
  title:String
  ideasText:String
  date:String
}

type Auth {
  token: ID
  user: User
}

type Query {
  me: User
  users: [User]
  user(firstName: String!): User  
  }

type Mutation {
    addUser(firstName:String!, lastName:String!, email:String!, password:String!): Auth   
    login(email: String!, password: String!): Auth
    addProject(project:projectInput):User
    deleteProject(_id:ID):User
    editProject(project:projectInput):User
}
`;

module.exports = typeDefs;
