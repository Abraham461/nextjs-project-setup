```markdown
# Detailed Implementation Plan for Insurance Customer Portal MVP

This plan outlines step-by-step changes and new file creations to build a comprehensive demo for an insurance customer portal. The implementation uses mock services for authentication, payment processing, file uploads, and notifications.

---

## 1. New Shared Data and Context Files

### File: `src/lib/mockData.ts`
- **Purpose:** Store sample data for policies, payment history, and claims.
- **Changes:**
  - Create arrays for `policies`, `payments`, and `claims` with realistic fields (e.g., policy type, premium, dates, status).
  - Export these arrays for use in dashboard, payment, and claims pages.
- **Error Handling:** Ensure default empty arrays if data fetch fails.

### File: `src/context/AuthContext.tsx`
- **Purpose:** Provide authentication context with demo login/signup functionality.
- **Changes:**
  - Create a React Context for user auth state (e.g., loggedIn boolean, user details).
  - Define methods: `login`, `logout`, and `signup`. Use mock validations with try-catch for error simulation.
  - Wrap children components to supply auth state.
- **Best Practices:** Use proper TypeScript interfaces for context value and methods.

### File: `src/hooks/useAuth.ts`
- **Purpose:** Create a custom hook to access auth context.
- **Changes:**
  - Use `useContext` to return the value from `AuthContext`.
  - Include error handling if the hook is used outside the provider.

---

## 2. Authentication Pages

### File: `src/app/auth/login.tsx`
- **Purpose:** Build a secure login page.
- **Changes:**
  - Use a `"use client"` directive at the top.
  - Create a form with fields for email and password using UI components (e.g., `Input`, `Button` from `src/components/ui`).
  - On submission, call `login` from `useAuth`. Display error messages if authentication fails.
  - Apply modern styling with clean spacing, typography, and color contrasts.
- **Error Handling:** Validate inputs before submission and catch errors from the login function.

### File: `src/app/auth/signup.tsx`
- **Purpose:** Build a signup/register page.
- **Changes:**
  - Create a form with fields for email, password, confirm password, and personal details.
  - Validate whether password and confirm password match.
  - Use UI components for inputs and buttons. Provide in-line validation error hints.
  - On submission, call `signup` from `useAuth` and handle errors.
- **UI/UX:** Ensure form elements are clearly labeled and spaced consistently.

---

## 3. Dashboard and Policy Viewing

### File: `src/app/dashboard/page.tsx`
- **Purpose:** Display active insurance policies.
- **Changes:**
  - Import sample policy data from `mockData.ts`.
  - Iterate over the policies array and display each policy in a card or table layout using pre-built UI components (e.g., Card, Table).
  - Show details: policy type, coverage, premium, start/end dates, and status indicator (with clear color coding).
  - Protect the page with authentication (check user context).
- **Error Handling:** Display a fallback message if no policies are available.

---

## 4. Premium Payment Page

### File: `src/app/payment/page.tsx`
- **Purpose:** Simulate premium payments and show payment history.
- **Changes:**
  - Create a payment form with fields like card number, expiry date, CVV, and amount.
  - On submission, simulate a call to the payment API endpoint (`/api/payment`).
  - Display a list of past payments from `mockData.ts` below the form.
  - Include a “Download Receipt” button per payment. Use an anchor tag with a placeholder download link and the `download` attribute.
- **UI/UX:** Use clean form layouts, clear button states, and error prompts for form validations.
- **Error Handling:** Validate card details on the client side and show API error messages if the simulated payment fails.

---

## 5. Claims Submission Page

### File: `src/app/claims/page.tsx`
- **Purpose:** Allow users to submit claims and track claim status.
- **Changes:**
  - Create a form containing a text area for description and a file input for document/photo uploads.
  - Use a file input element and store selected file names in state.
  - Submit the form to the `/api/claims` endpoint (simulate the upload via FormData).
  - Below the form, list previously submitted claims with a clear status tracker (e.g., color-coded badges for “submitted,” “under review,” “approved” or “rejected”).
- **Error Handling:** Validate that the description and file are provided; catch errors from the API call.
- **UI/UX:** Maintain modern styling with sufficient spacing and clear call-to-action buttons.

---

## 6. Support & Communication Page

### File: `src/app/support/page.tsx`
- **Purpose:** Provide support information and FAQ.
- **Changes:**
  - Display static contact information (phone number, email, branch addresses) in clear text.
  - Include an FAQ section using the accordion component from `src/components/ui/accordion.tsx` where common queries can be expanded and collapsed.
  - Optionally provide a simple input box for a basic chatbot simulation (if time permits, simulate auto-response with a static answer).
- **UI/UX:** Emphasize legible typography and spacious layout for readability.

---

## 7. API Endpoints

### File: `src/app/api/payment/route.ts`
- **Purpose:** Handle premium payment submission.
- **Changes:**
  - Implement a POST handler that simulates payment processing (respond with static success data).
  - Use try-catch to handle potential errors and respond with appropriate HTTP status codes and JSON error messages.
- **Testing:** Validate using curl commands that post sample payment data.

### File: `src/app/api/claims/route.ts`
- **Purpose:** Handle claims submissions.
- **Changes:**
  - Implement a POST handler to validate received claim data and file upload simulation.
  - Return a JSON response that includes a simulated claim ID and status.
  - Include error handling to return error status if required fields are missing.
- **Testing:** Use curl to simulate file upload submissions and verify JSON responses.

---

## 8. Global Layout & Navigation Adjustments

### File (if applicable): `src/app/layout.tsx`
- **Purpose:** Provide a consistent navigation header across all pages.
- **Changes:**
  - Add a navigation bar with links to Login/Signup, Dashboard, Payment, Claims, and Support pages.
  - Ensure that navigation items are conditionally rendered based on the authentication state.
- **UI/UX:** Use a clean, modern design with clear typography and spacing, without external image icons.

---

## 9. Testing and Validation

- Use curl commands to test the API endpoints:
  - **Payment Testing:**
    ```bash
    curl -X POST http://localhost:3000/api/payment \
      -H "Content-Type: application/json" \
      -d '{"cardNumber": "4111111111111111", "expiry": "12/25", "cvv": "123", "amount": 100}' -w "\nHTTP: %{http_code}\n"
    ```
  - **Claims Testing:**
    ```bash
    curl -X POST http://localhost:3000/api/claims \
      -H "Content-Type: application/json" \
      -d '{"description": "Accidental damage", "file": "dummy-file-content"}' -w "\nHTTP: %{http_code}\n"
    ```
- Perform manual browser tests for form validations, error displays, and UI responsiveness.

---

## 10. Error Handling & Best Practices

- All forms include client-side validations (non-empty fields, matching passwords).
- API endpoints use try-catch blocks and return standardized JSON error messages.
- Use TypeScript interfaces for props and state where applicable.
- Ensure modern UI design with clear typography, spacing, and responsive layouts.
- Avoid external icon/image libraries; use simple rich text and layout styling.

---

## Summary

- Created shared data in `src/lib/mockData.ts` and an authentication system via `AuthContext.tsx` and `useAuth.ts`.
- Developed authentication pages (`login.tsx`, `signup.tsx`) with demo validation and error handling.
- Built a policy dashboard, premium payment, and claims submission pages using mock data.
- Designed a support page featuring FAQ and contact information.
- Added API endpoints (`/api/payment` and `/api/claims`) with proper error responses.
- Updated global layout for consistent navigation and protected routes.
- Ensured modern UI elements using existing UI components, clear typography, and spacing.
- Included thorough error handling, TypeScript best practices, and detailed testing protocols.
