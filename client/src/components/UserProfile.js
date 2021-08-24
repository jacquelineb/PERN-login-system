import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://192.168.1.77:5000/profile/${username}`);
      console.log(response.status);
      setProfile(await response.json());
    }

    fetchData();
  }, [username]);

  if (profile === undefined) {
    return null;
  } else if (profile === null) {
    return <h1>Sorry, could not find that user.</h1>;
  } else {
    return (
      <>
        <h1>{profile.username}</h1>
        {profile.biography ? <p>{profile.biography}</p> : null}
      </>
    );
  }
}

export default UserProfile;
