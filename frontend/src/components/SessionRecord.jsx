import React, { useState } from 'react';

export default function SessionRecord({ mentors = [], addSession }){
  const [mentorId, setMentorId] = useState('');
  const [menteeId, setMenteeId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [tag, setTag] = useState('academic');
  const [notes, setNotes] = useState('');

  function submit(e){
    e.preventDefault();
    addSession({ date, mentorId, menteeId, tag, notes });
    setNotes('');
  }

  return (
    <form onSubmit={submit} className='card'>
      <h3>New Session</h3>
      <div className='row'>
        <select value={mentorId} onChange={e=>setMentorId(e.target.value)}>
          <option value=''>Select Mentor</option>
          {mentors.filter(m=>m.role==='mentor').map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
        <select value={menteeId} onChange={e=>setMenteeId(e.target.value)}>
          <option value=''>Select Mentee</option>
          {mentors.filter(m=>m.role==='mentee').map(m=> <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
      </div>
      <input type='date' value={date} onChange={e=>setDate(e.target.value)} />
      <select value={tag} onChange={e=>setTag(e.target.value)}><option value='academic'>Academic</option><option value='personal'>Personal</option><option value='career'>Career</option><option value='other'>Other</option></select>
      <textarea placeholder='Notes / Next steps' value={notes} onChange={e=>setNotes(e.target.value)} />
      <div style={{display:'flex',gap:8}}><button className='btn' type='submit'>Save Session</button></div>
    </form>
  );
}
