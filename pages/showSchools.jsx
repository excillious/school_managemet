import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/showschool.module.css';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/schools');
        setSchools(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchools();
  }, []);

  return (
    <div className={styles['schools-list']}>
      {schools.map(school => (
        <div key={school.id} className={styles['school-card']}>
          <img src={`/schoolImages/${school.image}`} alt={school.name} />
          <h2>{school.name}</h2>
          <p>{school.address}</p>
          <p>{school.city}</p>
        </div>
      ))}
    </div>
  );
}
