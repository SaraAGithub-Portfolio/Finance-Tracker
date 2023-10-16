import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'
import { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            await login(email, password);
            console.log('User logged in');
        } catch (error) {
            console.error('Login error: ', error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']} >
            <h2>Login</h2>
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
            {!isPending && <button className="btn">Login</button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <p>{error}</p>}
        </form>
    )
}
