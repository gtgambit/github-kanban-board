export interface TaskProps {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  labels: {
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string | null;
  }[];
  state: string;
  locked: boolean;
  assignee: null | any;
  assignees: any[];
  milestone: null | any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null | any;
  author_association: string;
  active_lock_reason: null | any;
  draft: boolean;
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: null | any;
  };
  body: string;
}

export interface GitApiResponse {
  taskPropsArray: TaskProps[];
}

export interface ThunkError {
  rejectValue: { message: string };
}
