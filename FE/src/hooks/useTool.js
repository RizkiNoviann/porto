import { useState, useEffect, useCallback } from "react";
import { useApi } from "./useApi";

export function useTool() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get, postForm, putForm, del } = useApi();

  const fetchTools = useCallback(async () => {
    setLoading(true);
    try {
      const data = await get("/tools");
      setTools(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  async function createTool({ name, category, imageFile }) {
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category", category);
    if (imageFile) fd.append("image", imageFile);
    const data = await postForm("/tools", fd);
    await fetchTools();
    return data;
  }

  async function updateTool(id, { name, category, imageFile }) {
    const fd = new FormData();
    if (name) fd.append("name", name);
    if (category) fd.append("category", category);
    if (imageFile) fd.append("image", imageFile);
    const data = await putForm(`/tools/${id}`, fd);
    await fetchTools();
    return data;
  }

  async function deleteTool(id) {
    await del(`/tools/${id}`);
    await fetchTools();
  }

  return { tools, loading, error, fetchTools, createTool, updateTool, deleteTool };
}
