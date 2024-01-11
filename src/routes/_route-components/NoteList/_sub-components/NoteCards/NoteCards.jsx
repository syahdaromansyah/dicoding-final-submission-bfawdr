import PropTypes from 'prop-types';
import NoteCard from './_sub-components/NoteCard.jsx';

export default function NoteCards({
  isActiveNotes,
  notes,
  notesOperation,
  handleArchiveNote = () => null,
  handleUnarchiveNote = () => null,
  handleDeleteNote,
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-[repeat(auto-fill,minmax(540px,1fr))] md:gap-x-4 lg:flex-1">
      {notes.map((activeNote) => (
        <NoteCard
          key={activeNote.id}
          isActiveNote={isActiveNotes}
          isOnNoteOption={notesOperation[activeNote.id] || 'none'}
          noteData={activeNote}
          handleArchiveNote={handleArchiveNote}
          handleUnarchiveNote={handleUnarchiveNote}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </div>
  );
}

NoteCards.propTypes = {
  isActiveNotes: PropTypes.bool.isRequired,
  handleArchiveNote: PropTypes.func,
  handleUnarchiveNote: PropTypes.func,
  handleDeleteNote: PropTypes.func.isRequired,
  notesOperation: PropTypes.objectOf(
    PropTypes.oneOf(['archive', 'unarchive', 'delete']),
  ).isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      owner: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
