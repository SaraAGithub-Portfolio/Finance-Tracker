import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './Home.module.css';
import TransactionForm from './TransactionForm';
import { useCollection } from '../../hooks/useCollection';
import TransactionList from './TransactionList';

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection('transactions')

    // Extract the UID from the user object
    const uid = user ? user.uid : null;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {documents && <TransactionList transactions={documents} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={uid} />
            </div>
        </div>
    )
}
