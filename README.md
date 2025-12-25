# ApniSec - Enterprise Cyber Security Solutions

**[Click Here to View Live Demo](https://apnisec-assignment-opal.vercel.app/)** 🚀

ApniSec is a full-stack Enterprise Security Dashboard...

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Cyberpunk/Dark Theme)
* **Database:** PostgreSQL (via Supabase)
* **ORM:** Prisma
* **Authentication:** Custom JWT Auth (HttpOnly Cookies)
* **Email Service:** Resend
* **Deployment:** Vercel

## ✨ Key Features

* **Secure Authentication:** Custom implementation using `jose` for JWT signing and verification.
* **Role-Based Access:** Protected routes middleware ensuring only authenticated users access the dashboard.
* **Rate Limiting:** Custom OOP-based Rate Limiter (Token Bucket algorithm) protecting API endpoints.
* **Real-time Notifications:** Automated email alerts for registration and issue reporting.
* **Issue Management:** Complete CRUD operations for tracking VAPT and Cloud Security issues.
* **User Profiles:** Profile management with secure update capabilities.
* **SEO Optimized:** Fully configured metadata and OpenGraph tags.

## 🛠️ Installation & Setup Instructions

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
* Node.js (v18 or higher)
* npm
* A Supabase Account (for PostgreSQL)
* A Resend Account (for Emails)

### 2. Clone the Repository
```bash
git clone https://github.com/Zireael16/apnisec-assignment.git
cd apnisec-assignment
```
### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add the following keys:

```env
# Database Connection (Supabase Transaction Pooler URL recommended)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-region.pooler.supabase.com:6543/postgres"

# Security Secrets
JWT_SECRET="your-super-secret-key-change-this"

# Email Service API Key (Get this from Resend.com)
RESEND_API_KEY="re_123456789"
```

### 5. Setup the Database
Push the Prisma schema to your Supabase database:
```bash
npx prisma generate
npx prisma db push
```

### 6. Run the Application
Start the development server:
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

```text
📂 Project Structure
├── src/
│   ├── app/            # Next.js App Router Pages
│   ├── lib/
│   │   ├── handlers/   # API Route Handlers (Controllers)
│   │   ├── services/   # Business Logic (Service Layer)
│   │   ├── repositories/ # Database Interactions
│   │   └── utils/      # Helpers (RateLimiter, etc.)
│   └── middleware.ts   # Edge Middleware for Auth & Rate Limiting
├── prisma/             # Database Schema
├── public/             # Static Assets
└── README.md           # Documentation
```