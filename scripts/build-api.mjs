import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJECTS_DIR = path.join(ROOT, "content", "projects");
const OUTPUT_DIR = path.join(ROOT, "public", "api");

function buildApi() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.log("No projects directory found, creating empty API.");
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, "projects.json"),
      JSON.stringify({ projects: [], generatedAt: new Date().toISOString() }, null, 2)
    );
    return;
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    return JSON.parse(raw);
  });

  // Sort: featured first, then by updatedAt descending
  projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const output = {
    projects,
    total: projects.length,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "projects.json"),
    JSON.stringify(output, null, 2)
  );

  console.log(
    `Generated /public/api/projects.json with ${projects.length} projects.`
  );
}

buildApi();
