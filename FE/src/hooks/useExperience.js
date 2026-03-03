import { useState, useEffect, useCallback } from "react";
import { useApi } from "./useApi";

export function useExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get, post, put, del } = useApi();

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const data = await get("/experience");
      setExperiences(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  async function createExperience(dto) {
    const data = await post("/experience", dto);
    await fetchExperiences();
    return data;
  }

  async function updateExperience(id, dto) {
    const data = await put(`/experience/${id}`, dto);
    await fetchExperiences();
    return data;
  }

  async function deleteExperience(id) {
    await del(`/experience/${id}`);
    await fetchExperiences();
  }

  return {
    experiences,
    loading,
    error,
    fetchExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
  };
}
