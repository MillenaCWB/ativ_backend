const express = require('express');
const cors = require('cors');
const banco = require('./banco');
const app = express();
app.use(express.json());
const port = 3000;

// npm i cors
app.use(cors({
    origin:'*'
}));

// nova pessoa
app.post('/inserir', (req, res) => {
    const { nome, sobrenome,ano_nascimento, salario } = req.body;
    console.log("O frontend requisitou uma rota de api")
    banco.query(
        `INSERT INTO pessoa (nome, sobrenome,ano_nascimento, salario) VALUES ( ?, ?, ?, ?)`,
        [ nome, sobrenome, Number(ano_nascimento),Number(salario)],
        (err, results) => {
            if (err) {
                console.error('Erro na inserção', err);
                return res.status(500).send('Erro na inserção');
            }
            return res.send(`pessoa recebida!\n\n \nnome: ${nome} \nsobrenome: ${sobrenome} \nAno_nascimento: ${ano_nascimento} \nsalario: ${salario} `);
        }
    );
});

// atualizar por Nome
app.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome,ano_nascimento, salario } = req.body;
    banco.query(
        `UPDATE pessoa SET nome = ?, sobrenome = ?, ano_nascimento = ?, salario = ? WHERE id = ?`,
        [nome, sobrenome,Number(ano_nascimento),Number(salario),id],
        (err, results) => {
            if (err) {
                console.error('Erro na atualização', err);
                return res.status(500).send('Erro na atualização');
            }
            res.send(`pessoa atualizada: ${nome}, ${sobrenome}, ${ano_nascimento}, ${salario}`);
        }
    );
});

// deletar por ID
app.delete('/deletar/id/:id', (req, res) => {
    const { id } = req.params;
    banco.query(
        `DELETE FROM pessoa WHERE id = ?`,
        [Number(id)],
        (err, results) => {
            if (err) {
                console.error('Ops, erro para deletar.', err);
                return res.status(500).send('Erro ao deletar');
            }
            res.send(`pessoa deletada com sucesso!`);
        }
    );
});

// deletar por ano_nascimento
app.delete('/deletar/ano_nascimento/:ano_nascimento', (req, res) => {
    const { ano_nascimento } = req.params;
    banco.query(
        `DELETE FROM pessoa WHERE ano_nascimento = ?`,
        [modelo],
        (err, results) => {
            if (err) {
                console.error('Ops, erro para deletar por modelo.', err);
                return res.status(500).send('Erro ao deletar por modelo');
            }
            res.send(`pessoa com a data de nascimento ${ano_nascimento} deletada com sucesso!`);
        }
    );
});

// selecionar todos os veículos
app.get('/veiculos', (req, res) => {
    banco.query(
        `SELECT * FROM veiculos`,
        (err, results) => {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos' });
            }
            return res.json(results);
        }
    );
});

// selecionar por ID
app.get('/PESSOA/:id', (req, res) => {
    const { id } = req.params;
    banco.query(
        `SELECT * FROM PESSOA WHERE id = ?`,
        [Number(id)],
        (err, results) => {
            if (err) {
                console.error('Erro na consulta por id:', err);
                return res.status(500).json({ error: 'Erro ao consultar pessoa por id' });
            }
            if (results.length === 0) {
                return res.status(404).send('pessoa não encontrada.');
              }
              return res.json(results[0]); // Retorna o primeiro veículo encontrado
            }
    );
});

// selecionar por ano
app.get('/veiculos/ano/:ano', (req, res) => {
    const { ano } = req.params;
    banco.query(
        `SELECT * FROM veiculos WHERE ano = ?`,
        [Number(ano)],
        (err, results) => {
            if (err) {
                console.error('Erro na consulta por ano:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos por ano' });
            }
            return res.json(results);
        }
    );
});

// selecionar todos os veículos da cor AZUL
app.get('/veiculos/cor/azul', (req, res) => {
    banco.query(
        `SELECT * FROM veiculos WHERE cor = 'azul'`,
        (err, results) => {
            if (err) {
                console.error('Erro na consulta por cor:', err);
                return res.status(500).json({ error: 'Erro ao consultar veículos por cor' });
            }
            return res.json(results);
        }
    );
});

app.listen(port, () => {
    console.log(`Exemplo de app sendo "escutado" na porta ${port}`);
});
