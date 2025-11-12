import React from 'react';

/**
 * Grades widget showing recent grades and overall GPA.
 */
// PUBLIC_INTERFACE
export default function GradesWidget({ data }) {
  const recent = data?.recent || [];
  const gpa = data?.overallGPA;

  return (
    <section className="card" aria-labelledby="grades-title">
      <div className="card-header">
        <h2 className="card-title" id="grades-title">Grades</h2>
        {typeof gpa !== 'undefined' && (
          <span className="badge" title="Overall GPA">GPA {Number(gpa).toFixed(2)}</span>
        )}
      </div>
      <div className="card-body">
        {!recent.length && <p className="text-muted">No recent grades.</p>}
        {!!recent.length && (
          <ul className="list" aria-label="Recent grades">
            {recent.map((g, i) => (
              <li key={i} className="list-item">
                <div>
                  <div style={{fontWeight:600}}>{g.course} • {g.assignment}</div>
                  <div className="text-muted" style={{fontSize:13}}>Score</div>
                </div>
                <div aria-label={`Score ${g.score} out of ${g.max}`} style={{fontWeight:700}}>
                  {g.score}/{g.max}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
