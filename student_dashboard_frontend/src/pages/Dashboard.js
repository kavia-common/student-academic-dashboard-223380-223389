import React from 'react';
import ProfileCard from '../components/widgets/ProfileCard';
import ScheduleWidget from '../components/widgets/ScheduleWidget';
import GradesWidget from '../components/widgets/GradesWidget';
import AnnouncementsWidget from '../components/widgets/AnnouncementsWidget';
import { getProfile, getSchedule, getGrades, getAnnouncements } from '../services/api';
import { useToast } from '../components/Toast';

/**
 * Dashboard page shows profile, schedule, grades, and announcements widgets.
 */
// PUBLIC_INTERFACE
export default function DashboardPage() {
  const [profile, setProfile] = React.useState(null);
  const [schedule, setSchedule] = React.useState([]);
  const [grades, setGrades] = React.useState({});
  const [announcements, setAnnouncements] = React.useState([]);
  const { show } = useToast();

  React.useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [p, s, g, a] = await Promise.all([
          getProfile(), getSchedule(), getGrades(), getAnnouncements()
        ]);
        if (!mounted) return;
        setProfile(p);
        setSchedule(Array.isArray(s) ? s : []);
        setGrades(g || {});
        setAnnouncements(Array.isArray(a) ? a : []);
      } catch {
        show({ type: 'error', text: 'Failed to load dashboard data.' });
      }
    }
    load();
    return () => { mounted = false; };
  }, [show]);

  return (
    <div className="grid grid-cols-dashboard" style={{gap:16}}>
      <div style={{gridColumn: 'span 5'}}>
        <ProfileCard profile={profile} />
        <div style={{height:16}} />
        <GradesWidget data={grades} />
      </div>
      <div style={{gridColumn: 'span 7'}}>
        <ScheduleWidget items={schedule} />
        <div style={{height:16}} />
        <AnnouncementsWidget items={announcements} />
      </div>
    </div>
  );
}
