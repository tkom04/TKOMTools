# TKOMTools

TKOMTools is a collection of web-based calculators and utilities for **Idle Horizons: Dawn of Heroes**. The site is hosted on Netlify and generated from the files in this repository. Each page is a static HTML document with minimal JavaScript.

## Project structure

```
src/
  index.html         - homepage
  cast-timing.html   - Cast Timing calculator
  patch-notes.html   - Patch Notes placeholder
  css/
    style.css
  js/
    main.js
```

The `src` folder contains the source files used to build the site. Additional calculators will be added here over time.

## Development

Open the HTML files directly in a browser for local testing. No build step is required.

### Contributing

1. Fork the repository and create a feature branch.
2. Add or update files inside `src/`.
3. Run `npx prettier --write .` to format code (optional).
4. Open a pull request describing your changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
