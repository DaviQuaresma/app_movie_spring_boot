# 🎬 MovieApp - Sistema de Gerenciamento de Filmes

Uma aplicação moderna e completa para gerenciar sua coleção pessoal de filmes, desenvolvida com **Angular 18+** e **Spring Boot**.

![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Material Design](https://img.shields.io/badge/Material%20Design-0081CB?style=for-the-badge&logo=material-design&logoColor=white)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Características Principais](#-características-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Uso da Aplicação](#-uso-da-aplicação)
- [API Endpoints](#-api-endpoints)
- [Componentes Principais](#-componentes-principais)
- [Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
- [Screenshots](#-screenshots)
- [Contribuição](#-contribuição)

## 🎯 Visão Geral

O **MovieApp** é uma aplicação full-stack moderna que permite aos usuários:

- 🔐 **Autenticar-se** com sistema de login/registro seguro
- 🎬 **Gerenciar filmes** com busca automática via API externa
- 📊 **Visualizar estatísticas** detalhadas da coleção
- 🎨 **Navegar** por uma interface moderna e responsiva
- 🔄 **Paginar** grandes coleções de filmes
- 💫 **Interagir** com cards 3D animados

## ✨ Características Principais

### 🔒 Sistema de Autenticação
- Login e registro de usuários
- Proteção de rotas com guards
- Gerenciamento de tokens JWT
- Logout automático

### 🎬 Gerenciamento de Filmes
- **Busca automática** de filmes via API externa (OMDB/TMDB)
- **Cards 3D interativos** com flip animation
- **Visualização detalhada** com poster, sinopse, elenco, etc.
- **Exclusão** de filmes da coleção
- **Sistema de pesquisa** em tempo real

### 📊 Estatísticas Avançadas
- **Análise por gêneros** com gráficos coloridos
- **Distribuição temporal** por décadas
- **Rankings** de diretores e países
- **Métricas de avaliação** IMDB
- **Estatísticas de duração** e prêmios
- **Dashboards visuais** interativos

### 🎨 Interface Moderna
- **Design responsivo** para todos os dispositivos
- **Tema consistente** com Tailwind CSS
- **Ícones Material Design** profissionais
- **Animações suaves** e transições
- **Estados de loading** e feedback visual

### 🔧 Funcionalidades Técnicas
- **Paginação inteligente** para grandes coleções
- **Lazy loading** de componentes
- **Signals do Angular** para reatividade
- **SSR-ready** com verificação de plataforma
- **Error handling** robusto

## 🛠 Tecnologias Utilizadas

### Frontend
- **Angular 18+** - Framework principal
- **TypeScript** - Linguagem de programação
- **Tailwind CSS** - Framework de estilos
- **Angular Material** - Componentes UI
- **RxJS** - Programação reativa
- **Axios** - Cliente HTTP

### Backend
- **Spring Boot** - Framework Java
- **Spring Security** - Autenticação e autorização
- **JWT** - Tokens de autenticação
- **JPA/Hibernate** - ORM
- **PostgreSQL/MySQL** - Banco de dados

### DevOps & Tools
- **Angular CLI** - Tooling
- **Git** - Controle de versão
- **VS Code** - IDE
- **Postman** - Testes de API

## 🏗 Arquitetura

### Frontend (Angular)
```
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── header/         # Header com navegação
│   │   ├── pagination/     # Componente de paginação
│   │   └── register/       # Formulário de registro
│   ├── pages/              # Páginas da aplicação
│   │   ├── login/          # Página de login
│   │   ├── movie/          # Dashboard de filmes
│   │   └── statistics/     # Página de estatísticas
│   ├── middleware/         # Guards e interceptors
│   └── app.routes.ts       # Configuração de rotas
├── services/               # Serviços
│   ├── api.ts             # Comunicação com backend
│   └── auth.service.ts    # Gerenciamento de autenticação
└── styles.css             # Estilos globais
```

### Padrões Arquiteturais
- **Standalone Components** - Componentes independentes
- **Signal-based State** - Gerenciamento de estado reativo
- **Service Layer** - Separação de responsabilidades
- **Guard Protection** - Proteção de rotas
- **Lazy Loading** - Carregamento sob demanda

## 📁 Estrutura do Projeto

```
app_movie_spring_boot/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   ├── header-component.ts
│   │   │   │   └── header-component.html
│   │   │   ├── pagination/
│   │   │   │   ├── pagination.ts
│   │   │   │   └── pagination.html
│   │   │   └── register/
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   │   ├── login-page.ts
│   │   │   │   └── login-page.html
│   │   │   ├── movie/
│   │   │   │   ├── movie-page.ts
│   │   │   │   └── movie-page.html
│   │   │   └── statistics/
│   │   │       ├── statistics-page.ts
│   │   │       └── statistics-page.html
│   │   ├── middleware/
│   │   │   └── middleware-guard.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   └── app.routes.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── auth.service.ts
│   ├── styles.css
│   └── main.ts
├── public/
├── angular.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js (v18+)
- Angular CLI (v18+)
- Java 17+
- Spring Boot 3.x
- Banco de dados (PostgreSQL/MySQL)

### Frontend Setup
```bash
# Clone o repositório
git clone https://github.com/DaviQuaresma/app_movie_spring_boot.git
cd app_movie_spring_boot

# Instale as dependências
npm install

# Configure o ambiente
cp src/environments/environment.example.ts src/environments/environment.ts

# Execute o servidor de desenvolvimento
ng serve
```

### Backend Setup
```bash
# Configure o banco de dados no application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/movieapp
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# Execute a aplicação Spring Boot
./mvnw spring-boot:run
```

### Variáveis de Ambiente
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8005',
  omdbApiKey: 'sua_chave_omdb'
};
```

## 📱 Uso da Aplicação

### 1. Autenticação
1. **Registro**: Crie uma nova conta com email, senha e nome completo
2. **Login**: Acesse com suas credenciais
3. **Proteção**: Rotas protegidas redirecionam para login se não autenticado

### 2. Gerenciamento de Filmes
1. **Adicionar**: Clique em "Adicionar Filme" e digite o título
2. **Visualizar**: Explore os cards com informações detalhadas
3. **Flip 3D**: Clique nos cards para ver mais detalhes no verso
4. **Pesquisar**: Use a barra de pesquisa para filtrar filmes
5. **Paginar**: Navegue por grandes coleções com paginação

### 3. Estatísticas
1. **Acesse**: Clique em "Estatísticas" no header
2. **Explore**: Veja análises por gênero, década, diretor, etc.
3. **Interaja**: Visualize gráficos e rankings dinâmicos

## 🔗 API Endpoints

### Autenticação
```http
POST /auth/login
POST /auth/signup
GET /users/me
```

### Filmes
```http
GET /movie                    # Buscar filmes (paginado)
GET /movie/allMovies         # Buscar todos os filmes
GET /movie/search?title=     # Buscar filme por título (API externa)
GET /movie/{id}              # Buscar filme por ID
DELETE /movie/{id}           # Excluir filme
```

### Parâmetros de Paginação
```http
GET /movie?page=1&totalPages=20
```

## 🧩 Componentes Principais

### HeaderComponent
- **Localização**: `src/app/components/header/`
- **Funcionalidades**:
  - Navegação responsiva
  - Menu dropdown do usuário
  - Logout integrado
  - Detecção de rota ativa
  - Menu mobile com animações

### PaginationComponent
- **Localização**: `src/app/components/pagination/`
- **Funcionalidades**:
  - Navegação por páginas
  - Seletor de itens por página
  - Design responsivo (mobile/desktop)
  - Indicadores visuais de página atual
  - Reticências para muitas páginas

### MoviePage
- **Localização**: `src/app/pages/movie/`
- **Funcionalidades**:
  - Grid responsivo de filmes
  - Cards 3D com flip animation
  - Modal de adição de filmes
  - Sistema de pesquisa
  - Integração com paginação

### StatisticsPage
- **Localização**: `src/app/pages/statistics/`
- **Funcionalidades**:
  - Dashboards visuais
  - Gráficos de barras animados
  - Cards de resumo
  - Rankings interativos
  - Análises computadas

## ⚡ Funcionalidades Detalhadas

### 🎨 Cards 3D Interativos
```css
/* Frente do card: Poster e informações básicas */
.flip-card-front {
  - Poster do filme em alta qualidade
  - Overlay com gradient
  - Rating IMDB com estrela
  - Título, ano e gênero
  - Indicador de clique
}

/* Verso do card: Detalhes completos */
.flip-card-back {
  - Sinopse do filme
  - Diretor e elenco
  - Informações técnicas
  - Prêmios e bilheteria
  - Botão de exclusão
}
```

### 📊 Sistema de Estatísticas
```typescript
// Análises computadas automaticamente
genreStats()     // Top 8 gêneros com percentuais
decadeStats()    // Distribuição por décadas
directorStats()  // Top 5 diretores
ratingStats()    // Distribuição de avaliações IMDB
runtimeStats()   // Estatísticas de duração
countryStats()   // Top 6 países
awardsStats()    // Filmes premiados
```

### 🔄 Paginação Inteligente
```typescript
// Componente reutilizável
<app-pagination
  [currentPage]="currentPage()"
  [totalPages]="totalPages()"
  [itemsPerPage]="itemsPerPage"
  [totalItems]="totalItems()"
  (pageChange)="onPageChange($event)">
</app-pagination>
```

### 🛡 Proteção de Rotas
```typescript
// Guard de autenticação
{
  path: 'movies',
  component: MoviePage,
  canActivate: [AuthGuard]
}
```

## 🎯 Recursos Avançados

### Signal-based Architecture
- **Reatividade**: Atualizações automáticas da UI
- **Performance**: Detecção de mudanças otimizada
- **Simplicidade**: Código mais limpo e legível

### SSR Compatibility
- **Platform Detection**: Verificação de browser/server
- **LocalStorage Safety**: Acesso seguro em SSR
- **Hydration Ready**: Preparado para renderização universal

### Error Handling
- **API Errors**: Tratamento de erros de rede
- **User Feedback**: Mensagens de erro amigáveis
- **Fallback States**: Estados alternativos para falhas

### Responsive Design
- **Mobile First**: Design otimizado para mobile
- **Breakpoints**: Tailwind CSS responsivo
- **Touch Friendly**: Elementos otimizados para toque

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **Angular Style Guide**: Siga as convenções oficiais
- **TypeScript Strict**: Use mode strict
- **Prettier**: Formatação automática
- **ESLint**: Linting obrigatório

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou corrige testes
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Desenvolvedores

- **Davi Quaresma** - *Desenvolvimento Full-Stack* - [@DaviQuaresma](https://github.com/DaviQuaresma)

## 🙏 Agradecimentos

- **Angular Team** - Framework incrível
- **Tailwind CSS** - Sistema de design consistente
- **Material Design** - Ícones e componentes
- **OMDB API** - Dados de filmes
- **Spring Boot** - Backend robusto

## 📞 Suporte

Para suporte, envie um email para quaresma.davi@gmail.com ou abra uma issue no GitHub.

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!**

**🚀 Happy Coding!**
