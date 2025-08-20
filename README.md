# Projeto Trainee CATI.JR Backend

Repositório para armazenar a API do projeto de Trainee no Processo Seletivo da Empresa Jr. Cati.

Pré-requisitos: Node.js

## Variáveis de Ambiente

Para que o projeto possa ser rodado localmente em sua máquina, utilize o arquivo .env.example como base para criar as variáveis necessárias:

DATABASE_URL

## Como Executar

// 1. Clonar o repositório para uma pasta local
  >> git clone git@github.com:ferrpiccinini/Project_Trainee-API-Server.git

// 2. Entrar dentro da pasta principal do repositório
  >> cd Project_Trainee-API-Server

// 3. Instalar as dependências
  >> npm install

// 4. Rodar as migrations do Prisma
  >> npx prisma migrate dev

// 5. Rodar a aplicação em modo de desenvolvedor
  >> npm run dev


A aplicação ficará disponível em http://localhost:3333.

## Entidades
### List
```
CreateListDTOS{
    name: string;
}

UpdateListDTOS{
    id: string;
    name:string;
}

ListDTOS{
    id: string;
    name: string;
    tasks: TaskDTOS[]
}
```


### Entidade: Task

```
TaskDTOS {
    id: string;
    name: string;
    description?: string|null; 
    priority: Priority;
    expectedFinishDate?: Date|null;
    listId: string;
}

CreateTaskDTOS {
    name: string;
    description?: string|null;
    priority: Priority;
    expectedFinishDate?: Date|null;
    listId: string;
}

UpdateTaskDTOS {
    id: string;
    name: string;
    description?: string|null;
    priority: Priority;
    expectedFinishDate?: Date|null;
    listId: string;
}

```

