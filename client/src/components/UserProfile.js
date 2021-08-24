import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    /*
    fetch(`http://192.168.1.77:5000/profile/${username}`)
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
      });
      */
    async function fetchData() {
      const response = await fetch(`http://192.168.1.77:5000/profile/${username}`);
      console.log(response.status);
      if (response.status === 200) {
        setProfile(await response.json());
      }
    }

    fetchData();
  }, [username]);

  let profileContent;
  if (profile) {
    profileContent = (
      <>
        <h1>{profile.username}</h1>
        <p>{profile.biography}</p>
      </>
    );
  } else {
    profileContent = <h1>Sorry, could not find that user.</h1>;
  }

  return <div>{profileContent}</div>;
}

export default UserProfile;
