import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      /* An unused value is almost always a leftover; allow _ prefixes for the
         deliberate ones (unused route params, ignored callback args). */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      /* The site is statically exported with images.unoptimized, so next/image
         buys nothing here and plain <img> is the right call. */
      '@next/next/no-img-element': 'off',
      /* This rule is about pages/_document.js. The Google Fonts <link> lives in
         the App Router root layout, which does apply to every route. Switching
         to next/font would remove the tag entirely - see the README. */
      '@next/next/no-page-custom-font': 'off',
    },
  },

  /* Must stay last: switches off every rule Prettier owns. */
  prettier,
];

export default config;
