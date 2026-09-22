const USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  const response = await fetch(USERS_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchUserById(id) {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}