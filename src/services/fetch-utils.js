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
    // when the key name and the variable name match, we can just do this as a shorthand and it works the same
    .insert({ user_name, user_sign })
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

export async function getZodiac(sign, day = 'today') {
  // nice idea to leave the query parameter for `day` in there for future scalability--maybe one day, somebody will want to add a feature that uses a dynamic day property, and this will give them a hint about where to start. We could make it even more explicit with a default parmeter, like above
  const URL = `/.netlify/functions/astro-endpoint?sign=${sign}&day=${day}`;
  return fetch(URL)
    .then(response => response.json())
    .then(json => {
      return (
        json
      );
    });
}