# Postcode Lookup App Documentation

## 1. Project Overview

### Description
This is a postcode lookup app designed to allow users to type in a postcode for an Australian suburb and get the corresponding Suburb name and state.

### Main Feature
The main feature of the app is to find a Suburb name based on a comma-separated list of postcodes entered into a search bar.

## 2. Setup Instructions

### Prerequisites
- Node.js
- Bun

### Cloning and Installing
1. Clone the repository from GitHub:
    ```bash
    git clone https://github.com/zync09/postcode-finder-nuxt3
    ```
2. Navigate to the project directory:
    ```bash
    cd postcode-finder-nuxt3
    ```
3. Install the dependencies and start the development server:
    ```bash
    bun i && bun dev
    ```

## 3. Configuration
No environment variables are needed as no third-party services are used.

## 4. Usage

### Starting the Development Server
To start the development server, use:
```bash
bun dev
```

## 5. Code Structure

### App.vue
The `App.vue` file is the main component of the application. Here's a detailed breakdown of its contents:

- **Template Section:**
  - The main container `UContainer` holds a card `UCard` with a header, body, and footer.
  - The header contains a title "Postcode Search" and a color scheme selector.
  - The body includes a form `UForm` with a text input `UInput` for entering postcodes, a search button `UButton`, and a clear button `UButton`.
  - The footer displays the search results, including known and unknown postcodes.

- **Script Section:**
  - **Interfaces:** `PostcodeItem` and `PostCodeResults` define the structure of the postcode data and the search results.
  - **Form State:** `formState` is a reactive object holding the input postcodes.
  - **Lazy Fetch:** The `useLazyFetch` function is used to fetch the search results from the `/api/search/by-postcode` endpoint.
  - **Watchers:** Watches for errors and logs them to the console.
  - **Handlers:** `handleSubmit` executes the fetch function, and `handleClearResults` clears the form input and search results.

## 6. Form Fields
The app includes:
- **Input Field:** A single text input for entering a list of comma-separated postcodes.
- **Search Button:** Submits the form and triggers the postcode lookup.
- **Clear Button:** Clears the input field and any displayed results.

## 7. API Endpoints

### GET /api/search/by-postcode
This endpoint processes the list of postcodes entered by the user, searches for them in a local JSON file, and returns the matching results.

- **Endpoint:** `/api/search/by-postcode`
- **Method:** GET
- **Parameters:** `postcodes` (comma-separated list of postcodes)

## 8. Common Issues and Troubleshooting

- **Error on Fetching Postcodes:** If the application fails to fetch postcodes, ensure the `postcodes.json` file is in the correct location (`public` directory) and contains valid JSON data.
- **Form Validation:** Ensure the input field is correctly formatted with comma-separated postcodes.

## 9. Contribution Guidelines
To contribute to this project, fork the repository, create a new branch for your feature or bugfix, and submit a pull request with a detailed description of your changes.

## 10. Additional Notes
- The app uses the VueForm library for form handling.
- Make sure to adhere to coding standards and best practices when contributing.
