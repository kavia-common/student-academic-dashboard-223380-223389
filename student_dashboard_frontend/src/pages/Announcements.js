import React from 'react';
import AnnouncementsWidget from '../components/widgets/AnnouncementsWidget';
import { getAnnouncements } from '../services/api';
import { useToast } from '../components/Toast';

/**
 * Announcements page showing all announcements.
 */
// PUBLIC_INTERFACE
export default function AnnouncementsPage() {
  const [items, setItems] = React.useState([]);
  const { show } = useToast();

  React.useEffect(() => {
    let mounted = true;
    getAnnouncements().then((a) => {
      if (!mounted) return;
      setItems(Array.isArray(a) ? a : []);
    }).catch(() => show({ type: 'error', text: 'Unable to fetch announcements.' }));
    return () => { mounted = false; };
  }, [show]);

  return (
    <div className="grid" style={{gap:16}}>
      <AnnouncementsWidget items={items} />
    </div>
  );
}
