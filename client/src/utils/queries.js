import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName    
  }
}
`;

export const ME = gql`
{
     user {
    firstName
    lastName
    email
    projectCount        
    projects {
       title
       ideasText
      date
    }
    
  }     
}
`;