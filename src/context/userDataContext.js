import { createContext, useContext, useEffect, useState } from "react";
import { firebaseCloudMessaging } from "../firebase/firebase";

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem("authToken")
	);
	const [language, setLanguage] = useState(
		localStorage.getItem("lang") || "en"
	);
	// const [user, setUser] = useState(null); // State for user data
	const [authrole, setAuthRole] = useState(localStorage.getItem("authRole")); // Load role from localStorage

	useEffect(() => {
		// Initialize Firebase Cloud Messaging once on mount
		const initializeFirebase = async () => {
      try {
        // Initialize Firebase Messaging and register service worker
        if ('serviceWorker' in navigator) {
          // Register service worker with the correct scope
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker registered with scope:', registration.scope);
          // Initialize Firebase Cloud Messaging after the service worker is registered
          await firebaseCloudMessaging.init();
        }
      } catch (error) {
        console.error('Service Worker registration or Firebase Messaging initialization failed:', error);
      }
		};
		initializeFirebase();
	}, []);

	useEffect(() => {
		// Synchronize language with localStorage
		localStorage.setItem("lang", language);
	}, [language]);

  useEffect(() => {
    if (authrole) {
      localStorage.setItem("authRole", authrole);
    }
  }, [authrole]);

	const userDataContextValues = {
		isLoggedIn,
		setIsLoggedIn,
		language,
		setLanguage,
		roles: ["admin", "user", "employee"],
		authrole,
		setAuthRole,
	};

	return (
		<UserDataContext.Provider value={userDataContextValues}>
			{children}
		</UserDataContext.Provider>
	);
};

export const useUserDataContext = () => useContext(UserDataContext);

export default UserDataContext;
