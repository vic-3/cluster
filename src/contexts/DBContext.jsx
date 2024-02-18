// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	doc,
	getFirestore,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAFf0pmAhnKIcccE3c8oNmegEc0FdauIew",
	authDomain: "whotsopp.firebaseapp.com",
	projectId: "whotsopp",
	storageBucket: "whotsopp.appspot.com",
	messagingSenderId: "35591111363",
	appId: "1:35591111363:web:af9336e2a853fc80f29876",
	measurementId: "G-S9X6VDEJG2",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const usersRef = collection(db, "users");
const chatsRef = collection(db, "chats");

export const DB = createContext();

export const DBProvider = ({ children }) => {
	// Initialize Firebase
	const [users, setUsers] = useState();
	const [user, setUser] = useState();
	const [userId, setUserId] = useState(localStorage.getItem("userId"));

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUserId(user?.uid);
			} else {
				console.log("logged out");
				setUserId(null);
				setUser(null);
				localStorage.removeItem("userId");
			}
		});
		onSnapshot(usersRef, (snapshot) => {
			const localUsers = snapshot.docs.map((document) => {
				return { ...document.data(), ref: doc(usersRef, document.id) };
			});
			setUsers([...localUsers]);
		});
	}, []);

	useEffect(() => {
		if (userId) {
			const userRef = query(usersRef, where("uid", "==", userId));
			onSnapshot(userRef, (snapshot) => {
				const localUser = {
					...snapshot.docs[0].data(),
					ref: doc(usersRef, snapshot.docs[0].id),
				};
				setUser(localUser);
			});
		}
	}, [userId]);

	return (
		<DB.Provider value={{ auth, usersRef, user, users, chatsRef }}>
			{children}
		</DB.Provider>
	);
};
