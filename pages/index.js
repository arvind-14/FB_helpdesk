import { useState } from 'react';
import styles from '../styles/index.module.css';
import Link from 'next/link';
import { useAuth } from '@/Auth/AuthContext';
import { useRouter } from 'next/router';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });
  const [emailerror, setemailerror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setpassworderror('')
    setemailerror('')
  };

  const { user, signIn, signUp, logout } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(formData);

    signUp(formData.email, formData.password).then((res) => {
      if (res == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
        // console.log('Invalid Email')
        setemailerror('Invalid Email')
      }
      if (res == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
        console.log('Email already in use')
        setemailerror('Email already in use')
      }
      if (res == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
        console.log('Weak Password')
        setpassworderror('Enter a Strong Password')
      }
      if (res == 'signup success') {
        console.log(res)
        alert('Signup Successful')
        router.push('/Login')
      }
      // console.log(res);
    })
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Create Account</h2>
      <form onSubmit={handleSignup} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {emailerror != '' && <p className={styles.error}>{emailerror}</p>}
        </div>
        <div className={styles.formGroup}>
          
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          {passworderror != '' && <p className={styles.error}>{passworderror}</p>}
        </div>
        <div className={styles.checkbox}>

          <input type="checkbox" id="check" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
          <label htmlFor="check">Remember Me</label>

        </div>
        <div className={styles.formGroup}>
          <button type="submit">Sign Up</button>
        </div>
        <div className={styles.bottom}>
          Already have an account? <Link href="/Login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
