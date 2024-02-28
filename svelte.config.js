import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { preprocessMeltUI, sequence } from "@melt-ui/pp"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

	kit: {
		paths: {
			base: process.argv.includes("dev") ? "" : process.env.BASE_PATH
		},
		adapter: adapter()
	}
}

export default config
