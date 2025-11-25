# Find Job Website

**Find Job Website** là nền tảng tuyển dụng việc làm hiện đại, giúp kết nối nhà tuyển dụng và người tìm việc một cách nhanh chóng và hiệu quả.

Website cung cấp các tính năng chính như:

- Đăng tin tuyển dụng
- Tìm kiếm và ứng tuyển công việc
- Quản lý hồ sơ cá nhân & công ty
- Lọc việc làm theo lương, địa điểm, kinh nghiệm,...

## Tech Stack

### Frontend

- HTML5, CSS3, JavaScript (Vanilla / có thể nâng cấp lên React sau)
- Responsive Design (Mobile)

### Backend

- **NestJS** (Node.js framework - cấu trúc sạch, dễ mở rộng)
- **Prisma ORM** (type-safe, dễ migrate và query)
- **MySQL** (database chính)

### Tools & Services

- Git & GitHub (quản lý source)
- ESLint + Prettier (code quality)
- Docker & Docker Compose (dev environment)

## Project Structure

```

find-job-website/
├── backend/ # NestJS + Prisma
│ ├── prisma/ # Schema + migrations
│ ├── src/
│ │ ├── user/ # Quản lý người dùng
│ │ ├── job/ # Tin tuyển dụng
│ │ ├── application/ # Đơn ứng tuyển
│ ├── test/ # Unit & e2e tests
│ └── ...
│
├── frontend/ # HTML + CSS + JS thuần
│ ├── public/ # assets: images, icons
│ ├── pages/ # các trang: index.html, login.html, jobs.html,...
│ ├── css/
│ ├── js/
│ └── index.html
│
├── docker-compose.yml
└── README.md

```

## Yêu cầu hệ thống

- Node.js >= 18.x
- PostgreSQL 14+
- pnpm hoặc npm hoặc yarn

## Hướng dẫn cài đặt & chạy dự án (Local)

### 1. Clone repository

```bash
git clone https://github.com/username/find-job-website.git
cd find-job-website
```

### 2. Cài đặt Backend (NestJS)

```bash
cd backend
cp .env.example .env          # Sửa các biến môi trường (DB_URL, JWT_SECRET,...)
npm install                   # hoặc pnpm install / yarn
npx prisma generate
npx prisma migrate dev        # Tạo DB và chạy migration
npx prisma db seed            # (nếu có seed data)

# Chạy dev mode
npm run start:dev
```

Backend sẽ chạy tại: `http://localhost:3000`  
API docs (Swagger): `http://localhost:3000/api-docs`

### 3. Cài đặt Frontend

```bash
cd ../frontend
# Chỉ cần mở file index.html bằng Live Server (VS Code extension)
```

> Lưu ý: Frontend hiện tại gọi API backend qua CORS → cần cấu hình `http://localhost:8080` trong backend (file `main.ts`)

### 4. Chạy toàn bộ bằng Docker (khuyến khích)

```bash
docker-compose up --build
```

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:8080`
- PostgreSQL: port `5432`

## Nhóm phát triển

Nhóm 2

## License

Dự án được phát triển với mục đích học tập và portfolio.

---

**Find Job Website – Tìm việc dễ dàng, tuyển dụng nhanh chóng!**

Nếu bạn thấy dự án hữu ích, đừng quên cho 1 ⭐ nhé! 🚀
