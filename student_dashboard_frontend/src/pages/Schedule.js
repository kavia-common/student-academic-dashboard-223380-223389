import React from 'react';
import ScheduleWidget from '../components/widgets/ScheduleWidget';
import { getSchedule } from '../services/api';
import { useToast } from '../components/Toast';

/**
 * Full schedule page showing upcoming classes list.
 */
// PUBLIC_INTERFACE
export default function SchedulePage() {
  const [items, setItems] = React.useState([]);
  const { show } = useToast();

  React.useEffect(() => {
    let mounted = true;
    getSchedule().then((s) => {
      if (!mounted) return;
      setItems(Array.isArray(s) ? s : []);
    }).catch(() => show({ type: 'error', text: 'Unable to fetch schedule.' }));
    return () => { mounted = false; };
  }, [show]);

  return (
    <div className="grid" style={{gap:16}}>
      <ScheduleWidget items={items} />
    </div>
  );
}
