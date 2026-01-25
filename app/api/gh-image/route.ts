import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;
    const repo = process.env.GITHUB_REPO;

    if (!path) {
        return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    if (!token || !username || !repo) {
        return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
    }

    try {
        // GitHub API to get file content
        // Note: For raw binary data, we use the raw media type header
        const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3.raw',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`GitHub Image API error: ${response.status} for path ${path}`);
            return NextResponse.json(
                { error: 'Failed to fetch image' },
                { status: response.status }
            );
        }

        // Get the blob/buffer
        const imageBuffer = await response.arrayBuffer();

        // Determine content type roughly based on extension, strictly defaults to jpeg for now or octet-stream
        const extension = path.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';
        if (extension === 'png') contentType = 'image/png';
        if (extension === 'jpg' || extension === 'jpeg') contentType = 'image/jpeg';
        if (extension === 'svg') contentType = 'image/svg+xml';
        if (extension === 'webp') contentType = 'image/webp';

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600, immutable'
            }
        });

    } catch (error) {
        console.error('Image Proxy Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
