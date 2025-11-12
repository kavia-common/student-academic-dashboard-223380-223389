import React from 'react';

/**
 * Renders a student's profile summary card.
 * Accessible with semantic elements and clear focus states.
 */
// PUBLIC_INTERFACE
export default function ProfileCard({ profile }) {
  if (!profile) return null;
  return (
    <section className="card" aria-labelledby="profile-title">
      <div className="card-header">
        <h2 className="card-title" id="profile-title">Profile</h2>
        <span className="badge" title="GPA">GPA {profile.gpa?.toFixed ? profile.gpa.toFixed(2) : profile.gpa}</span>
      </div>
      <div className="card-body">
        <div style={{display:'flex', gap:16, alignItems:'center'}}>
          <div aria-hidden="true" style={{
            width:56,height:56,borderRadius:14,
            background:'linear-gradient(135deg, #2563EB, #60A5FA)',
            boxShadow:'0 8px 22px rgba(37,99,235,0.35)'
          }} />
          <div>
            <div style={{fontWeight:700}}>{profile.name}</div>
            <div className="text-muted" style={{fontSize:14}}>{profile.program} • Year {profile.year}</div>
            <a className="btn" href={`mailto:${profile.email}`} aria-label="Send email">
              ✉️ <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
