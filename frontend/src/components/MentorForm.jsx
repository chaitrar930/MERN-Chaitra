import React, { useState } from 'react';

export default function MentorForm({ addMentor }){
  const [name, setName] = useState('');
  const [role, setRole] = useState('mentor');
  function submit(e){ e.preventDefault(); if(!name.trim()) return; addMentor({ name: name.trim(), role }); setName(''); }
  return (
    <form onSubmit={submit} className='card'>
      <h3>Add Mentor / Mentee</h3>
      <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value)}><option value='mentor'>Mentor</option><option value='mentee'>Mentee</option></select>
      <div style={{display:'flex',gap:8}}><button className='btn' type='submit'>Add</button></div>
    </form>
  );
}
