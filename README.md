# AWS S3 Demo

Демо-проект показывает полный сценарий работы с приватными файлами в AWS S3:
frontend получает временный URL, загружает файл напрямую в S3, а backend
сохраняет постоянный `coverKey` в локальном MySQL.

JWT в проекте нет. Пользователь поста передаётся через `userId`.

## Стек

- **Frontend:** React 19, Vite 8, обычный CSS.
- **Backend:** Node.js ESM, Express 5, Sequelize 6, локальный MySQL.
- **Хранилище:** AWS S3 через AWS SDK for JavaScript.
- **Доступ к файлам:** presigned URL; секреты находятся только в backend `.env`.

## Запуск

Создай `app/backend/.env` на основе `app/backend/.env.example`, настрой локальный
MySQL и создай `app/frontend/.env` на основе `app/frontend/.env.example`.

```bash
cd app/backend
npm run db:migrate
npm run db:seed
npm run dev

# В отдельном терминале из корня проекта:
cd app/frontend
npm run dev
```

Frontend обычно открывается на `http://localhost:5173`, backend — на
`http://localhost:3333`.

## Структура

```text
app/
├── README.md                         # описание проекта и структуры
├── backend/
│   ├── config/
│   │   ├── app.js                    # настройки приложения из env
│   │   ├── db.cjs                    # общие настройки MySQL для Sequelize
│   │   ├── index.js                  # собирает app, db и storage config
│   │   └── s3.js                     # настройки S3 и проверки конфигурации
│   ├── db/
│   │   ├── config.cjs                # адаптер настроек для sequelize-cli
│   │   ├── models/                   # модели Sequelize и связи
│   │   ├── migrations/               # изменения структуры MySQL
│   │   └── seeders/                  # начальные данные для MySQL
│   └── src/
│       ├── api/v1/
│       │   ├── router.js             # собирает маршруты API v1
│       │   └── routes/               # только подключение controllers
│       ├── integrations/
│       │   ├── database/             # подключение Sequelize к MySQL
│       │   └── storage/              # AWS SDK и операции с S3
│       ├── modules/
│       │   ├── posts/                # Post: controllers, services, validators
│       │   ├── users/                # User: controllers и services
│       │   └── uploads/              # выдача URL для загрузки в S3
│       ├── utils/                    # общие проверки и преобразования
│       ├── app.js                    # Express-приложение и middleware
│       └── server.js                 # подключение к БД и запуск HTTP-сервера
└── frontend/
    ├── src/
    │   ├── components/              # PostForm, PostList и PostCard
    │   ├── config/                  # настройки frontend, включая API URL
    │   ├── services/                # клиентские запросы к backend и S3
    │   ├── App.jsx                  # координирует форму, список и удаление
    │   ├── App.css                  # стили компонентов страницы
    │   └── index.css                # глобальные стили
    ├── public/                      # публичные статические файлы
    └── vite.config.js               # конфигурация Vite
```

## API и загрузка обложки

- `GET /api/v1/posts` — возвращает список постов и временные `coverUrl`.
- `GET /api/v1/posts/:id` — возвращает один Post.
- `POST /api/v1/uploads/upload-url` — backend создаёт presigned URL.
- `PUT <uploadUrl>` — frontend отправляет выбранный файл напрямую в S3.
- `POST /api/v1/posts` — frontend отправляет данные Post и `coverKey` в backend.
- `DELETE /api/v1/posts/:id` — backend удаляет Post из MySQL и его объект из S3.

В MySQL хранится не временный URL, а текстовый ключ объекта, например
`posts/covers/image.jpg`. Для чтения backend по этому ключу создаёт временный
`coverUrl`, который браузер использует для загрузки изображения.
