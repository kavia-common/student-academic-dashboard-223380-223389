import React from 'react';
import ProfileCard from '../components/widgets/ProfileCard';
import { getProfile } from '../services/api';
import { useToast } from '../components/Toast';

/**
 * Profile page with detailed profile summary.
 */
// PUBLIC_INTERFACE
export default function ProfilePage() {
  const [profile, setProfile] = React.useState(null);
  const { show } = useToast();

  React.useEffect(() => {
    let mounted = true;
    getProfile().then((p) => {
      if (!mounted) return;
      setProfile(p || null);
    }).catch(() => show({ type: 'error', text: 'Unable to fetch profile.' }));
    return () => { mounted = false; };
  }, [show]);

  return (
    <div className="grid" style={{gap:16}}>
      <ProfileCard profile={profile} />
    </div>
  );
}
