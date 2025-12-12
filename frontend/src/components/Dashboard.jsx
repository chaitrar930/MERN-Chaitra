import React from 'react';
export default function Dashboard({ mentors = [], mentees = [], sessions = [] }){
  return (
    <div className='card'>
      <h3>Dashboard</h3>
      <div className='grid'>
        <div><div className='big'>{mentors.length}</div><div className='muted'>Mentors</div></div>
        <div><div className='big'>{mentees.length}</div><div className='muted'>Mentees</div></div>
        <div><div className='big'>{sessions.length}</div><div className='muted'>Sessions</div></div>
      </div>
    </div>
  );
}
