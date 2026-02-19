
interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
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
    
    if (!response.ok) {
      console.error('GitHub API error:', await response.text());
      throw new Error('Failed to fetch GitHub profile');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

export async function fetchRepositories(): Promise<Repository[]> {
  try {
    // Adding logging to debug the API call
    console.log('Fetching repositories for EduardoLCavalcante...');
    
    // First, fetch user repositories
    const response = await fetch('https://api.github.com/users/EduardoLCavalcante/repos?sort=updated&per_page=6');
    
    if (!response.ok) {
      console.error('GitHub API error:', await response.text());
      throw new Error('Failed to fetch repositories');
    }
    
    const data = await response.json();
    console.log('Repositories fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}
