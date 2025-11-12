import React from 'react';

/**
 * Schedule widget listing upcoming classes.
 */
// PUBLIC_INTERFACE
export default function ScheduleWidget({ items }) {
  if (!items || !items.length) {
    return (
      <section className="card" aria-labelledby="schedule-title">
        <div className="card-header">
          <h2 className="card-title" id="schedule-title">Upcoming Classes</h2>
        </div>
        <div className="card-body">
          <p className="text-muted">No upcoming classes.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="card" aria-labelledby="schedule-title">
      <div className="card-header">
        <h2 className="card-title" id="schedule-title">Upcoming Classes</h2>
      </div>
      <div className="card-body">
        <ul className="list" aria-label="Upcoming classes">
          {items.map((c, idx) => (
            <li key={idx} className="list-item">
              <div>
                <div style={{fontWeight:600}}>{c.course}</div>
                <div className="text-muted" style={{fontSize:13}}>{c.time} • {c.location} • {c.instructor}</div>
              </div>
              <span className="badge" aria-label={`Starts in ${c.startsIn}`}>⏱ {c.startsIn}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
