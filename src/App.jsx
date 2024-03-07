import "./App.css"; // Import CSS styles
import { ToastContainer, toast } from "react-toastify"; // Import components from react-toastify library
import "react-toastify/dist/ReactToastify.css"; // Import CSS styles for react-toastify

function App() {
  const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ""; // Get the Google Script URL from Vite environment variables, or use an empty string if not defined

  async function formSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    const form = e.target; // Get the form element

    if (form.checkValidity()) {
      const formData = new FormData(form); // Create FormData object from form data

      try {
        const response = await fetch(googleScriptUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            toast.success("Form submitted successfully!", { // Display success toast notification
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            form.reset(); // Reset the form
          } else {
            toast.error("Form submission failed. Please try again later."); // Display error toast notification if form submission failed
            console.error(data.message); // Log error message to console
          }
        } else {
          toast.error("Server error. Please try again later."); // Display error toast notification for server error
          console.error("Server error:", response.statusText); // Log server error to console
        }
      } catch (error) {
        toast.error("Network error. Please check your internet connection."); // Display error toast notification for network error
        console.error("Network error:", error.message); // Log network error to console
      }
    } else {
      toast.error("Form validation failed. Please fill in all required fields."); // Display error toast notification for form validation failure
      console.error("Form validation failed"); // Log form validation failure to console
    }
  }

  return (
    <>
      <div className="App">
        <h1>
          <i className="welcome"> Welcome</i> to{" "}
          <i className="fa-solid fa-phone"></i> Page
        </h1>
        <form className="form" onSubmit={(e) => formSubmit(e)}> {/* Form element with onSubmit event handler */}
          <input
            className="form-input"
            name="Name"
            id="Name"
            placeholder="Enter Name..."
            type="text"
            required
          />
          <input
            className="form-input"
            name="Email"
            id="Email"
            placeholder="Enter Email..."
            type="email"
            required
          />
          <input
            className="form-input"
            name="Phone"
            id="Phone"
            placeholder="Enter Phone..."
            type="tel"
            pattern="[0-9]*"
            title="Please enter only digits for the phone number."
            required
          />
          <input
            className="form-input"
            name="Message"
            id="Message"
            placeholder="Enter Message...(optional)"
            type="text"
          />
          <button type="submit">Submit</button> {/* Submit button */}
        </form>
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "black" }} /> {/* Toast container for displaying toast notifications */}
    </>
  );
}

export default App; // Export the App component
