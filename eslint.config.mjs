import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...nextTypeScript,
  {
    ignores: [".next/**", ".tmp*/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
