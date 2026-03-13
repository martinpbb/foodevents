# FoodEvents Web Platform

Frontend web platformy pro organizaci gastronomických a street-food akcí.

Projekt je postaven na moderním stacku:

- React
- Vite
- React Router
- Cypress (E2E testing)
- Allure Report

Primární cíl projektu je vytvořit rychlý, modulární a SEO optimalizovaný web pro prezentaci a správu eventů.

---

# Installation

Nejprve naklonuj repozitář:

```bash
git clone https://github.com/your-repo/foodevents.git
cd foodevents
```

Nainstaluj všechny závislosti:

```bash
npm install
```

---

# Development

Spuštění vývojového serveru:

```bash
npm run dev
```

Aplikace poběží na:

```
http://localhost:5173
```

Hot reload je automaticky aktivní.

---

# Build

Vytvoření produkčního buildu:

```bash
npm run build
```

Výsledný build se vytvoří ve složce:

```
/dist
```

Pro lokální preview buildu:

```bash
npm run preview
```

---

# Testing

Projekt používá **Cypress pro E2E testy**.

Spuštění Cypress GUI:

```bash
npx cypress open
```

Spuštění testů přes command line:

```bash
npx cypress run
```

---

# Environment Test Configurations

Projekt podporuje více testovacích prostředí.

Například:

```
envs/
   qa/
   qa-loc/
   prod/
```

Testy lze spouštět například:

```bash
npm run qa
```

nebo

```bash
npm run qa-loc
```

---

# Allure Reporting

Projekt podporuje **Allure test reporty**.

Generování výsledků:

```bash
npx cypress run
```

Vygenerování reportu:

```bash
allure generate allure-results --clean -o allure-report
```

Otevření reportu:

```bash
allure open allure-report
```

---

# Project Structure

```
src/
   components/
   pages/
   assets/
   data/
   hooks/

envs/
   qa/
   qa-loc/
   prod/

cypress/
   e2e/
   fixtures/
   support/
```

---

# Technology Stack

Frontend:

- React
- Vite
- React Router

Testing:

- Cypress
- Allure

---

# License

Copyright (c) 2026 martinpbb

All rights reserved.

This repository and its contents are provided for viewing purposes only.

You may not copy, modify, distribute, sublicense, or use this code,
in whole or in part, in any commercial or non-commercial project
without explicit written permission from the author.