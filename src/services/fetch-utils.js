import { checkError, client } from './client';

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
}

export function getUser() {
  const response = client.auth.user();

  return response;
}
export async function createUserName(user_name) {
  const { data } = await client
    .from('chat_profiles')
    .insert({ user_name: user_name })
    .single();
  return data;
}

export async function getProfile() {
  const user = getUser();
  if (user) {
    const profileRsp = await client.from('chat_profiles').select('*').eq('user_id', user.id).single();
    const profile = checkError(profileRsp);
    return profile;
  }
}