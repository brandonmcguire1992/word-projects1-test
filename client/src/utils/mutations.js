import gql from 'graphql-tag';

export const LOGIN = gql`
mutation login($email:String!,$password: String!) {
  login(email:$email, password:$password) {
     token
    user {
      _id
      firstName
      lastName
      email        
      projects {
         title
      }
      projectCount
    }
  }		
}
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!,$lastName:String!,$email:String!,$password:String!) {
  addUser(firstName:$firstName,lastName:$lastName, email:$email,password:$password) {
    token
    user {
      firstName
      _id
      lastName
      email        
      projects {
         title
      }
      projectCount
    }
  }
}
`;

export const ADD_PROJECT=gql`
mutation addProject($project:projectInput){
  addProject(project:$project){
        projects {
        title
        ideasText
        date
      }
   }
}
`;

export const DELETE_PROJECT=gql`
mutation deleteProject($_id:ID){
  deleteProject(_id:$_id){
   _id
   }
}
`;

export const EDIT_PROJECT=gql`
mutation editProject($project:projectInput){
  editProject(project:$project){
    _id   
        projects {
        title
        ideasText
        date
      }
   }
}
`;
export const ADD_BULK_PROJECT=gql`
mutation addBulkProject($project:[projectInput]){
  addBulkProject(project:$project){
    projects{
      title
      ideasText
      date
    }
  }
}

`;