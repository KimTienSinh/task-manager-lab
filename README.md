
Setup and run:
install nodejs, docker desktop, git


1. git clone https://github.com/KimTienSinh/task-manager-lab.git

2. In root folder project

open cmd: 
2.1 npm install @nestjs/graphql @nestjs/typeorm graphql typeorm pg

2.2 docker-compose down -v (clear all)
2.3 docker-compose up --build
2.4 docker ps (view list container)
2.5 docker exec -it task-manager-api npm run migration:generate -- src/migrations/CreateTaskTable -d src/data-source.ts (create migration file)
2.6 docker exec -it task-manager-api npm run migration:run (run migration update to db)

2.7 docker exec -it task-manager-db psql -U postgres -d task_manager (log to container)
2.8 SELECT * FROM task; 

2.9 check http://localhost:3000/graphql

======================GraphQL Schema Requirements======================
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
    title: "báo cáo đã sửa",
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

