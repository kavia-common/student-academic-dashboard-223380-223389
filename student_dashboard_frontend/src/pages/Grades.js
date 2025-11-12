import React from 'react';
import GradesWidget from '../components/widgets/GradesWidget';
import { getGrades } from '../services/api';
import { useToast } from '../components/Toast';

/**
 * Grades page showing recent grades and GPA.
 */
// PUBLIC_INTERFACE
export default function GradesPage() {
  const [data, setData] = React.useState({});
  const { show } = useToast();

  React.useEffect(() => {
    let mounted = true;
    getGrades().then((g) => {
      if (!mounted) return;
      setData(g || {});
    }).catch(() => show({ type: 'error', text: 'Unable to fetch grades.' }));
    return () => { mounted = false; };
  }, [show]);

  return (
    <div className="grid" style={{gap:16}}>
      <GradesWidget data={data} />
    </div>
  );
}
