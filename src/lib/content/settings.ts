import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { SiteSettings } from './types';

const SETTINGS_PATH = path.join(process.cwd(), 'content', 'settings', 'site.yaml');

export function getSiteSettings(): SiteSettings {
	try {
		const fileContent = fs.readFileSync(SETTINGS_PATH, 'utf-8');
		const data = yaml.load(fileContent) as SiteSettings;
		return data;
	} catch (error) {
		console.error('Error reading site settings:', error);
		return {
			siteName: 'Spooky Emma',
			seoDefaults: {
				ogImage: '/images/og-image.png'
			}
		};
	}
}
