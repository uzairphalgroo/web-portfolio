
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
const USERNAME = "uzairphalgroo";

if (!GITHUB_TOKEN) {
    console.error("Error: GITHUB_TOKEN not found.");
    process.exit(1);
}

const REPOS = {
    "cybersecurity-network": {
        title: "🛡️ Cybersecurity & Network Infrastructure",
        content: `
# 🛡️ Cybersecurity & Network Infrastructure

![Security Status](https://img.shields.io/badge/Security-Active-brightgreen) ![Network](https://img.shields.io/badge/Network-Hardened-blue) ![Encryption](https://img.shields.io/badge/Encryption-AES--256-red)

Welcome to my repository for **Cybersecurity and Network Engineering**. Here you will find projects focused on vulnerability assessment, penetration testing, and secure infrastructure design.

## 📂 Featured Projects
- **Pentesting Scripts**: Automated Python scripts for network scanning.
- **Firewall Configuration**: Hardened rulesets for enterprise environments.
- **Traffic Analysis**: Wireshark captures and anomaly detection.

## 🛠️ Tech Stack
| Domain | Tools |
| :--- | :--- |
| **Network** | Cisco Packet Tracer, GNS3, Wireshark |
| **Security** | Kali Linux, Metasploit, Nmap, Burp Suite |
| **Scripting** | Python, Bash, PowerShell |

## 🚀 Getting Started
\`\`\`bash
# Clone the repository
git clone https://github.com/${USERNAME}/cybersecurity-network.git
\`\`\`
`
    },
    "web-development": {
        title: "💻 Modern Web Development",
        content: `
# 💻 Modern Web Development

![React](https://img.shields.io/badge/React-19-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

A collection of high-performance web applications featuring responsive design, modern UI/UX principles, and full-stack integration.

## 🌟 Highlights
- **Interactive Portfolios**: 3D animations and scrollytelling experiences.
- **SaaS Dashboards**: Data visualization and user management systems.
- **E-commerce**: Full shopping cart flows with payment integration.

## ⚡ Tech Stack
- **Frontend**: React, Next.js, Framer Motion, Three.js
- **Backend**: Node.js, Express, PostgreSQL / Supabase
- **Styling**: Tailwind CSS, CSS Modules

## 📦 Install & Run
\`\`\`bash
npm install
npm run dev
\`\`\`
`
    },
    "ai": {
        title: "🧠 Artificial Intelligence & ML",
        content: `
# 🧠 Artificial Intelligence & Machine Learning

![Python](https://img.shields.io/badge/Python-3.11-yellow) ![PyTorch](https://img.shields.io/badge/PyTorch-2.0-orange) ![LLM](https://img.shields.io/badge/GenAI-LLM-purple)

Exploring the frontiers of AI with projects in Generative AI, RAG (Retrieval-Augmented Generation), and Computer Vision.

## 🤖 Projects
1.  **RAG Knowledge Base**: Chat with your documents using Vector DBs.
2.  **Computer Vision**: Real-time object detection systems.
3.  **Predictive Models**: Data analysis pipelines for forecasting.

## 🧪 Libraries
- **Core**: JavaScript, Python, NumPy, Pandas
- **DL/ML**: PyTorch, TensorFlow, Scikit-learn
- **GenAI**: LangChain, OpenAI API, Hugging Face

`
    },
    "finance": {
        title: "📈 Finance & Algorithmic Trading",
        content: `
# 📈 Finance & Fintech Innovation

![Finance](https://img.shields.io/badge/Finance-Quant-green) ![Algo](https://img.shields.io/badge/Trading-Algo-blue) ![Data](https://img.shields.io/badge/Data-Realtime-red)

Quantitative finance projects, algorithmic trading bots, and financial data analysis tools.

## 📊 Modules
- **Algo-Trading**: Automated strategies based on technical indicators.
- **Portfolio Optimization**: Risk management and asset allocation models.
- **Market Analysis**: Real-time dashboard for stock and crypto tracking.

## 💹 Technologies
- **Data APIs**: Alpha Vantage, Yahoo Finance, CoinGecko
- **Analysis**: Python (Pandas), Jupyter Notebooks
- **Execution**: CCXT, MetaTrader 5 Bridge

> "Compound interest is the eighth wonder of the world."
`
    }
};

function updateReadme(repo, content) {
    return new Promise((resolve, reject) => {
        // 1. Get current SHA (if exists) so we can update
        const getOptions = {
            hostname: 'api.github.com',
            path: `/repos/${USERNAME}/${repo}/contents/README.md`,
            method: 'GET',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'Node-Script'
            }
        };

        const getReq = https.request(getOptions, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                let sha = null;
                if (res.statusCode === 200) {
                    try {
                        sha = JSON.parse(body).sha;
                    } catch (e) { }
                }

                // 2. Put new content
                const data = JSON.stringify({
                    message: "docs: update interactive README",
                    content: Buffer.from(content).toString('base64'),
                    sha: sha // Include SHA if updating, omit if creating new
                });

                const putOptions = {
                    hostname: 'api.github.com',
                    path: `/repos/${USERNAME}/${repo}/contents/README.md`,
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${GITHUB_TOKEN}`,
                        'User-Agent': 'Node-Script',
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                    }
                };

                const putReq = https.request(putOptions, (putRes) => {
                    if (putRes.statusCode === 200 || putRes.statusCode === 201) {
                        console.log(`✅ ${repo}: README updated.`);
                        resolve(true);
                    } else {
                        console.error(`❌ ${repo}: Failed to update README (${putRes.statusCode})`);
                        resolve(false);
                    }
                });

                putReq.on('error', (e) => console.error(e));
                putReq.write(data);
                putReq.end();
            });
        });

        getReq.on('error', (e) => {
            // If get fails, try to create anyway (might be 404 which is fine)
            console.log(`Checking ${repo}...`);
        });
        getReq.end();
    });
}

async function main() {
    console.log("Pushing READMEs...");
    for (const [repo, data] of Object.entries(REPOS)) {
        await updateReadme(repo, data.content);
        await new Promise(r => setTimeout(r, 500));
    }
}

main();
