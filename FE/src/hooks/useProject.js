import { useState, useEffect, useCallback } from "react";
import { useApi } from "./useApi";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function normalizeImageUrl(image) {
  if (!image) return image;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${API_BASE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export function useProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get, postForm, putForm, del } = useApi();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await get("/projects");
      setProjects(
        data.map((p) => ({
          ...p,
          image: normalizeImageUrl(p.image),
          tags: (() => {
            try {
              return JSON.parse(p.tags);
            } catch {
              return [];
            }
          })(),
        })),
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  async function createProject({ title, description, tags, imageFile, videoUrl }) {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("tags", JSON.stringify(tags));
    if (imageFile) fd.append("image", imageFile);
    if (videoUrl) fd.append("link", videoUrl);
    const data = await postForm("/projects", fd);
    await fetchProjects();
    return data;
  }

  async function updateProject(id, { title, description, tags, imageFile, videoUrl }) {
    const fd = new FormData();
    if (title) fd.append("title", title);
    if (description) fd.append("description", description);
    if (tags) fd.append("tags", JSON.stringify(tags));
    if (imageFile) fd.append("image", imageFile);
    fd.append("link", videoUrl ?? "");
    const data = await putForm(`/projects/${id}`, fd);
    await fetchProjects();
    return data;
  }

  async function deleteProject(id) {
    await del(`/projects/${id}`);
    await fetchProjects();
  }

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject };
}
