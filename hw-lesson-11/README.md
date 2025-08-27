# Products App

Полнофункциональное SPA приложение для управления товарами с использованием React и Node.js.

## Структура проекта

```
app/
├─ server/                 # Backend API
│  ├─ src/
│  │  ├─ v1/
│  │  │  ├─ controllers/   # Контроллеры API
│  │  │  ├─ models/        # Модели MongoDB
│  │  │  ├─ routes/        # Маршруты API
│  │  │  ├─ services/      # Бизнес-логика
│  │  │  ├─ utils/         # Утилиты
│  │  │  └─ validators/    # Валидация данных
│  │  └─ index.js          # Точка входа сервера
│  ├─ config/              # Конфигурация
│  ├─ middleware/          # Middleware
│  └─ package.json
│
└─ client/                 # Frontend React App
   ├─ src/
   │  ├─ app/              # Конфигурация приложения
   │  │  ├─ router/        # Роутинг
   │  │  └─ store.js       # Redux store
   │  ├─ shared/           # Общие ресурсы
   │  │  └─ constants/     # Константы
   │  ├─ layouts/          # Макеты страниц
   │  ├─ widgets/          # Виджеты (Navbar)
   │  ├─ pages/            # Страницы
   │  └─ features/         # Фичи приложения
   │     ├─ products/      # Управление товарами
   │     │  ├─ ui/         # UI компоненты
   │     │  ├─ api.js      # API клиент
   │     │  └─ productsSlice.js
   │     └─ posts/         # Посты из JSONPlaceholder
   │        ├─ ui/
   │        └─ postsSlice.js
   └─ package.json
```

## Функциональность

### Товары

- ✅ Просмотр списка товаров
- ✅ Добавление новых товаров
- ✅ Удаление товаров
- ✅ Поиск с debounce (300ms)
- ✅ Валидация форм
- ✅ Индикаторы загрузки и ошибок

### Посты

- ✅ Загрузка постов из JSONPlaceholder API
- ✅ Индикаторы загрузки и ошибок
- ✅ Повторная загрузка при ошибке

## Технологический стек

### Frontend

- React 18+
- Vite
- React Router DOM
- Redux Toolkit
- Axios

### Backend

- Node.js
- Express
- MongoDB/Mongoose
- Express Validator
- CORS

## Запуск проекта

### Разработка (запуск обеих частей)

```bash
npm run dev
```

### Только сервер

```bash
npm run server:dev
```

### Только клиент

```bash
npm run client:dev
```

## API Endpoints

### Products

- `GET /api/v1/products` - Получить список товаров
- `POST /api/v1/products` - Создать товар
- `DELETE /api/v1/products/:id` - Удалить товар
- `GET /health` - Health check

### Health Check

- `GET /health` - Возвращает `{ ok: true }`

## Переменные окружения

### Server (.env)

```
PORT=4000
MONGODB_URL=mongodb://localhost:27017/
DATABASE_NAME=products-app
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (.env)

```
VITE_API_URL=http://localhost:4000/api/v1
```

## Архитектурные решения

### Константы

Все маршруты, статусы запросов и API endpoints вынесены в константы в папку `shared/constants/`:

- `routes.js` - маршруты приложения
- `api.js` - API endpoints и статусы

### Слои приложения

- **app/** - конфигурация приложения (store, router)
- **shared/** - общие ресурсы и константы
- **widgets/** - переиспользуемые виджеты
- **pages/** - страницы приложения
- **features/** - фичи с собственной логикой (slice + UI + API)

### State Management

- Redux Toolkit с `createSlice` и `createAsyncThunk`
- Entity Adapter для нормализации данных товаров
- Централизованное управление статусами загрузки

## Критерии готовности

- [x] Создание товара работает
- [x] Удаление товара работает
- [x] Фильтр с debounce работает
- [x] Загрузка постов работает
- [x] Обработка ошибок работает
- [x] Health check доступен
- [x] Код структурирован и использует константы

## Установка

1. Клонировать репозиторий

   ```bash
   git clone https://github.com/ваш-логин/products-app.git
   cd products-app
   ```

2. Установить зависимости

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. Скопировать и настроить переменные окружения

   ```bash
   # Set up environment variables
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   # Edit .env files with your actual configuration values
   ```

4. Запустить проект в режиме разработки

   ```bash
   npm run dev
   ```

Теперь приложение доступно по адресу [http://localhost:5173](http://localhost:5173), а сервер API - по адресу [http://localhost:4000](http://localhost:4000).
