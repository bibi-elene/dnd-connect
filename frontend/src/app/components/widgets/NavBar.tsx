// 'use client';

// import { Navbar, Nav, Container, Form } from 'react-bootstrap';
// import { useNavigate } from '@/app/utils/navigation';
// import DropdownMenu from './DropDownMenu';
// // import Image from 'next/image';
// import './NavBar.styles.scss';
// import { useState } from 'react';

// interface NavbarProps {
//   user: { username: string } | null;
//   logout: () => void;
//   toggleDiceDisplay: () => void;
//   isDiceVisible: boolean;
// }

// const CustomNavbar: React.FC<NavbarProps> = ({
//   user,
//   logout,
//   toggleDiceDisplay,
//   isDiceVisible,
// }) => {
//   const { goToLogin } = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   return (
//     <Navbar variant="dark" expand="lg" fixed="top" className="shadow">
//       <Container>
//         <div className="d-flex align-items-center">
//           <a href="#"></a>
//           <Navbar.Brand href="#" className="fs-5 fw-bold text-white">
//             D&D Connect
//           </Navbar.Brand>
//         </div>
//         <Form.Check
//           type="switch"
//           id="dice-visibility-toggle"
//           label="🎲"
//           className="text-white me-3"
//           checked={isDiceVisible}
//           onChange={toggleDiceDisplay}
//         />
//         <Navbar.Toggle aria-controls="navbar-nav" />

//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link className="text-lg" href="#classes">
//               Classes
//             </Nav.Link>
//             <Nav.Link className="text-lg" href="#races">
//               Species
//             </Nav.Link>
//             <Nav.Link className="text-lg" href="#review">
//               Contacts
//             </Nav.Link>
//           </Nav>

//           <Nav className="align-items-center flex-row justify-between">
//             {user ? (
//               <DropdownMenu
//                 isOpen={isDropdownOpen}
//                 onLogout={logout}
//                 username={user.username}
//                 toggleDropdown={toggleDropdown}
//                 setDropdownOpen={setIsDropdownOpen}
//               />
//             ) : (
//               <button className="primary-custom-button" onClick={goToLogin}>
//                 Log In
//               </button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default CustomNavbar;
