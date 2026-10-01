# 💱 CambioExchange — Trabalho Final Frameworks Web I

Bem-vindo ao **CambioExchange**! 👋

Este repositório contém a aplicação web desenvolvida para o trabalho final da disciplina de **Frameworks Web I** do curso de Análise e Desenvolvimento de Sistemas no **Unilavras** (Prof. João Marcelo de Almeida Garcia).

---

## 💡 Sobre o Projeto

O **CambioExchange** é uma Single Page Application (SPA) desenvolvida em React que permite acompanhar cotações de moedas globais e criptomoedas em tempo real (USD, EUR, BTC, GBP, ETH, LTC, CAD, ARS). A aplicação permite filtrar cotações por categorias, realizar pesquisas instantâneas, calcular conversões diretas de valores para Real (BRL) e visualizar informações detalhadas e variação diária através de rotas dinâmicas.

### 🛠️ Tecnologias e Bibliotecas Utilizadas

- **[React 18](https://react.dev/)**: Biblioteca principal para construção da interface SPA.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build de alta performance para o ambiente de desenvolvimento.
- **[Material-UI (MUI v5)](https://mui.com/)**: Biblioteca de componentes UI estilizados (`Container`, `Paper`, `Grid`, `Card`, `Chip`, `Select`, `TextField`, `Alert`, `CircularProgress`).
- **[React Router DOM v6](https://reactrouter.com/)**: Gerenciamento de rotas e parâmetros dinâmicos (`/moeda/:id`).
- **[Axios](https://axios-http.com/)**: Cliente HTTP para consumir os endpoints `/last` e `/daily` da AwesomeAPI.
- **[AwesomeAPI](https://docs.awesomeapi.com.br/)**: API pública para consulta de cotações financeiras e economia; Uso de IA para Formatar o README.md e corrigir o texto..

---

## 🔥 Funcionalidades Principais

- 📌 **Listagem de Cotações com Paginação (`/`)**: Exibição dos cards de moedas em tempo real com controle de paginação interativo.
- 🔍 **Busca e Filtros Combináveis**: Campo de pesquisa textual (nome ou código) integrado a filtros de categoria (Todas, Fiduciárias FIAT e Criptomoedas).
- 🧮 **Conversor de Câmbio (`/conversor`)**: Cálculo dinâmico para simulação direta de conversão de valores entre moedas selecionadas e Real (BRL).
- 📊 **Rota Dinâmica de Detalhes (`/moeda/:id`)**: Exibição detalhada com cotação máxima, mínima, valor de oferta/demanda, variação e data da última atualização.
- ⏳ **Feedback Visual e Tratamento de Erros**:
  - Componente genérico `<Loading />` reutilizável com spinner `CircularProgress`.
  - Componente `<ErrorMessage />` amigável com suporte ao botão "Tentar Novamente" (`onRetry`) em falhas na API.

---

## 👥 Integrantes do Grupo

- Rafael Henrique De Oliveira Gomide
- Vinicius Pereira Borges

---
## 🚀 Como Executar o Projeto Localmente

Siga as instruções abaixo para rodar o projeto na sua máquina:

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/faelzinn2003/trabalho-final-Frameworks_Web_I.git](https://github.com/faelzinn2003/trabalho-final-Frameworks_Web_I.git)


