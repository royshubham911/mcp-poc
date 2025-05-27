import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  auth: process.env.GITHUB_TOKEN,
  baseUrl: process.env.GITHUB_API_URL || 'https://api.github.com',
  userAgent: 'mcp-client',
  timeZone: 'UTC',
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  }
};

const octokit = new Octokit(config);

export const ghClient = {
  octokit,
  config,
  
  async testConnection() {
    try {
      const { data } = await octokit.rest.users.getAuthenticated();
      console.log('Successfully connected to GitHub as:', data.login);
      return true;
    } catch (error) {
      console.error('Failed to connect to GitHub:', error.message);
      return false;
    }
  }
};

// Example usage:
// await ghClient.testConnection();
