import { HttpResponse, delay, http } from 'msw';
import { nanoid } from 'nanoid';
import validator from 'validator';
import initialNotes from './utils/initial-data';

const BASE_URL = 'https://mocked-api.dev/api';

const users = new Map();

users.set('naruto@konoha.co.jp', {
  id: 'user-1',
  email: 'naruto@konoha.co.jp',
  name: 'Naruto Uzumaki',
  password: 'rasengan',
});

const notes = new Map();

initialNotes.forEach((note) => {
  const noteId = `note-${nanoid()}`;
  notes.set(noteId, {
    ...note,
    id: noteId,
    owner: 'user-1',
  });
});

export const handlers = [
  http.post(`${BASE_URL}/register`, async ({ request }) => {
    const { name, email, password } = await request.json();

    await delay();

    if (name.trim() === '') {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '"name" is not allowed to be empty',
        },
        { status: 400 },
      );
    }

    if (!validator.isEmail(email)) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '"email" must be a valid email',
        },
        { status: 400 },
      );
    }

    if (users.get(email)) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'Email already use',
        },
        { status: 400 },
      );
    }

    if (password < 1) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '"password" is not allowed to be empty',
        },
        { status: 400 },
      );
    }

    const userId = `user-${nanoid()}`;

    await delay(3000);

    users.set(email, {
      id: userId,
      name,
      email,
      password,
    });

    initialNotes.forEach((note) => {
      const noteId = `note-${nanoid()}`;
      notes.set(noteId, {
        ...note,
        id: noteId,
        owner: userId,
      });
    });

    return HttpResponse.json(
      {
        status: 'success',
      },
      {
        status: 201,
      },
    );
  }),
  http.post(`${BASE_URL}/login`, async ({ request }) => {
    const { email, password } = await request.json();

    await delay();

    if (!validator.isEmail(email)) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '"email" must be a valid email',
          data: null,
        },
        { status: 400 },
      );
    }

    if (users.get(email) === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'Email not found',
          data: null,
        },
        { status: 400 },
      );
    }

    if (password < 1) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '"password" is not allowed to be empty',
          data: null,
        },
        { status: 400 },
      );
    }

    if (users.get(email).password !== password) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'Password is wrong',
          data: null,
        },
        { status: 400 },
      );
    }

    await delay(3000);

    return HttpResponse.json({
      status: 'success',
      message: 'User logged successfully',
      data: {
        accessToken: users.get(email).email,
      },
    });
  }),
  http.get(`${BASE_URL}/users/me`, async ({ request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];

    await delay();

    if (users.get(accessToken) === undefined) {
      await delay();
      return HttpResponse.json(
        {
          status: 'failed',
          message: '',
          data: null,
        },
        { status: 401 },
      );
    }

    await delay(2000);

    const userFound = users.get(accessToken);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'User retrieved',
        data: {
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        },
      },
      { status: 200 },
    );
  }),
  http.post(`${BASE_URL}/notes`, async ({ request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];

    await delay();

    if (users.get(accessToken) === undefined) {
      await delay();

      return HttpResponse.json(
        {
          status: 'failed',
          message: '',
          data: null,
        },
        { status: 401 },
      );
    }

    const { title, body } = await request.json();

    const ownerData = users.get(accessToken);

    const newNote = {
      id: `note-${nanoid()}`,
      title,
      body,
      owner: ownerData.id,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    await delay(3000);

    notes.set(newNote.id, newNote);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Note created',
        data: newNote,
      },
      { status: 201 },
    );
  }),
  http.get(`${BASE_URL}/notes`, async ({ request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];

    await delay();

    if (users.get(accessToken) === undefined) {
      await delay();
      return HttpResponse.json(
        {
          status: 'failed',
          message: '',
          data: null,
        },
        { status: 401 },
      );
    }

    await delay(3000);

    const userId = users.get(accessToken).id;

    const activeNotes = [...notes.values()]
      .filter((note) => note.owner === userId)
      .filter((note) => note.archived === false);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Notes retrieved',
        data: activeNotes,
      },
      { status: 200 },
    );
  }),
  http.get(`${BASE_URL}/notes/archived`, async ({ request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];

    await delay();

    if (users.get(accessToken) === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '',
          data: null,
        },
        { status: 401 },
      );
    }

    await delay(3000);

    const userId = users.get(accessToken).id;

    const archivedNotes = [...notes.values()]
      .filter((note) => note.owner === userId)
      .filter((note) => note.archived);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Notes retrieved',
        data: archivedNotes,
      },
      { status: 200 },
    );
  }),
  http.get(`${BASE_URL}/notes/:id`, async ({ params, request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];

    await delay();

    if (users.get(accessToken) === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: '',
          data: null,
        },
        { status: 401 },
      );
    }

    const reqNoteId = params.id;

    await delay(3000);

    const noteData = notes.get(reqNoteId);

    if (noteData === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'You are not allowed to access this note',
          data: null,
        },
        { status: 403 },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Note retrieved',
        data: noteData,
      },
      { status: 200 },
    );
  }),
  http.post(`${BASE_URL}/notes/:id/archive`, async ({ params, request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];
    const reqNoteId = params.id;

    await delay();

    if (users.get(accessToken) === undefined) {
      await delay();
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    await delay(3000);

    const noteData = notes.get(reqNoteId);

    if (noteData === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'You are not allowed to access this note',
          data: null,
        },
        { status: 403 },
      );
    }

    await delay(3000);

    notes.set(reqNoteId, {
      ...noteData,
      archived: true,
    });

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Note archived',
      },
      { status: 200 },
    );
  }),
  http.post(`${BASE_URL}/notes/:id/unarchive`, async ({ params, request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];
    const reqNoteId = params.id;

    await delay();

    if (users.get(accessToken) === undefined) {
      await delay();
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    await delay(3000);

    const noteData = notes.get(reqNoteId);

    if (noteData === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'You are not allowed to access this note',
          data: null,
        },
        { status: 403 },
      );
    }

    await delay(3000);

    notes.set(reqNoteId, {
      ...noteData,
      archived: false,
    });

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Note archived',
      },
      { status: 200 },
    );
  }),
  http.delete(`${BASE_URL}/notes/:id`, async ({ params, request }) => {
    const accessToken = request.headers.get('Authorization').split(' ')[1];
    const reqNoteId = params.id;

    await delay();

    if (users.get(accessToken) === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    await delay(3000);

    const noteData = notes.get(reqNoteId);

    if (noteData === undefined) {
      return HttpResponse.json(
        {
          status: 'failed',
          message: 'You are not allowed to access this note',
          data: null,
        },
        { status: 403 },
      );
    }

    await delay(3000);

    notes.delete(reqNoteId);

    return HttpResponse.json(
      {
        status: 'success',
        message: 'Note deleted',
      },
      { status: 200 },
    );
  }),
];
