import { client } from './client';

export async function signupUser(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

export async function getUser() {
  const response = await client.auth.user();

  return response.user;
}

export async function getMessages() {
  const response = await client.query({
    query: gql`
      query {
        messages {
          id
          text
          createdAt
          user {
            id
            name
          }
        }
      }
    `
  });

  return response.data.messages;
}

export async function getRooms() {
  const response = await client.query({
    query: gql`
      query {
        rooms {
          id
          name
        }
      }
    `
  });

  return response.data.rooms;
}