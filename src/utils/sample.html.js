const sampleHTML = () => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample HTML Template</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    header {
      background-color: #007bff;
      color: white;
      padding: 1rem;
      text-align: center;
    }

    nav {
      background-color: #333;
      color: white;
      padding: 0.5rem;
      text-align: center;
    }

    nav a {
      color: white;
      margin: 0 10px;
      text-decoration: none;
    }

    main {
      padding: 1rem;
    }

    footer {
      background-color: #007bff;
      color: white;
      text-align: center;
      padding: 1rem;
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  </style>
</head>

<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>

  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>

  <main>
    <h2>Main Content</h2>
    <p>This is a simple HTML template you can use to build your website.</p>
  </main>

  <footer>
    <p>&copy; 2024 Your Name. All rights reserved.</p>
  </footer>
</body>

</html>
    `
}

module.exports = {
    sampleHTML
}