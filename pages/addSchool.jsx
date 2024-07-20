import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../styles/addschool.module.css';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);

    formData.append('image', data.image[0]);

    formData.append('email_id', data.email_id);

    try {
      await axios.post('/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('School added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding school');
    }
  };

  return (
    <div className={styles['add-school-form']}>
      <h1 className={styles['form-title']}>Add New School</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles['form-group']}>
          <label htmlFor="name">School Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className={styles['error-message']}>{errors.name.message}</span>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <span className={styles['error-message']}>{errors.address.message}</span>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            placeholder="City"
            {...register('city', { required: 'City is required' })}
          />
          {errors.city && <span className={styles['error-message']}>{errors.city.message}</span>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="state">State</label>
          <input
            id="state"
            type="text"
            placeholder="State"
            {...register('state', { required: 'State is required' })}
          />
          {errors.state && <span className={styles['error-message']}>{errors.state.message}</span>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="contact">Contact</label>
          <input
            id="contact"
            type="text"
            placeholder="Contact"
            {...register('contact', { required: 'Contact is required' })}
          />
          {errors.contact && <span className={styles['error-message']}>{errors.contact.message}</span>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            {...register('image', { required: true })}
          />
          {errors.image && <span className={styles['error-message']}>{errors.image.message}</span>}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="email_id">Email</label>
          <input
            id="email_id"
            type="email"
            placeholder="Email"
            {...register('email_id', { required: 'Email is required' })}
          />
          {errors.email_id && <span className={styles['error-message']}>{errors.email_id.message}</span>}
        </div>
        <button type="submit" className={styles['submit-button']}>Add School</button>
      </form>
    </div>
  );
}
