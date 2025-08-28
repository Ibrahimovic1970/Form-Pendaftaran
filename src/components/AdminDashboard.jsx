import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getDocs } from 'firebase/firestore';
import { participantsCollection } from '../utils/firebase';
import { translations } from '../utils/translations';

export default function AdminDashboard({ lang = 'id' }) {
    const [participants, setParticipants] = useState([]);
    const t = translations[lang];
    const tableRef = useRef();

    useEffect(() => {
        const loadParticipants = async () => {
            try {
                const snapshot = await getDocs(participantsCollection);
                const list = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setParticipants(list);
            } catch (error) {
                console.error("Gagal ambil data:", error);
            }
        };
        loadParticipants();
    }, []);

    useEffect(() => {
        if (participants.length > 0) {
            gsap.fromTo(
                '.participant-item',
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }
            );
        }
    }, [participants]);

    return (
        <div className="container">
            <h1 className="title">{t.dashboard}</h1>

            <div className="participant-list">
                {participants.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">{t.noData}</p>
                ) : (
                    participants.map((p) => (
                        <div key={p.id} className="participant-item">
                            <div>
                                <strong>{p.name}</strong> — {p.email}
                            </div>
                            <span className="badge pending">⏳ {lang === 'id' ? 'Belum' : 'Pending'}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}