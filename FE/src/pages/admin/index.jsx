import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useExperience } from "../../hooks/useExperience";
import { useTool } from "../../hooks/useTool";
import { useProject } from "../../hooks/useProject";

const EMPTY_TOOL = { name: "", imageFile: null, category: "" };
const EMPTY_PROJECT = {
  title: "",
  description: "",
  tags: [""],
  imageFile: null,
  videoUrl: "",
};
const EMPTY_EXP = {
  company: "",
  position: "",
  year: "",
  period: "",
  description: "",
};

export default function Admin() {
  const { logout } = useAuth();
  const {
    experiences: exps,
    loading: expLoading,
    createExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences,
  } = useExperience();

  const {
    tools,
    loading: toolLoading,
    createTool,
    updateTool,
    deleteTool,
  } = useTool();

  const {
    projects,
    loading: projectLoading,
    createProject,
    updateProject,
    deleteProject,
    reorderProjects,
  } = useProject();

  // ── Tab ──────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("tools");

  // ── Tools ─────────────────────────────────────────────
  const [toolForm, setToolForm] = useState(EMPTY_TOOL);
  const [editToolId, setEditToolId] = useState(null);
  const [showToolForm, setShowToolForm] = useState(false);

  const saveTool = async () => {
    if (!toolForm.name.trim()) return;
    try {
      if (editToolId !== null) {
        await updateTool(editToolId, toolForm);
      } else {
        await createTool(toolForm);
      }
      setToolForm(EMPTY_TOOL);
      setEditToolId(null);
      setShowToolForm(false);
    } catch {
      // handle error
    }
  };

  const startEditTool = (tool) => {
    setToolForm({ name: tool.name, imageFile: null, category: tool.category });
    setEditToolId(tool.id);
    setShowToolForm(true);
  };

  // ── Experience ────────────────────────────────────────
  const [expForm, setExpForm] = useState(EMPTY_EXP);
  const [editExpId, setEditExpId] = useState(null);
  const [showExpForm, setShowExpForm] = useState(false);

  // Local ordered list for drag & drop
  const [orderedExps, setOrderedExps] = useState([]);
  useEffect(() => {
    setOrderedExps(exps);
  }, [exps]);

  // Drag & drop refs
  const dragIdx = useRef(null);
  const dragOverIdx = useRef(null);

  const handleDragStart = (i) => {
    dragIdx.current = i;
  };

  const handleDragOver = (e, i) => {
    e.preventDefault();
    dragOverIdx.current = i;
  };

  const handleDrop = async () => {
    const from = dragIdx.current;
    const to = dragOverIdx.current;
    if (from === null || to === null || from === to) return;

    const reordered = [...orderedExps];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);

    setOrderedExps(reordered);
    dragIdx.current = null;
    dragOverIdx.current = null;

    const items = reordered.map((exp, idx) => ({ id: exp.id, order: idx }));
    try {
      await reorderExperiences(items);
    } catch {
      // revert on error
      setOrderedExps(exps);
    }
  };

  const saveExp = async () => {
    if (!expForm.company.trim()) return;
    try {
      if (editExpId !== null) {
        await updateExperience(editExpId, expForm);
      } else {
        await createExperience(expForm);
      }
      setExpForm(EMPTY_EXP);
      setEditExpId(null);
      setShowExpForm(false);
    } catch {
      // handle error
    }
  };

  const deleteExp = async (id) => {
    try {
      await deleteExperience(id);
    } catch {
      // handle error
    }
  };

  // ── Projects ──────────────────────────────────────────
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [editProjectId, setEditProjectId] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Local ordered list for drag & drop (projects)
  const [orderedProjects, setOrderedProjects] = useState([]);
  useEffect(() => {
    setOrderedProjects(projects);
  }, [projects]);

  // Drag & drop refs (projects)
  const projectDragIdx = useRef(null);
  const projectDragOverIdx = useRef(null);

  const handleProjectDragStart = (i) => {
    projectDragIdx.current = i;
  };

  const handleProjectDragOver = (e, i) => {
    e.preventDefault();
    projectDragOverIdx.current = i;
  };

  const handleProjectDrop = async () => {
    const from = projectDragIdx.current;
    const to = projectDragOverIdx.current;
    if (from === null || to === null || from === to) return;

    const reordered = [...orderedProjects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);

    setOrderedProjects(reordered);
    projectDragIdx.current = null;
    projectDragOverIdx.current = null;

    const items = reordered.map((project, idx) => ({
      id: project.id,
      order: idx,
    }));

    try {
      await reorderProjects(items);
    } catch {
      // revert on error
      setOrderedProjects(projects);
    }
  };

  const addTag = () =>
    setProjectForm({ ...projectForm, tags: [...projectForm.tags, ""] });

  const updateTagField = (i, val) => {
    const tags = [...projectForm.tags];
    tags[i] = val;
    setProjectForm({ ...projectForm, tags });
  };

  const removeTag = (i) =>
    setProjectForm({
      ...projectForm,
      tags: projectForm.tags.filter((_, idx) => idx !== i),
    });

  const saveProject = async () => {
    if (!projectForm.title.trim()) return;
    try {
      if (editProjectId !== null) {
        await updateProject(editProjectId, projectForm);
      } else {
        await createProject(projectForm);
      }
      setProjectForm(EMPTY_PROJECT);
      setEditProjectId(null);
      setShowProjectForm(false);
    } catch {
      // handle error
    }
  };

  const startEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      tags: Array.isArray(project.tags) ? project.tags : [""],
      imageFile: null,
      videoUrl: project.link || "",
    });
    setEditProjectId(project.id);
    setShowProjectForm(true);
  };

  const startEditExp = (exp) => {
    setExpForm({
      company: exp.company,
      position: exp.position,
      year: exp.year,
      period: exp.period,
      description: exp.description,
    });
    setEditExpId(exp.id);
    setShowExpForm(true);
  };

  // ── Styles ────────────────────────────────────────────
  const inputCls =
    "w-full px-4 py-2 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-[#7A1CAC]";
  const btnPrimary =
    "px-4 py-2 bg-[#7A1CAC] hover:bg-[#9B2FD8] text-white rounded-lg transition-colors";
  const btnOutline =
    "px-4 py-2 border border-[#7A1CAC] text-[#7A1CAC] hover:bg-[#7A1CAC] hover:text-white rounded-lg transition-colors";
  const btnDanger =
    "px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm transition-colors";
  const btnEdit =
    "px-3 py-1 border border-gray-600 hover:border-[#7A1CAC] text-gray-300 hover:text-[#7A1CAC] rounded-lg text-sm transition-colors";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-[#111111] border-b border-[#2a2a2a] px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#7A1CAC]">Admin Dashboard</h1>
        <button onClick={logout} className={btnOutline}>
          Logout
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#2a2a2a]">
          {["experience", "tools", "projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 capitalize font-medium transition-colors ${
                activeTab === tab
                  ? "text-[#7A1CAC] border-b-2 border-[#7A1CAC]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── EXPERIENCE TAB ── */}
        {activeTab === "experience" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Experience</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Drag item untuk mengatur urutan tampilan
                </p>
              </div>
              <button
                onClick={() => {
                  setExpForm(EMPTY_EXP);
                  setEditExpId(null);
                  setShowExpForm(true);
                }}
                className={btnPrimary}
              >
                + Tambah Experience
              </button>
            </div>

            {/* Form */}
            {showExpForm && (
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mb-6 space-y-4">
                <h3 className="font-medium text-[#7A1CAC]">
                  {editExpId !== null ? "Edit Experience" : "Tambah Experience"}
                </h3>
                <input
                  className={inputCls}
                  placeholder="Nama perusahaan (contoh: at Airnav Indonesia)"
                  value={expForm.company}
                  onChange={(e) =>
                    setExpForm({ ...expForm, company: e.target.value })
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Posisi (contoh: IT Development)"
                  value={expForm.position}
                  onChange={(e) =>
                    setExpForm({ ...expForm, position: e.target.value })
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Tahun (contoh: 2025)"
                  value={expForm.year}
                  onChange={(e) =>
                    setExpForm({ ...expForm, year: e.target.value })
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Periode (contoh: Oct - Apr)"
                  value={expForm.period}
                  onChange={(e) =>
                    setExpForm({ ...expForm, period: e.target.value })
                  }
                />
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="Deskripsi singkat pekerjaan"
                  value={expForm.description}
                  onChange={(e) =>
                    setExpForm({ ...expForm, description: e.target.value })
                  }
                />
                <div className="flex gap-3">
                  <button onClick={saveExp} className={btnPrimary}>
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setShowExpForm(false);
                      setEditExpId(null);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* List with drag & drop */}
            {expLoading ? (
              <p className="text-gray-500 text-center py-12">Memuat data...</p>
            ) : orderedExps.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Belum ada experience. Tambahkan experience pertama kamu.
              </p>
            ) : (
              <div className="space-y-3">
                {orderedExps.map((exp, i) => (
                  <div
                    key={exp.id}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDrop={handleDrop}
                    className="bg-[#111111] border border-[#2a2a2a] rounded-xl px-5 py-4 cursor-grab active:cursor-grabbing select-none hover:border-[#7A1CAC]/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        {/* Drag handle */}
                        <div className="mt-1 text-gray-600 hover:text-gray-400 transition-colors shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 8h16M4 16h16"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {exp.company}
                          </p>
                          <p className="text-[#7A1CAC] text-sm">
                            {exp.position}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {exp.year} · {exp.period}
                          </p>
                          {exp.description && (
                            <p className="text-gray-400 text-sm mt-2">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => startEditExp(exp)}
                          className={btnEdit}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExp(exp.id)}
                          className={btnDanger}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── TOOLS TAB ── */}
        {activeTab === "tools" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Tools</h2>
              <button
                onClick={() => {
                  setToolForm(EMPTY_TOOL);
                  setEditToolId(null);
                  setShowToolForm(true);
                }}
                className={btnPrimary}
              >
                + Tambah Tool
              </button>
            </div>

            {/* Form */}
            {showToolForm && (
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mb-6 space-y-4">
                <h3 className="font-medium text-[#7A1CAC]">
                  {editToolId !== null ? "Edit Tool" : "Tambah Tool"}
                </h3>
                <input
                  className={inputCls}
                  placeholder="Nama tool (contoh: React, Figma)"
                  value={toolForm.name}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, name: e.target.value })
                  }
                />
                <select
                  className={inputCls}
                  value={toolForm.category}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, category: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Pilih kategori
                  </option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Styling">Styling</option>
                  <option value="Database">Database</option>
                  <option value="Others">Others</option>
                </select>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Gambar / Icon
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#7A1CAC] file:text-white hover:file:bg-[#9B2FD8] cursor-pointer"
                    onChange={(e) =>
                      setToolForm({
                        ...toolForm,
                        imageFile: e.target.files[0] || null,
                      })
                    }
                  />
                  {editToolId !== null && (
                    <p className="text-xs text-gray-500 mt-1">
                      Biarkan kosong jika tidak ingin mengganti gambar
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={saveTool} className={btnPrimary}>
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setShowToolForm(false);
                      setEditToolId(null);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* List */}
            {toolLoading ? (
              <p className="text-gray-500 text-center py-12">Memuat data...</p>
            ) : tools.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Belum ada tool. Tambahkan tool pertama kamu.
              </p>
            ) : (
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-[#111111] border border-[#2a2a2a] rounded-xl px-5 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {tool.image && (
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="w-8 h-8 object-contain rounded"
                        />
                      )}
                      <div>
                        <span className="font-medium">{tool.name}</span>
                        {tool.category && (
                          <span className="ml-2 text-xs text-[#7A1CAC] border border-[#7A1CAC] rounded-full px-2 py-0.5">
                            {tool.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditTool(tool)}
                        className={btnEdit}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTool(tool.id)}
                        className={btnDanger}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ── PROJECTS TAB ── */}
        {activeTab === "projects" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Projects</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Drag item untuk mengatur urutan tampilan
                </p>
              </div>
              <button
                onClick={() => {
                  setProjectForm(EMPTY_PROJECT);
                  setEditProjectId(null);
                  setShowProjectForm(true);
                }}
                className={btnPrimary}
              >
                + Tambah Project
              </button>
            </div>

            {/* Form */}
            {showProjectForm && (
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-6 mb-6 space-y-4">
                <h3 className="font-medium text-[#7A1CAC]">
                  {editProjectId !== null ? "Edit Project" : "Tambah Project"}
                </h3>

                <input
                  className={inputCls}
                  placeholder="Judul project"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                />

                <textarea
                  className={`${inputCls} resize-none`}
                  placeholder="Deskripsi project"
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                />

                {/* Dynamic Tags */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Tags / Tech Stack
                  </label>
                  {projectForm.tags.map((tag, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputCls}
                        placeholder={`Tag ${i + 1} (contoh: React)`}
                        value={tag}
                        onChange={(e) => updateTagField(i, e.target.value)}
                      />
                      {projectForm.tags.length > 1 && (
                        <button
                          onClick={() => removeTag(i)}
                          className="px-3 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg text-sm"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addTag}
                    className="text-sm text-[#7A1CAC] hover:underline"
                  >
                    + Tambah Tag
                  </button>
                </div>

                {/* Image Upload */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">
                    Thumbnail (gambar)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#7A1CAC] file:text-white cursor-pointer"
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        imageFile: e.target.files[0] || null,
                      })
                    }
                  />
                  {editProjectId !== null && (
                    <p className="text-xs text-gray-500">
                      Biarkan kosong jika tidak ingin mengganti gambar
                    </p>
                  )}
                </div>

                {/* Video Link */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">
                    Link Demo Video (YouTube, Drive, dll.)
                  </label>
                  <input
                    className={inputCls}
                    placeholder="https://youtube.com/watch?v=..."
                    value={projectForm.videoUrl}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        videoUrl: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Link akan dibuka di tab baru saat pengunjung klik "View
                    Demo"
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={saveProject} className={btnPrimary}>
                    {editProjectId !== null ? "Simpan Perubahan" : "Tambah"}
                  </button>
                  <button
                    onClick={() => {
                      setShowProjectForm(false);
                      setProjectForm(EMPTY_PROJECT);
                      setEditProjectId(null);
                    }}
                    className={btnOutline}
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* List */}
            {projectLoading ? (
              <p className="text-gray-500 text-center py-12">Memuat data...</p>
            ) : orderedProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Belum ada project. Tambahkan project pertama kamu.
              </p>
            ) : (
              <div className="space-y-3">
                {orderedProjects.map((project, i) => (
                  <div
                    key={project.id}
                    draggable
                    onDragStart={() => handleProjectDragStart(i)}
                    onDragOver={(e) => handleProjectDragOver(e, i)}
                    onDrop={handleProjectDrop}
                    className="bg-[#111111] border border-[#2a2a2a] rounded-xl px-5 py-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="mt-1 text-gray-600 hover:text-gray-400 transition-colors shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium truncate">{project.title}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(project.tags || []).map((t, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 border border-[#7A1CAC] text-[#C77DFF] rounded-full"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <p className="text-xs text-green-400 mt-1 truncate">
                            ✓ Demo:{" "}
                            <span className="text-green-300">
                              {project.link}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => startEditProject(project)}
                        className={btnEdit}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className={btnDanger}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
