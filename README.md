Github Kanban Board
Implement GitHub repo issues viewer as a kanban board

Requirements
User should enter repo URL in the input on top of the page and press "Load". For example: https://github.com/facebook/react.
App loads issues for the repo using Github API.
App contains 3 columns:
ToDo (all new issues)
In Progress (opened issues with assignee)
Done (closed issues)
User should be able to drag-n-drop between the columns and change the order of issues.
Current issue position (column and order) should be stored between search and browser sessions. When the user loads issues for Repo1 -> Repo2 -> Repo1 he should see all changes he did for Repo1.
User should be able to visit the profile of the owner of the repo and visit the repo as well by links under the input.
Technologies
You should use exactly the listed technologies or one of them if it is allowed:

React 18 with hooks
Typescript
UI library:
Ant Design
State manager (on your choice):
Redux (or Redux-Toolkit)
Testing (on your choice):
React Testing Library
any other library you need
Assessment
What will we assess:
