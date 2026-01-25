
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const https = require('https');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Note: Imagen 3 is often accessed via specific models, checking documentation standard for 'imagen-3.0-generate-001' or similar
// For this script, we'll try the latest accessible standard model for image generation if available, or text-to-image endpoint.
// IMPORTANT: The JS SDK for Gemini sometimes wraps REST APIs. If 'imagen' isn't directly in the typed SDK yet, we might need a REST call or specific model name.
// Assuming 'imagen-3.0-generate-001' is the target model for high quality.

// Configuration
const GITHUB_USERNAME = 'uzairphalgroo';
const PROJECTS_DIR = path.join(__dirname, '../public/projects');

if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
}

async function fetchRepos() {
    console.log(`Fetching repos for ${GITHUB_USERNAME}...`);
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            headers: { 'User-Agent': 'Node-Image-Gen' }
        };

        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`GitHub API Status: ${res.statusCode}`));
                    return;
                }
                try {
                    const repos = JSON.parse(data);
                    resolve(repos.filter(r => !r.fork && r.description));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function generateImage(repoName, description) {
    console.log(`Generating image for ${repoName}...`);

    // Construct a prompt for a tech portfolio tile
    const prompt = `A professional, high-quality, abstract 3D digital art representation of a software project described as: "${description}". 
    Style: Cyberpunk, Neon, Dark Mode, High Tech, Sleek, Glassmorphism.
    Colors: Vibrant gradients (blue, purple, cyan, pink) on dark background.
    No text inside the image. Aspect ratio 16:9.`;

    try {
        // Warning: The GoogleGenerativeAI SDK currently focuses on text/multimodal. 
        // Image generation (Imagen) might require a direct REST call if not fully exposed in this SDK version yet.
        // We will try to use the SDK's model.generateContent if it supports image output, otherwise fallback to fetch.

        // Actually, for Imagen on Gemini API, we might need to use the REST endpoint manually if the SDK version is older.
        // Let's assume we can use the 'imagen-3.0-generate-001' model via the beta endpoint or similar.

        // DIRECT REST CALL FIX for certainty:
        const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`;

        const requestBody = JSON.stringify({
            instances: [{ prompt: prompt }],
            parameters: { sampleCount: 1, aspectRatio: "16:9" }
        });

        // If the specific Imagen model isn't available to the key, we might need a standard 'gemini-pro' text description of an image (which isn't an image).
        // Since the user asked for image generation, checking their key capabilities is crucial. For now we try the standard endpoint.
        // If this fails, we might need to use a different endpoint or model.

        // Simpler approach: Use 'gemini-1.5-flash' to generate an SVG code! An interesting fallback if raster generation fails.
        // But the user accepted "AI to generate image".

        // Let's try to request the image generation.
        const responseRequest = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
        });

        const result = await responseRequest.json();

        if (result.error) {
            console.error(`API Error for ${repoName}:`, result.error);
            return false;
        }

        // Parse response (structure varies by model version, assuming standard Vertex/Gemini format)
        // Usually result.predictions[0].bytesBase64Encoded or similar
        const base64Image = result.predictions?.[0]?.bytesBase64Encoded;

        if (base64Image) {
            const buffer = Buffer.from(base64Image, 'base64');
            const filePath = path.join(PROJECTS_DIR, `${repoName}.png`);
            fs.writeFileSync(filePath, buffer);
            console.log(`Saved ${filePath}`);
            return true;
        } else {
            console.log('Unexpected API response structure:', JSON.stringify(result).substring(0, 200));
            return false;
        }
    } catch (error) {
        console.error(`Failed to generate for ${repoName}:`, error);
        return false;
    }
}

async function main() {
    try {
        const repos = await fetchRepos();
        console.log(`Found ${repos.length} public repos.`);

        for (const repo of repos) {
            const imagePath = path.join(PROJECTS_DIR, `${repo.name}.png`);

            if (fs.existsSync(imagePath)) {
                console.log(`Image exists for ${repo.name}, skipping.`);
                continue;
            }

            console.log(`No image for ${repo.name}. Description: ${repo.description}`);
            if (repo.description) {
                await generateImage(repo.name, repo.description);
                // Rate limit protection
                await new Promise(r => setTimeout(r, 4000));
            }
        }
    } catch (error) {
        console.error('Script failed:', error);
        process.exit(1);
    }
}

main();
