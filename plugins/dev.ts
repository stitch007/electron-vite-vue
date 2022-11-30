import type { AddressInfo } from 'net'
import type { ViteDevServer } from 'vite'

export const devPlugin = () => ({
  name: 'dev-plugin',
  configureServer(server: ViteDevServer) {
    require('esbuild').buildSync({
      entryPoints: ['./src/main/mainEntry.ts'],
      bundle: true,
      platform: 'node',
      outfile: './dist/mainEntry.js',
      external: ['electron'],
    })
    server.httpServer?.once('listening', () => {
      const { spawn } = require('child_process')
      const address = server.httpServer!.address() as AddressInfo
      const electronProcess = spawn(require('electron').toString(), [
        './dist/mainEntry.js',
        `http://localhost:${address.port}`,
      ], {
        cwd: process.cwd(),
        stdio: 'inherit',
      })
      electronProcess.on('close', () => {
        server.close()
        process.exit()
      })
    })
  },
})

export const getReplacer = () => {
  const externalModels = [
    'os',
    'fs',
    'path',
    'events',
    'child_process',
    'crypto',
    'http',
    'buffer',
    'url',
    'electron',
  ]
  const electronModules = [
    'clipboard',
    'ipcRenderer',
    'nativeImage',
    'shell',
    'webFrame',
  ]
  return externalModels.reduce((obj, item) => {
    obj[item] = () => ({
      find: new RegExp(`^${item}$`),
      code: item === 'electron'
        ? `const {${electronModules.join(',')}} = require('electron');export {${electronModules.join(',')}}`
        : `const ${item} = require('${item}');export { ${item} as default }`,
    })
    return obj
  }, {})
}
