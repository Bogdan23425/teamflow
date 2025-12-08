export type BoardType = "team" | "personal" | "sprint" | "backlog";

export interface Board {
  id: string;
  name: string;
  description: string;
  status: string;
  tasks: number;
  type: BoardType;
  updatedAt: string;
  progress?: number;
  backgroundUrl?: string;
}

export interface BoardColumn {
  id: string;
  boardId: string;
  title: string;
  order: number;
  createdAt: string;
  tasks: BoardTask[];
}

export interface BoardTask {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  coverColor?: string;
  createdAt: string;
}

export type BoardFilterId = "all" | "team" | "personal" | "sprint" | "backlog";

export type BoardsViewMode = "grid" | "list";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface BoardTask {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  status: TaskStatus;
  updatedAt: string;
}

export interface BoardDetail {
  id: string;
  name: string;
  description: string;
  columns: {
    id: TaskStatus;
    title: string;
  }[];
  tasks: BoardTask[];
}
