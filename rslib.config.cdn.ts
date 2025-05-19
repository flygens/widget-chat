import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: './lib/index.ts',
    },
  },
  lib: [
    {
      format: 'umd',
      umdName: 'FlygensWidget',
      output: {
        filename: {
          js: 'widget.js',
        },
      },
    },
  ],
  output: {
    target: 'web',
    cleanDistPath: true,
    minify: {
      js: true,
      css: true,
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
});
