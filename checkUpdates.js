const fs = require("fs");
const path = require("path");

// Caminho para o arquivo de documentação
const docPath = path.join(__dirname, "documentacao.md");

// Histórico de implementações
const implementationHistory = [
  "Criados os componentes: Task, TaskList e TaskForm.",
  "Estrutura de pastas atualizada para incluir a pasta src.",
  "Implementação da lógica para gerenciar tarefas na tela principal.",
  "Conexão do formulário de tarefas ao estado global ou ao banco de dados.",
];

// Função para verificar atualizações
const checkUpdates = () => {
  // Lê o conteúdo atual do arquivo
  fs.readFile(docPath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err);
      return;
    }

    // Verifica quais implementações já estão registradas
    const existingUpdates = data.match(
      /### Implementações Recentes([\s\S]*?)##/
    );
    const existingImplementations = existingUpdates
      ? existingUpdates[1]
          .trim()
          .split("\n")
          .map((line) => line.trim())
      : [];

    // Filtra as implementações que ainda não estão registradas
    const newUpdates = implementationHistory.filter(
      (update) => !existingImplementations.includes(`- ${update}`)
    );

    if (newUpdates.length > 0) {
      console.log("Implementações que ainda não estão registradas:");
      newUpdates.forEach((update) => console.log(`- ${update}`));
    } else {
      console.log("Todas as implementações já estão registradas.");
    }
  });
};

// Executa a função
checkUpdates();
