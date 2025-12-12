import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import MentorForm from './components/MentorForm';
import SessionRecord from './components/SessionRecord';
import SessionList from './components/SessionList';
import Dashboard from './components/Dashboard';
import { exportToCSV } from './utils/export';

const API = 'http://localhost:5000/api';

export default function App(){
  const [mentors, setMentors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(()=>{ fetchMentors(); fetchSessions(); }, []);

  async function fetchMentors(){ const res = await axios.get(API + '/mentors'); setMentors(res.data); }
  async function fetchSessions(){ const res = await axios.get(API + '/sessions'); setSessions(res.data); }

  async function addMentor(person){ const res = await axios.post(API + '/mentors', person); setMentors(prev=>[res.data,...prev]); }
  async function addSession(payload){ const res = await axios.post(API + '/sessions', payload); setSessions(prev=>[res.data,...prev]); }

  async function deleteSession(id){ await axios.delete(API + '/sessions/' + id); setSessions(prev=>prev.filter(s=>s._id !== id)); }

  function download(){ exportToCSV('sessions.csv', sessions.map(s=>({ date: s.date, mentorId: s.mentorId, menteeId: s.menteeId, tag: s.tag, notes: s.notes }))) }

  const filtered = useMemo(()=>{
    const q = query.toLowerCase();
    return sessions.filter(s => [s.notes, s.tag].some(f => (f||'').toLowerCase().includes(q)));
  }, [sessions, query]);

  return (
    <div className='app'>
      <header><h1>Mentoring & Counseling (MERN)</h1><p className='muted'>Local MongoDB | Express | React</p></header>
      <div className='layout'>
        <aside>
          <MentorForm addMentor={addMentor} />
          <div style={{marginTop:12}}>
            <button className='btn' onClick={download}>Export Sessions</button>
            <button className='btn ghost' onClick={()=>{ setMentors([]); setSessions([]); }}>Reset (frontend)</button>
          </div>
          <Dashboard mentors={mentors.filter(m=>m.role==='mentor')} mentees={mentors.filter(m=>m.role==='mentee')} sessions={sessions} />
        </aside>
        <main>
          <div className='controls'><input placeholder='Search notes or tags...' value={query} onChange={e=>setQuery(e.target.value)} /></div>
          <SessionRecord mentors={mentors} addSession={addSession} />
          <SessionList sessions={filtered} deleteSession={deleteSession} mentors={mentors} />
        </main>
      </div>
    </div>
  );
}
