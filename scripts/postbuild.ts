#!/usr/bin/env tsx
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const pkg = await import('../package.json', {
  with: { type: 'json' },
}).then((value) => value.default);

const projectRoot = join(cwd(), 'dist', 'package.json');

Reflect.deleteProperty(pkg, 'scripts');
Reflect.deleteProperty(pkg, 'devDependencies');
Reflect.deleteProperty(pkg, 'pnpm');

pkg.module = './index.js';
pkg.types = './index.d.ts';
pkg.unpkg = './widget.js';
pkg.exports = {
  '.': {
    types: './index.d.ts',
    import: './index.js',
    unpkg: './widget.js',
  },
};
pkg.files = ['index.d.ts', 'index.js', 'widget.js', 'LICENSE', 'README.md'];

writeFileSync(projectRoot, JSON.stringify(pkg, null, '  '));
