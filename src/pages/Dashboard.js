import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        if (profileData) {
          setProfile(profileData);
        }
      }
    };

    fetchUser();
  }, []);

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">User Information</h2>
          <div className="space-y-4">
            <p className="text-lg"><strong>Email:</strong> {profile.email}</p>
            <p className="text-lg"><strong>Box User ID:</strong> {profile.box_user_id}</p>
            <p className="text-lg"><strong>Box Access Token:</strong> {profile.box_access_token}</p>
            <p className="text-lg"><strong>Box Refresh Token:</strong> {profile.box_refresh_token}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
