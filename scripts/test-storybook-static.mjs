import { spawn } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { access } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = path.resolve('storybook-static');
const host = process.env.STORYBOOK_TEST_HOST || '127.0.0.1';
const port = Number(process.env.STORYBOOK_TEST_PORT || 6006);
const url = `http://${host}:${port}`;

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

const sendFile = (response, filePath) => {
  response.writeHead(200, {
    'Content-Type':
      contentTypes.get(path.extname(filePath)) || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url || '/', url);
  let pathname;

  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const requestedPath = path.resolve(root, `.${pathname}`);

  if (
    !requestedPath.startsWith(`${root}${path.sep}`) &&
    requestedPath !== root
  ) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  let filePath = requestedPath;

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!existsSync(filePath)) {
    filePath = path.join(root, 'index.html');
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  sendFile(response, filePath);
});

await access(path.join(root, 'index.html'));

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(port, host, resolve);
});

const child = spawn(
  'yarn',
  ['test-storybook', '--url', url, '--maxWorkers=2'],
  {
    env: {
      ...process.env,
      TARGET_URL: url,
    },
    stdio: 'inherit',
  },
);

const exitCode = await new Promise((resolve) => {
  child.on('error', () => resolve(1));
  child.on('exit', (code) => resolve(code ?? 1));
});

await new Promise((resolve) => server.close(resolve));
process.exit(exitCode);
