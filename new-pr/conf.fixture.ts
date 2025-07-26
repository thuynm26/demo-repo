import { test as base } from '@playwright/test';
import { loadMergedConfig } from '../utils/config';

export const test = base.extend<{ conf: any }>({
    conf: async ({ }, use, testInfo) => {
        // Get path to test file
        const testFilePath = testInfo.file;

        // Get case ID
        let caseId = testInfo?.tags?.[0];
        if (!caseId) {
            throw new Error('Cannot determine caseId from test title: ' + testInfo.title);
        }

        // Remove @
        caseId = caseId.replace('@', '');

        // Get env from process.env or default to 'dev'
        const env = process.env.ENV || 'dev';

        // Get config data
        const confData = loadMergedConfig(testFilePath, env, "conf", caseId);
        await use(confData);
    }
});

export { expect } from '@playwright/test';