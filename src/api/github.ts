import { octokit, REPOS, Issue, BoardType } from '@/api/config';

interface IssueListResponse {
  issues: Issue[];
  total_count: number;
  pagination: {
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const getIssueList = async (
  boardType: BoardType,
  page: number = 1,
  searchParams?: { searchType: string; keyword: string },
  signal?: AbortSignal,
): Promise<IssueListResponse> => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    const perPage = 10;

    const searchQuery = searchParams?.keyword
      ? `repo:${owner}/${repo} state:open ${
          searchParams.searchType === '제목'
            ? 'in:title'
            : searchParams.searchType === '내용'
              ? 'in:body'
              : 'in:title,body'
        } ${searchParams.keyword}`
      : `repo:${owner}/${repo} state:open`;

    const searchResponse = await octokit.request('GET /search/issues', {
      q: searchQuery,
      per_page: perPage,
      page,
      request: {
        signal,
      },
    });

    const issues: Issue[] = searchResponse.data.items.map((item) => ({
      number: item.number,
      title: item.title,
      body: item.body || '',
      created_at: item.created_at,
      updated_at: item.updated_at,
      comments: item.comments,
      user: {
        login: item.user?.login || '',
        avatar_url: item.user?.avatar_url || '',
      },
      labels: item.labels.map((label) => ({
        name: typeof label === 'string' ? label : label.name || '',
        color: typeof label === 'string' ? '' : label.color || '',
      })),
      state: item.state as 'open' | 'closed',
    }));

    const totalCount = searchResponse.data.total_count;
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      issues,
      total_count: totalCount,
      pagination: {
        currentPage: page,
        perPage,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Search aborted');
    }
    console.error('Error fetching issues:', error);
    throw error;
  }
};

export const getIssue = async (boardType: BoardType, issueNumber: number) => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    const response = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching issue:', error);
    throw error;
  }
};

export const createIssue = async (
  boardType: BoardType,
  title: string,
  body: string,
) => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  }
};

export const getTotalIssueCount = async (boardType: BoardType) => {
  const [owner, repo] = REPOS[boardType].split('/');
  const countResponse = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    per_page: 1,
  });

  const linkHeader = countResponse.headers.link;
  if (!linkHeader) return 1;

  const links = linkHeader.split(', ');
  const lastLink = links.find((link) => link.endsWith('rel="last"'));
  if (!lastLink) return 1;

  const pageMatch = lastLink.match(/&page=(\d+)/);
  return pageMatch ? parseInt(pageMatch[1]) : 1;
};

export const deleteIssue = async (
  boardType: BoardType,
  issueNumber: number,
) => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    const response = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: issueNumber,
      state: 'closed',
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting issue:', error);
    throw error;
  }
};

export const updateIssue = async (
  boardType: BoardType,
  issueNumber: number,
  title: string,
  body: string,
) => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    const response = await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: issueNumber,
      title,
      body,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating issue:', error);
    throw error;
  }
};
