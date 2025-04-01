
interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface GithubProfile {
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export async function fetchGithubProfile(): Promise<GithubProfile | null> {
  try {
    const response = await fetch('https://api.github.com/users/EduardoLCavalcante');
    if (!response.ok) throw new Error('Failed to fetch GitHub profile');
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

export async function fetchRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch('https://api.github.com/users/EduardoLCavalcante/repos?sort=updated&per_page=5');
    if (!response.ok) throw new Error('Failed to fetch repositories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}
