import { gql} from '@apollo/client'

export const REGISTER_USER = gql`
mutation RegisterUser($userId: String!, $userName: String!, $password: String!) {
  register( input : {
    userId: $userId,
    userName: $userName,
    password: $password
    }
  ) {
    userId
    userName
  }
}
`

export const LOGIN_USER = gql`
mutation LoginUser($userId: String!, $password: String!) {
  login( input : {
        userId: $userId,
        password: $password
    }
    ) 
}
`

export const ADD_TO_PROJ = gql`
mutation AddToProject($userId: String!, $projectId: String!) {
    add_allowed_user(input:{ userId : $userId , projectId : $projectId }) {
        allowedUsers
    }
}
`
export const CREATE_PROJECT = gql`
mutation CreateProject($userId: String!, $projectId: String! , $projectName : String!) {
    create_project(input:{ userId : $userId , project : {
        projectName : $projectName,
        createdBy : $userId,
        allowedUsers : [$userId],
        language : "cmake",
        projectId : $projectId
    } }) {
        userId
        
    }
}
`

export const SAVE_CODE = gql`
mutation SaveCode($projectId: String!, $content: String!) {
    save_code(input:{ content : $content , projectId : $projectId }) {
        content
    }
}
`



export const ALL_USERS = gql`
query {
  users {
    userId
    userName
  }
}
`

export const USER_DATA = gql`
query UserByID($userId : String!) {
    user(input : {userId: $userId}) {
        userId
        userName
        allowedProjects {
          content
          createdBy
          allowedUsers
          projectId
          projectName
          language
    
        }
        createdProjects {
          content
          createdBy
          allowedUsers
          projectId
          projectName
          language
        }
        }
      }
`

export const GET_PROJECTS = gql`
query Project($projectId: String!) {
    project(input: {projectId : $projectId}) {
      allowedUsers
      content
      createdBy
      language
      projectName
      
    }
  }
`















