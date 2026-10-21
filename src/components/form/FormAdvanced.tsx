import { useActionState } from 'react';
import { FormState, FormData } from './types';
import { validateName, validateEmail } from './utils';
import './index.css';

const Form = () => {
  // Define the form state and action using useActionState hook
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    // Async function to handle form submission
    async (_prevState, formData: FormData) => {
      // Extract name from formData
      const name = formData.get('name') as string;
      // Extract email from formData
      const email = formData.get('email') as string;
      // Capture the submitted values once, so every return path can carry them
      const fields = { name, email };
      // Validate name, then email; each helper returns an error message or null
      const error = validateName(name) ?? validateEmail(email);
      // If validation fails, return the error with fields preserved
      if (error) {
        return { data: null, error, fields };
      }
      try {
        // POST request to submit form data
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData as BodyInit, // Cast formData to BodyInit for fetch
        });
        const data = await response.json(); // Parse the response as JSON
        // Check if submission was unsuccessful
        if (!data.success) {
          throw new Error(data.message); // Throw error with message from response
        }
        // Handle success case
        return {
          data, // Set the returned data
          error: null, // No error
          fields, // Keep the submitted values
        };
      } catch (error) {
        // Handle any errors
        return {
          // No data on error
          data: null,
          // Set error message
          error: `There was a problem with your submission: ${error}`,
          // Keep the submitted values
          fields,
        };
      }
    },
    {
      // Initial state: no data, no error, and empty fields
      data: null,
      error: null,
      fields: {
        name: '',
        email: '',
      },
    }
  );
  return (
    // Form element with action handler
    <form action={formAction}>
      <input // Input field for access key
        type="hidden"
        name="access_key"
        // Access key from environment variable
        value={import.meta.env.VITE_ACCESS_KEY}
      />
      <label htmlFor="name">Name:</label> {/* Label for name input */}
      <input // Input field for name
        id="name"
        type="text"
        name="name"
        // Use defaultValue to pre-fill with submitted name
        defaultValue={state.fields!.name}
      />
      <label htmlFor="email">Email:</label> {/* Label for email input */}
      <input // Input field for email
        id="email"
        type="email"
        name="email"
        // Use defaultValue to pre-fill with submitted email
        defaultValue={state.fields!.email}
      />
      <input // The submission button
        type="submit"
        value="Submit"
        disabled={isPending} // Disable button while submitting
      />
      {/* Display the styled error if present */}
      {state.error && <div className="error">{state.error}</div>}
      {/* Display the styled success message with data */}
      {state.data && (
        <div className="success">
          Form submitted successfully: {JSON.stringify(state.data)}
        </div>
      )}
    </form>
  );
};

export default Form;
