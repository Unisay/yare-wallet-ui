import * as esbuild from 'esbuild'
import * as fs from 'node:fs';

const certs = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.crt')
};

let ctx = await esbuild.context({
    entryPoints: ['build/dev/index.js'],
    external: ["url", "xhr2"],
    bundle: true,
    outdir: 'dist/js',
})

await ctx.watch()

let { host, port } = await ctx.serve({ servedir: 'dist', port: 10000 })

console.log(`Serving on http://${host}:${port}`)
