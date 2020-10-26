import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query ($firstName: String!) {
    user(firstName: $firstName) {
          firstName
          lastName				       
          projects {
             title
             ideasText
             date
          }
      projectCount
    }
  }
`;

export const ME = gql`
{
me{  
  _id
  firstName
  lastName   
  projects{
    _id
    title
    ideasText
    date      
  }
   projectCount     
 }
}
`;

export const ALL_PROJECTS=gql`
query{
  users{  
    _id
    firstName
    lastName   
    projects{
      _id
      title
      ideasText
      date      
    }
     projectCount     
  }
}
`;
