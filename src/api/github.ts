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
  searchParams?: { searchType: string; keyword: string }
): Promise<IssueListResponse> => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    
    // 검색어가 있는 경우
    if (searchParams?.keyword) {
      const searchQuery = `repo:${owner}/${repo} ${
        searchParams.searchType === '제목' ? 'in:title' : 
        searchParams.searchType === '내용' ? 'in:body' : 
        'in:title,body'
      } ${searchParams.keyword}`;

      const searchResponse = await octokit.rest.search.issuesAndPullRequests({
        q: searchQuery,
        per_page: 10,
        page,
      });

      const issues: Issue[] = searchResponse.data.items.map(item => ({
        number: item.number,
        title: item.title,
        body: item.body || '',
        created_at: item.created_at,
        updated_at: item.updated_at,
        comments: item.comments,
        user: {
          login: item.user?.login || '',
          avatar_url: item.user?.avatar_url || ''
        },
        labels: item.labels.map(label => ({
          name: (typeof label === 'string' ? label : label.name) || '',
          color: typeof label === 'string' ? '' : (label.color || '')
        })),
        state: item.state as 'open' | 'closed'
      }));

      return {
        issues,
        total_count: searchResponse.data.total_count,
        pagination: {
          currentPage: page,
          perPage: 10,
          hasNextPage: issues.length === 10,
          hasPrevPage: page > 1
        }
      };
    }

    // 검색어가 없는 경우 기존 로직 사용
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'all',
      per_page: 10,
      page
    });

    const issues: Issue[] = response.data.map(item => ({
      number: item.number,
      title: item.title,
      body: item.body || '',
      created_at: item.created_at,
      updated_at: item.updated_at,
      comments: item.comments,
      user: {
        login: item.user?.login || '',
        avatar_url: item.user?.avatar_url || ''
      },
      labels: item.labels.map(label => ({
        name: (typeof label === 'string' ? label : label.name) || '',
        color: typeof label === 'string' ? '' : (label.color || '')
      })),
      state: item.state as 'open' | 'closed'
    }));

    return {
      issues,
      total_count: response.data.length,
      pagination: {
        currentPage: page,
        perPage: 10,
        hasNextPage: response.data.length === 10,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
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
      issue_number: issueNumber
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
  body: string
) => {
  try {
    const [owner, repo] = REPOS[boardType].split('/');
    const response = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body
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
    state: 'all',
    per_page: 1
  });
  
  const linkHeader = countResponse.headers.link;
  if (!linkHeader) return 1;

  const links = linkHeader.split(', ');
  const lastLink = links.find(link => link.endsWith('rel="last"'));
  console.log('lastLink:', lastLink);
  if (!lastLink) return 1;

  const pageMatch = lastLink.match(/&page=(\d+)/);
  console.log('pageMatch:', pageMatch);
  return pageMatch ? parseInt(pageMatch[1]) : 1;
}; 