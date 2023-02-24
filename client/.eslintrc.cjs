module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
