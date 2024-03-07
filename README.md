# Contact Page with Google Script Integration
![Contact Page Preview](https://raw.githubusercontent.com/yashjainme/contactPage/main/public/preview.png)
This repository contains the code for a contact page integrated with Google's Apps Script to seamlessly send contact form submissions directly to a Google Sheets spreadsheet.

## Features

- **Client-Side Integration:** Utilizes JavaScript to handle form submissions on the client-side, providing a smooth user experience without page reloads.
  
- **Google Script Integration:** Integrates with Google Script to securely transmit form data to a Google Sheets spreadsheet, ensuring data integrity and privacy.
  
- **Secure Data Transmission:** Implements secure HTTP requests to transmit form data securely to Google Script, protecting user information from unauthorized access.
  
- **Easy Setup:** Includes clear instructions and setup guidelines for integrating the contact page with Google Script, making it easy to deploy and customize for your specific needs.

## Usage

1. **Clone the repository**
    ```bash
    git clone https://github.com/yashjainme/contactPage.git
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up Google Script**
    - Create a Google Sheet and Apps Script with the provided code.
    - Deploy the Google Script and obtain the endpoint URL.
    - Update `.env` with your Google Script URL.
    
    ```javascript
    // url of your sheet where data is storing
    const sheets = SpreadsheetApp.openByUrl('YOUR_SHEET_URL');
    // replace name with your sheet name
    const sheet = sheets.getSheetByName('Page1');
    
    function doPost(e) {
      try {
        let data = e.parameter;
        sheet.appendRow([data.Name, data.Email, data.Phone, data.Message]);
    
        let response = {
          success: true,
          message: "Form submitted successfully"
        };
    
        return ContentService.createTextOutput(JSON.stringify(response))
          .setMimeType(ContentService.MimeType.JSON);
      } catch (error) {
        let response = {
          success: false,
          message: error.toString()
        };
    
        return ContentService.createTextOutput(JSON.stringify(response))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    ```

4. **Run the App**
    ```bash
    npm run dev
    ```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Your contributions help make this project better for everyone.


