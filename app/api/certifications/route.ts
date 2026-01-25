import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    const repo = process.env.GITHUB_REPO;
    const path = process.env.GITHUB_FILE_PATH || 'public/data/certifications.json';

    if (!token || !username || !repo) {
        // If env vars are missing, return 404/500 so frontend knows to fall back
        return NextResponse.json(
            { error: 'GitHub configuration missing' },
            { status: 500 }
        );
    }

    try {
        const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3.raw', // Request raw content directly
            },
            next: { revalidate: 60 } // Revalidate every minute
        });

        if (!response.ok) {
            console.error(`GitHub API error: ${response.status} ${response.statusText}`);
            return NextResponse.json(
                { error: 'Failed to fetch from GitHub' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Route Error Details:', {
            tokenPrefix: token ? token.substring(0, 4) + '...' : 'INVALID',
            username,
            repo,
            path,
            error
        });
        return NextResponse.json(
            { error: 'Internal Server Error', details: String(error) },
            { status: 500 }
        );
    }
}
