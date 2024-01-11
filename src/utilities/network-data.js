let BASE_URL = '';

if (import.meta.env.MODE === 'development:msw')
  BASE_URL = 'https://mocked-api.dev/api';
else BASE_URL = import.meta.env.VITE_BASE_URL || '';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password, fetchSignal = null }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ email, password }),
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, message: responseJson.message, data: null };
  }

  return {
    error: false,
    message: responseJson.message,
    data: responseJson.data,
  };
}

async function register({ name, email, password, fetchSignal = null }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, message: responseJson.message };
  }

  return { error: false, message: null };
}

async function getUserLogged({ fetchSignal = null } = {}) {
  const response = await fetchWithToken(`${BASE_URL}/users/me`, {
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addNote({ title, body, fetchSignal = null }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getActiveNotes({ fetchSignal = null } = {}) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getArchivedNotes({ fetchSignal = null } = {}) {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`, {
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getNote({ id, fetchSignal = null }) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    signal: fetchSignal,
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  addNote,
  archiveNote,
  deleteNote,
  getAccessToken,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  getUserLogged,
  login,
  putAccessToken,
  register,
  unarchiveNote,
};
