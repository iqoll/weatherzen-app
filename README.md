# WeatherZen App

Welcome to WeatherZen, your personalized weather application built with Webpack and TypeScript.

## Getting Started

1. **Clone the repository:**

    ```bash
    `git clone https://github.com/iqoll/weatherzen-app`
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Run the Development Server:**

    ```bash
    npm run serve
    ```

    This will start the development server, and you can view your app at `http://localhost:3000`.

4. **Build for Production:**

    ```bash
    npm run build
    ```

    This command will build the application for production in the `public` directory.

## Project Structure

- **src:** Contains your source code.
  - **assets:** Images and other assets.
  - **styles:** Stylesheets and CSS files.
  - **template.html:** HTML template used by HtmlWebpackPlugin.

- **webpack.config.js:** Webpack configuration for development.
- **tsconfig.json:** TypeScript configuration.

## How to Use

1. Open **'src/template.html'** and customize the HTML structure as needed.
2. Explore and modify styles in **`src/styles`** for custom styling.
3. Adapt the TypeScript code in **`src/index.ts`** for additional functionality.
4. Run **`npm run build`** to create a production-ready build.

## Features

- **Webpack:** Bundling and Building.
- **Typescript:** Typed superset of JavaScript.
- **Tailwind CSS:** Utility-first CSS framework.
- **dotenv-webpack:** Load environment variables.

## Deployment

Deploy your WeatherZen App to platforms like Netlify or Vercel by configuring environment variables in your deployment settings.

## Author
- Muhammad Haiqal
Feel free to reach out if you have any questions or improvements for WeatherZen. Happy coding!
