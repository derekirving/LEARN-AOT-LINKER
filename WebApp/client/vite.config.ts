import { defineConfig } from 'vite';
import pluginPurgeCss from "vite-plugin-purgecss-updated-v5";
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
    plugins: [pluginPurgeCss({
        content: [
            "src/**/*.ts",
            //"src/themes/**/*.ts",
            //"index.html"
        ],
        variables: true,
    })],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')  // Enables @/src/ imports if needed
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/_variables.scss";`,
                //quietDeps: true,
                silenceDeprecations: [
                    'import',
                    //'mixed-decls',
                    'color-functions',
                    'global-builtin',
                    'if-function'
                ],
            }
        }
    },
    build: {
        outDir: resolve(__dirname, '../wwwroot/client'),
        emptyOutDir: false,
        sourcemap: mode !== 'production',  // Disable in prod
        target: 'es2020',   // Modern browsers,
        rollupOptions: {
            input: resolve(__dirname, 'src/index.ts'),
            output: {
                manualChunks: (id: string) => {
                    if (id.includes('themes')) return 'themes';
                    return null;
                }
            }
        }
    }
}));