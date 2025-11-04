module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000/es",
        "http://localhost:3000/en",
        "http://localhost:3000/es/productos",
        "http://localhost:3000/es/productos/sample-1",
      ],
      numberOfRuns: 3,
      startServerCommand: "npm start",
      startServerReadyPattern: "started server on",
      startServerReadyTimeout: 60000,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["warn", { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
