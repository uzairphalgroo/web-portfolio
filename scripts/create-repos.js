
const https = require('https');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
try {
    const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
} catch (e) {
    console.warn("Could not load .env.local", e.message);
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// Use a fallback or parsed username, but API usually infers from token for /user/repos
// Portfolio data says "uzairphalgroo"
const REPO_NAMES = [
    "cybersecurity-network",
    "web-development",
    "ai",
    "finance"
];

if (!GITHUB_TOKEN) {
    console.error("Error: GITHUB_TOKEN not found in .env.local. Cannot verify identity to create repositories.");
    process.exit(1);
}

function createRepo(name) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            name: name,
            description: `Portfolio project repository for ${name}`,
            private: false,
            auto_init: true // Creates a README so it's not empty
        });

        const options = {
            hostname: 'api.github.com',
            path: '/user/repos',
            method: 'POST',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'Node-Script',
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 201) {
                    console.log(`✅ Created: ${name}`);
                    resolve(true);
                } else if (res.statusCode === 422) {
                    console.log(`⚠️  Exists/Failed: ${name} (Status: 422 - Likely already exists)`);
                    resolve(true); // Treat as success for workflow
                } else {
                    console.error(`❌ Failed: ${name} (Status: ${res.statusCode})`);
                    console.error('Response:', body);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request for ${name}: ${e.message}`);
            resolve(false);
        });

        req.write(data);
        req.end();
    });
}

async function main() {
    console.log("Starting repository creation...");
    let successCount = 0;

    for (const name of REPO_NAMES) {
        const success = await createRepo(name);
        if (success) successCount++;
        // Tiny delay to be nice to API
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`\nProcess completed. Success/Skipped: ${successCount}/${REPO_NAMES.length}`);
}

main();
