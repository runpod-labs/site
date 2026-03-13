export interface ProjectAuthor {
  name: string;
  github: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: "new" | "experimental" | "archived";
  repoUrl: string;
  liveUrl?: string;
  docsUrl?: string;
  thumbnail?: string;
  images?: string[];
  authors: ProjectAuthor[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}
