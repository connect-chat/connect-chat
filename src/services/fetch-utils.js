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
export async function createProfile(user_name, user_sign) {
  const { data } = await client
    .from('chat_profiles')
    .insert({ user_name: user_name, user_sign: user_sign })
    .single();
  return data;
}

// this function gets called from the provider any time any page loads
// if theres already a username it will be set in global state
export async function getProfile() {
  const user = getUser();
  if (user) {
    const profileRsp = await client.from('chat_profiles').select('*').eq('user_id', user.id).single();
    const profile = checkError(profileRsp);
    return profile;
  }
}