import { app } from './firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
const auth = getAuth(app);

export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // User object
  } catch (error) {
    console.error('Signup Error:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // User object
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};
