import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionsType{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<TransactionsType, 'id' | 'createdAt'>;

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionContextData {
    transactions: TransactionsType[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<TransactionsType[]>([]);

    useEffect(() => {
        api.get('/transactions').then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('/transactions', {...transactionInput, createdAt: new Date()});

        const {transaction} = response.data;

        setTransactions([...transactions, transaction]);
    }

    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}