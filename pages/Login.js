import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/index.module.css';
import { useAuth } from '../Auth/AuthContext'
import { useRouter } from 'next/router'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [emailerr, setemailerr] = useState('')
    const [passwderr, setpasswderr] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setpasswderr('')
        setemailerr('')
    };

    const { user, signIn, signUp, logout } = useAuth();
    const router = useRouter();

    const handleSignin = (e) => {
        e.preventDefault();
        // console.log(formData);
        signIn(formData.email, formData.password).then((res) => {
            if (res == 'signin success') {
                alert('Signin Successful')
                router.push('/Connect')
            }

            if (res == 'FirebaseError: Firebase: Error (auth/invalid-email).') {

                setemailerr('Invalid Email')
            }
            if (res == 'FirebaseError: Firebase: Error (auth/invalid-credential).') {

                setpasswderr('Invalid Email or Password')
            }

            // console.log(res)
        }).catch((err) => {
            console.log(err)
        }
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Login to your Account</h2>
            <form onSubmit={handleSignin} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {emailerr && <p className={styles.error}>{emailerr}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    {passwderr && <p className={styles.error}>{passwderr}</p>}
                </div>
                <div className={styles.checkbox}>

                    <input type="checkbox" id="check" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                    <label htmlFor="check">Remember Me</label>

                </div>
                <div className={styles.formGroup}>
                    <button type="submit">Login</button>
                </div>
                <div className={styles.bottom}>
                    New to MyApp? <Link href="/">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};
export default Login