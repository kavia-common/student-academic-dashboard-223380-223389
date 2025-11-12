import React from 'react';

/**
 * Announcements/Notifications list widget.
 */
// PUBLIC_INTERFACE
export default function AnnouncementsWidget({ items }) {
  const list = items || [];
  return (
    <section className="card" aria-labelledby="ann-title">
      <div className="card-header">
        <h2 className="card-title" id="ann-title">Announcements</h2>
      </div>
      <div className="card-body">
        {!list.length && <p className="text-muted">No announcements.</p>}
        {!!list.length && (
          <ul className="list" aria-label="Announcements">
            {list.map((a, i) => (
              <li key={i} className="list-item">
                <div>
                  <div style={{fontWeight:600}}>{a.title}</div>
                  <div className="text-muted" style={{fontSize:13}}>{a.body}</div>
                </div>
                <div className="text-muted" style={{fontSize:12}} aria-label={`Date ${a.date}`}>{a.date}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
