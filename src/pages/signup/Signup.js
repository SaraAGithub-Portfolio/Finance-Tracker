import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'
import { useState } from 'react'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { signup, isPending, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password, displayName);

        try {
            await signup(email, password, displayName);
            console.log('User signed up');
        } catch (err) {
            console.error('Signup error: ', err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']} >
            <h2>Signup</h2>
            <label>
                <span>email:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            {isPending ?
                <button className="btn" disabled>loading</button>
                :
                <button className="btn">Signup</button>
            }
            {error && <p>{error}</p>}
        </form>
    )
}