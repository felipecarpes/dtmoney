import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable() {
    const { transactions } = useTransactions();

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