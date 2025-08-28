// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDc5k6Y7Z8X9X0X1X2X3X4X5X6X7X8X9X0",
    authDomain: "from-pendaftaran.firebaseapp.com",
    projectId: "from-pendaftaran",
    storageBucket: "from-pendaftaran.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abc123def456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const participantsCollection = collection(db, 'pendaftaran');

export const addParticipant = async (data) => {
    try {
        const docRef = await addDoc(participantsCollection, {
            ...data,
            createdAt: new Date().toISOString()
        });
        console.log("✅ Peserta ditambahkan ke Firestore:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Gagal simpan ke Firestore:", error);
        throw error;
    }
};