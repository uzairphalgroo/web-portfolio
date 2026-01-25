import { portfolioData } from "../data/portfolio";

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    topics: string[];
    homepage: string;
    updated_at: string;
    fork: boolean;
}

export async function fetchGitHubProjects(): Promise<GitHubRepo[]> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${portfolioData.githubUsername}/repos?sort=updated&direction=desc&per_page=100`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            console.error("GitHub API error:", response.statusText);
            return [];
        }

        const repos: GitHubRepo[] = await response.json();

        // Filter out forks or specific repos if needed, roughly keeping "portfolio" worthy ones
        // for now, return all non-forks or just top ones
        return repos.filter(repo => !repo.fork && repo.description);
    } catch (error) {
        console.error("Failed to fetch GitHub projects:", error);
        return [];
    }
}
