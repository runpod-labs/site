import { Project } from "@/types/project";
import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".json"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    return JSON.parse(raw) as Project;
  });

  // Featured first, then by updatedAt descending
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export function getProjectById(id: string): Project | undefined {
  const filePath = path.join(PROJECTS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Project;
}

export function getAllProjectIds(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}
