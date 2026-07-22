// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import { Navbar } from "./Navbar";
// import { Sidebar } from "./Sidebar";

// import { Modal } from "../../common-component/Modal";
// import { Button } from "../../common-component/Button";
// import showToast from "../../common-component/toastNotification";

// import { removeStorage } from "../../utils/funtional";

// import LogoutIcon from "@mui/icons-material/Logout";
// import SmartToyIcon from "@mui/icons-material/SmartToy";

// import {
//   USER_LOGOUT_CLEAR,
//   USER_LOGOUT_REQUEST,
// } from "../../redux/actionTypes/auth/logoutActionTypes";
// import { ToastContainer } from "react-toastify";

// interface MainLayoutProps {
//   children: React.ReactNode;
// }

// export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const { userLogout, userLogoutLoading } = useSelector(
//     (state: any) => state.userLogoutReducer
//   );

//   const handleLogoutConfirm = () => {
//     setIsLoggingOut(true);

//     dispatch({
//       type: USER_LOGOUT_REQUEST,
//       payload: {
//         userId: localStorage.getItem("user_id"),
//         authToken: localStorage.getItem("authToken"),
//       },
//     });
//   };

//   useEffect(() => {
//     console.log(userLogout);
//     if (userLogout && (userLogout.code === 200 || userLogout.code === 201)) {
//       // Clear all user-related storage
//       showToast(
//         userLogout.message || "Logged out successfully.",
//         "success", "Main-Container"
//       );
//       setIsLoggingOut(false);
//       setIsLogoutModalOpen(false);
//       // Give the toast a moment before redirecting
//       removeStorage("authToken");
//       removeStorage("user_id");
//       removeStorage("firstName");
//       removeStorage("lastName");
//       removeStorage("email");
//       removeStorage("phoneNumber");
//       removeStorage("role");
//       removeStorage("password");
//       removeStorage("app_theme");

//       setTimeout(() => {
//         navigate("/login", { replace: true });
//         dispatch({
//           type: USER_LOGOUT_CLEAR,
//         });
//       }, 1500);
//     }
//   }, [userLogout, dispatch, navigate]);

//   useEffect(() => {
//     if (
//       !userLogoutLoading &&
//       isLoggingOut &&
//       userLogout &&
//       userLogout.code !== 200 &&
//       userLogout.code !== 201
//     ) {
//       setIsLoggingOut(false);
//     }
//   }, [userLogoutLoading, isLoggingOut, userLogout]);

//   return (
//     <>
//       <ToastContainer containerId={"Main-Container"} />
//       <div
//         style={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* NAVBAR */}
//         <Navbar
//           onToggleSidebar={() =>
//             setSidebarCollapsed((prev) => !prev)
//           }
//           onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
//         />

//         {/* BODY */}
//         <div
//           style={{
//             display: "flex",
//             flex: 1,
//           }}
//         >
//           <Sidebar
//             collapsed={sidebarCollapsed}
//             onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
//           />

//           <main
//             style={{
//               flex: 1,
//               width: "100%",
//               maxWidth: "1400px",
//               margin: "0 auto",
//               padding: "2rem",
//               transition: "all .3s ease",
//             }}
//           >
//             {children}
//           </main>
//         </div>

//         {/* LOGOUT MODAL */}
//         <Modal
//           isOpen={isLogoutModalOpen}
//           onClose={() =>
//             !isLoggingOut && setIsLogoutModalOpen(false)
//           }
//           title={
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "0.75rem",
//               }}
//             >
//               <div
//                 style={{
//                   padding: "0.5rem",
//                   borderRadius: "10px",
//                   background: "rgba(244,63,94,.15)",
//                   color: "var(--accent-rose)",
//                 }}
//               >
//                 <LogoutIcon />
//               </div>

//               <div>
//                 <h3
//                   style={{
//                     fontSize: "1.1rem",
//                     fontWeight: 700,
//                     color: "var(--text-primary)",
//                   }}
//                 >
//                   Confirm Session Teardown
//                 </h3>

