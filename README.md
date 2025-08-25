# 📌 Raphael Intranet

> Portal interno sendo desenvolvido para empresa KIAN IMPORTAÇÃO LTDA.

---

## 🚀 Funcionalidades

- 🔑 **Autenticação de usuários**
  - Login, registro e confirmação de senha
  - Logout seguro

- 👥 **Gerenciamento de usuários**
  - Tabela de usuários com cargo
  - Botão de administração no dropdown
  - Navbar responsiva (desktop/mobile)

- ☎️ **Dashboard de ramais**
  - Listagem dinâmica de ramais
  - Inclusão e edição de ramais
  - Bloqueio para campos vazios
  - Atualização em tempo real ao adicionar registros
  - Dashboard com busca **case insensitive**
  - Correções de ordem e alinhamento dos dados

- 🍽️ **Cardápio semanal**
  - Upload e atualização de cardápio
  - Remoção automática do anexo após envio
  - Animação de carregamento
  - Restrições de tamanho máximo
  - Acesso restrito para administradores

- 🖼️ **Dashboard de fotos**
  - Estrutura base para galeria
  - Paginação de imagens
  - Ajustes de tamanho do dashboard

- 📄 **Outras páginas**
  - Página inicial
  - Página de requisições
  - Rodapé em páginas autenticadas
  - Customização de atalhos rápidos

- 🎨 **Customizações**
  - Favicon da Kian
  - Estilização e traduções de rotas
  - Ajustes visuais no dropdown e botões

---

## 🛠️ Tecnologias utilizadas

- [Next.js](https://nextjs.org/) — Framework React
- [TypeScript](https://www.typescriptlang.org/) *(se habilitado no projeto)*
- [Tailwind CSS](https://tailwindcss.com/) *(ou outro framework CSS, ajustar se for o caso)*
- Autenticação via **NextAuth.js**
- Banco de dados relacional ( MySQL )

---

## ⚙️ Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/phaaael/raphael-intranet.git
cd raphael-intranet
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` baseado em `.env.example`:

```env
DATABASE_URL=seu_banco_de_dados
NEXTAUTH_SECRET=chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

### 4. Rode o projeto em desenvolvimento
```bash
npm run dev
```
Acesse em [http://localhost:3000](http://localhost:3000)

### 5. Build para produção
```bash
npm run build
npm start
```

---

## 📜 Licença

Projeto desenvolvido para uso interno.

---

## 👤 Autor

Desenvolvido por [@phaaael](https://github.com/phaaael).  
