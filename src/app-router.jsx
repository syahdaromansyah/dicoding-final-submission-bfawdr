import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorRootRoute from './routes/ErrorRoot.jsx';
import RootIndexRoute from './routes/Index';
import NotFoundRoute from './routes/NotFound.jsx';
import RootRoute from './routes/Root';
import LoginRootRoute from './routes/login/Root';
import NoteDetailRootRoute from './routes/notes/[noteid]/Root.jsx';
import AddNoteRootRoute from './routes/notes/add/Root.jsx';
import ArchivedNotesRootRoute from './routes/notes/archived/Root.jsx';
import RegisterRootRoute from './routes/register/Root';

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootRoute />} errorElement={<ErrorRootRoute />}>
      <Route index element={<RootIndexRoute />} />
      <Route path="login" element={<LoginRootRoute />} />
      <Route path="register" element={<RegisterRootRoute />} />
      <Route path="notes" element={null}>
        <Route index element={<NotFoundRoute />} />
        <Route path=":noteId" element={<NoteDetailRootRoute />} />
        <Route path="add" element={<AddNoteRootRoute />} />
        <Route path="archived" element={<ArchivedNotesRootRoute />} />
      </Route>
      <Route path="*" element={<NotFoundRoute />} />
    </Route>,
  ),
);

export default function AppRouter() {
  return <RouterProvider router={browserRouter} />;
}
