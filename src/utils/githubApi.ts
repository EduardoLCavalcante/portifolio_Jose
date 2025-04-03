
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
    
    const userRepos = await response.json();
    
    // Now get the specific AprovaUFC repositories
    const specificRepos = await Promise.all([
      fetch('https://api.github.com/repos/AprovaUFC/portalAluno').then(res => res.json()),
      fetch('https://api.github.com/repos/AprovaUFC/portalProfessor').then(res => res.json())
    ]);
    
    // Combine the specific repos with user repos and return the first 6
    const allRepos = [...specificRepos, ...userRepos];
    const uniqueRepos = Array.from(new Map(allRepos.map(repo => [repo.id, repo])).values());
    
    // Take only the first 6 repositories
    const finalRepos = uniqueRepos.slice(0, 6);
    
    console.log('Repositories fetched:', finalRepos);
    return finalRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}
