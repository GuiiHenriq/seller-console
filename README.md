# Seller Console

A mini seller console.

## 💻 Deploy

https://seller-console-guilhermeerba.vercel.app/

## 🚀 Features

- Lead Management
- Opportunity Tracking
- Responsive Design
- Mobile-friendly Interface
- Optimistic Updates
- Form Validation with Zod

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** Typescript
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Testing:** Jest + React Testing Library

## 📌 Requirements

- **Node.js**: **v22** (recommended)

Vite has a problem with old versions of Node.js. If you use Node.js below version 22, you can get this error:

```js
TypeError: crypto.hash is not a function
```
 - [TypeError: crypto.hash is not a function · Issue #20287 · vitejs/vite](https://github.com/vitejs/vite/issues/20287)
 - [TypeError: crypto.hash is not a function | Dev Server not starting · vitejs/vite · Discussion #20411](https://github.com/vitejs/vite/discussions/20411)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/GuiiHenriq/seller-console.git
cd seller-console
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── leads/           # Lead management components
│   ├── opportunities/   # Opportunity management components
│   └── ui/              # Shared UI components
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── schemas/             # Validation schemas
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Tests are located next to the components they test.

To run tests:
```bash
npm test
```

