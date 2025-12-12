import React from 'react';

export default function SessionList({ sessions = [], deleteSession, mentors = [] }){
  if(!sessions.length) return <div className='card'>No sessions yet</div>;
  function nameFor(id){ const f = mentors.find(m=>m._id===id); return f ? f.name : '—'; }
  return (
    <div className='list'>
      {sessions.map(s=>(
        <div className='item' key={s._id || s.id}>
          <div>
            <div className='meta'>{s.date} • {s.tag}</div>
            <div className='title'>{nameFor(s.mentorId)} → {nameFor(s.menteeId)}</div>
            <div className='notes'>{s.notes}</div>
          </div>
          <div className='actions'>
            <button onClick={()=>navigator.clipboard?.writeText(s.notes)}>Copy</button>
            <button className='danger' onClick={()=>deleteSession(s._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
