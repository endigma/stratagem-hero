import { sveltekit } from '@sveltejs/kit/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import uno from 'unocss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		uno({
			extractors: [extractorSvelte],
			content: {
				pipeline: {
					include: ['./**/*.svelte', './src/lib/styles/*.ts']
				}
			}
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
