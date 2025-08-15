# client-onboarding-form-simple

A simple client onboarding form built with **Next.js**, **React Hook Form (RHF)**, and **Zod** for schema validation.  
It demonstrates form validation, accessibility basics, clean component structure, error and success handling, and the use of an environment variable for the external API endpoint.

---

## 🚀 Features

- **React Hook Form** for state management and submission handling.
- **Zod** for validation and clear error messages.
- **Environment-based API endpoint** (`NEXT_PUBLIC_ONBOARD_URL`).
- **Pre-fill service selection** via URL query parameters.
- **Accessible form markup** with proper labels, error messages, and keyboard navigation.
- **Inline success/error alerts** after submission.
- **Unit test for Zod schema for using jest**.

---
## 🛠 Setup Steps
- git clone https://github.com/shanu198218/client-onboarding-form-simple.

- cd client-onboarding-form-simple.

- npm install

- create .env file and declare the variable **NEXT_PUBLIC_ONBOARD_URL** then add you actual external API endpoint. i used **httpbin.org** service to this demo project.

- npm run dev
- open http://localhost:3000 in your browser.

📋 How RHF + Zod Are Wired

- In OnboardingForm.tsx, the form is initialized with useForm from React Hook Form and a zodResolver that wraps the form.schema.ts file. This links Zod’s validation rules directly to the form. All inputs are registered with RHF’s register method, so when handleSubmit runs, Zod validates the data first. If validation passes, submitOnboardingForm is called; if it fails, RHF automatically fills formState.errors for showing error messages.

<input type="text" {...register("fullName")} /> : RHF register input

Assumptions

- Since a working API endpoint wasn’t given, a public test API (https://httpbin.org/) service post request was  used for submission verification.
- Added a "Demo" button for testing purposes, which auto-fills sample form data (e.g., full name, email, company, selected service). This is for demonstration only and would not be present in production.
- Date Handling: The Default project start date is pre-filled with today’s date.