//                 <p
//                   style={{
//                     fontSize: ".78rem",
//                     color: "var(--text-muted)",
//                   }}
//                 >
//                   Adaptive Knowledge Preservation System
//                 </p>
//               </div>
//             </div>
//           }
//           footer={
//             <>
//               <Button
//                 variant="secondary"
//                 size="md"
//                 disabled={isLoggingOut}
//                 onClick={() => setIsLogoutModalOpen(false)}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 variant="danger"
//                 size="md"
//                 isLoading={isLoggingOut}
//                 startIcon={<LogoutIcon />}
//                 onClick={handleLogoutConfirm}
//               >
//                 Disconnect Agent & Sign Out
//               </Button>
//             </>
//           }
//         >
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem",
//             }}
//           >
//             <p
//               style={{
//                 fontSize: ".9rem",
//                 color: "var(--text-secondary)",
//                 lineHeight: 1.5,
//               }}
//             >
//               Are you sure you want to log out? Disconnecting will pause your
//               active repository knowledge harvester agent.
//             </p>

//             <div
//               className="glass-panel"
//               style={{
//                 padding: "1rem",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: ".75rem",
//                 background: "var(--bg-input)",
//               }}
//             >
//               <SmartToyIcon
//                 style={{
//                   color: "var(--accent-purple)",
//                 }}
//               />

//               <div
//                 style={{
//                   fontSize: ".8rem",
//                   color: "var(--text-secondary)",
//                 }}
//               >
//                 <strong>Status:</strong> Active Agent will save current commit
//                 deltas and enter standby mode for backend synthesis.
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// };


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Modal } from '../../common-component/Modal';
import { Button } from '../../common-component/Button';
import showToast from '../../common-component/toastNotification';
import { removeStorage } from '../../utils/funtional';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  USER_LOGOUT_CLEAR,
  USER_LOGOUT_REQUEST
} from '../../redux/actionTypes/auth/logoutActionTypes';
import { ToastContainer } from 'react-toastify';

interface MainLayoutProps {
  // `children` is what lets every page (Dashboard, Create User, etc.) share
  // this one Navbar/Sidebar/logout-modal shell instead of re-implementing it.
  // Keep this - removing it means duplicating the layout in every page.
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { userLogout, userLogoutLoading } = useSelector(
    (state: any) => state.userLogoutReducer
  );

  const handleLogoutConfirm = () => {
    setIsLoggingOut(true);
    dispatch({
      type: USER_LOGOUT_REQUEST,
      payload: {
        userId: localStorage.getItem('user_id'),
        authToken: localStorage.getItem('authToken')
      }
    });
  };

  useEffect(() => {
    if (userLogout && (userLogout.code === 200 || userLogout.code === 201)) {
      showToast(userLogout.message || 'Logged out successfully.', 'success', 'Main-Container');
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);

      removeStorage('authToken');
      removeStorage('user_id');
      removeStorage('firstName');
      removeStorage('lastName');
      removeStorage('email');
      removeStorage('phoneNumber');
      removeStorage('role');
      removeStorage('password');
      removeStorage('app_theme');

      const timer = setTimeout(() => {
        navigate('/login', { replace: true });
        dispatch({ type: USER_LOGOUT_CLEAR });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [userLogout, dispatch, navigate]);

  useEffect(() => {
    if (
      !userLogoutLoading &&
      isLoggingOut &&
      userLogout &&
      userLogout.code !== 200 &&
      userLogout.code !== 201
    ) {
      setIsLoggingOut(false);
    }
  }, [userLogoutLoading, isLoggingOut, userLogout]);

  return (
    <>
      <ToastContainer containerId="Main-Container" />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Navbar reads firstName/lastName/role from localStorage and theme
            from ThemeContext itself - nothing to pass down here. */}
        <Navbar
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
          onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
        />

        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar
            collapsed={sidebarCollapsed}
            onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
          />

          <main
            style={{
              flex: 1,
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '2rem clamp(1rem, 3vw, 2rem)',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease'
            }}
          >
            {children}
          </main>
        </div>

        <Modal
          isOpen={isLogoutModalOpen}
          onClose={() => !isLoggingOut && setIsLogoutModalOpen(false)}
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  padding: '0.5rem',
                  borderRadius: '10px',
                  background: 'rgba(244,63,94,.15)',
                  color: 'var(--accent-rose)'
                }}
              >
                <LogoutIcon />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Log out?
                </h3>
                <p style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>
                  You'll need to sign in again to continue
                </p>
              </div>
            </div>
          }
          footer={
            <>
              <Button
                variant="secondary"
                size="md"
                disabled={isLoggingOut}
                onClick={() => setIsLogoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                isLoading={isLoggingOut}
                startIcon={<LogoutIcon />}
                onClick={handleLogoutConfirm}
              >
                Log Out
              </Button>
            </>
          }
        >
          <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Are you sure you want to log out of your account?
          </p>
        </Modal>
      </div>
    </>
  );
};