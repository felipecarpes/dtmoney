import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    created_at: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'created_at'>;

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children } : TransactionProviderProps ) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("transactions")
        .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            created_at: new Date()
        });
        const { transaction } = response.data

        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}

export const useTransactions = () => {
    const context = useContext(TransactionContext);

    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }

    return context;
}