<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ install nodejs, docker desktop, git

```

## Compile and run the project

```bash
# git clone
- git clone https://github.com/KimTienSinh/task-manager-lab.git

# In root folder project task-manager-lab open cmd:
- npm install @nestjs/graphql @nestjs/typeorm graphql typeorm pg
- npm install typeorm-cli

- docker-compose down -v
- docker-compose up --build
- docker ps

# migration
- docker exec -it task-manager-api npm run migration:generate -- src/migrations/CreateTaskTable -d src/data-source.ts
- docker exec -it task-manager-api npm run migration:run

- docker exec -it task-manager-db psql -U postgres -d task_manager
- SELECT * FROM task;

- check http://localhost:3000/graphql

## GraphQL Schema Requirements
mutation {
  createTask(input: {
    title: "Viết báo cáo",
    description: "Viết báo cáo tuần",
    completed: false
  }) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}

mutation {
  updateTask(id: 4, input: {
    title: "ca4",
    completed: true
  }) {
    id
    title
    completed
  }
}

mutation {
  deleteTask(id: 4)
}

query {
  tasks(
    filter: { completed: true, titleContains: "cáo" }
    pagination: { limit: 10, offset: 0 }
  ) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}

query {
  task(id: 4) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}
