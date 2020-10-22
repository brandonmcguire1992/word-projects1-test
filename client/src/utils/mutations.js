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
mutation addProject($title: String!,$ideasText:String!) {
  addProject(title:$title,ideasText:$ideasText) {
    _id   
     firstName
     lastName    
    	projects {
        title
        ideasText
        date
      }
   }
}
`;