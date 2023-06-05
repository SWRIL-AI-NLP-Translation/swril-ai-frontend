import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

/** @type {import('@sveltejs/kit').Config} */

var path = fileURLToPath(import.meta.url)

if (path.includes('\\')) {
	path = path.split('\\').join('\\\\')
}

const filePath = dirname(path)
const sassPath = `${filePath}/src/lib/styles/`

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import '${sassPath}_global-imports.scss';`
		}
	}),
	kit: {
		adapter: adapter()
	}
};

export default config
