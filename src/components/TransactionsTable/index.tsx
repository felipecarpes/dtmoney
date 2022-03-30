import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    created_at: string;
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get("transactions")
        .then(response => setTransactions(response.data.transactions));
    }, []);
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td className={transaction.type}>
                                    { transaction.type === "deposit" ? "+" : "-" }
                                    {   new Intl.NumberFormat('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        })
                                        .format(transaction.amount) 
                                    }
                                </td>
                                <td>{transaction.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-BR').format(
                                        new Date(transaction.created_at)
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                    
                    {/* <tr>
                        <td>Gás de cozinha</td>
                        <td className="withdraw">- R$ 75,65</td>
                        <td>Lazer</td>
                        <td>25/06/2020</td>
                    </tr> */}
                </tbody>
            </table>
        </Container>
    )
}