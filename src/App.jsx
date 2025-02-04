import React, { useState, useEffect } from 'react';
import Todo from './Screens/TaskScreen/Todo';
import Auth from './Screens/AuthScreen/Auth';
import { supabase } from './Config/SupabaseConfig';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Todo user={user} />
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
        {/* <>
          <button onClick={handleLogout}>Logout</button>
          <Todo user={user} />
        </> */}
    </div>
  );
};

export default App;
