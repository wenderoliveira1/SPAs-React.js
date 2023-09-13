import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
    return (

     <HistoryContainer>
        <h1>Meu histórico</h1>

        <HistoryList>
            <table>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>Duração</th>
                        <th>Inicio</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tarefa</td>
                        <td>20minuts</td>
                        <td>há 2 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>

                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>20minuts</td>
                        <td>há 2 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>

                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>20minuts</td>
                        <td>há 2 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>

                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>20minuts</td>
                        <td>há 2 meses</td>
                        <td>
                            <Status statusColor="green">Concluído</Status>
                        </td>

                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>20minuts</td>
                        <td>há 2 meses</td>
                        <td>
                            <Status statusColor="yellow">em andamento</Status>
                        </td>

                    </tr>
                    <tr>
                        <td>Tarefa</td>
                        <td>20minuts</td>
                        <td>há 2 meses</td>
                        <td>
                            <Status statusColor="red">interrompido</Status>
                        </td>

                    </tr>
                    
                </tbody>
            </table>
        </HistoryList>
        
     </HistoryContainer>
    )
}