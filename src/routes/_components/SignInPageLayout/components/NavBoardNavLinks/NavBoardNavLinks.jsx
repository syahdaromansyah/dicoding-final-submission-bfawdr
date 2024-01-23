import PropTypes from 'prop-types';
import { FaBoxArchive, FaListUl, FaPlus } from 'react-icons/fa6';
import useLang from '../../../../../hooks/use-lang';
import NavBoardNavLink from './components/NavBoardNavLink.jsx';

export default function NavBoardNavLinks({ handleClick = () => null }) {
  const { switchLang } = useLang();

  const navLinks = [
    {
      to: '/notes/add',
      icon: <FaPlus />,
      text: switchLang({
        en: 'Create a note',
        id: 'Buat catatan baru',
      }),
    },
    {
      to: '/',
      icon: <FaListUl />,
      text: switchLang({
        en: 'Active notes',
        id: 'Catatan aktif',
      }),
    },
    {
      to: '/notes/archived',
      icon: <FaBoxArchive />,
      text: switchLang({
        en: 'Archived notes',
        id: 'Catatan arsip',
      }),
    },
  ];

  return (
    <ul className="grid gap-y-2">
      {navLinks.map((navLink) => (
        <li key={navLink.to}>
          <NavBoardNavLink
            to={navLink.to}
            icon={navLink.icon}
            text={navLink.text}
            handleClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
}

NavBoardNavLinks.propTypes = {
  handleClick: PropTypes.func,
};
