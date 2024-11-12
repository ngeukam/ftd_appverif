import * as firebase from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseCloudMessaging = {
	tokenInlocalforage: async () => {
		return localStorage.getItem("fcm_token");
	},
	init: async function () {
		if (!firebase.getApps().length) {
			firebase.initializeApp(firebaseConfig);
			try {
				const messaging = getMessaging();
				const tokenInLocalForage = await this.tokenInlocalforage();
				if (tokenInLocalForage !== null) {
					return tokenInLocalForage;
				}
				const status = await Notification.requestPermission();
				if (status && status === "granted") {
					const fcm_token = await getToken(messaging, {
						vapidKey: process.env.REACT_VAPID_KEY,
					});

					if (fcm_token) {
						localStorage.setItem("fcm_token", fcm_token);
						return fcm_token;
					}
				}
			} catch (error) {
				console.error(error);
				return null;
			}
		} else {
			try {
				const messaging = getMessaging();
				const tokenInLocalForage = await this.tokenInlocalforage();
				if (tokenInLocalForage !== null) {
					return tokenInLocalForage;
				}
				const status = await Notification.requestPermission();
				if (status && status === "granted") {
					const fcm_token = await getToken(messaging, {
						vapidKey: process.env.REACT_VAPID_KEY,
					});

					if (fcm_token) {
						localStorage.setItem("fcm_token", fcm_token);
						return fcm_token;
					}
				}
			} catch (error) {
				console.error(error);
				return null;
			}
		}
	},
	getMessage: async function () {
		if (firebase.getApps().length > 0) {
			try {
				const messaging = getMessaging();
				onMessage(messaging, (payload) => {
					console.log("Message Received", payload);
				});
			} catch (error) {}
		}
	},
};
export { firebaseCloudMessaging };
