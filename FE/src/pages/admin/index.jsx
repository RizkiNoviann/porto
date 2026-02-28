import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY_TOOL = { name: "", icon: "" };
const EMPTY_EXP = { company: "", role: "", period: "", description: "" };

export default function Admin() {
  const navigate = useNavigate();

  // ── Tab ──────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("tools");

  // ── Tools ─────────────────────────────────────────────
  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem("admin_tools");
    return saved ? JSON.parse(saved) : [];
  });
  const [toolForm, setToolForm] = useState(EMPTY_TOOL);
  const [editToolId, setEditToolId] = useState(null);
  const [showToolForm, setShowToolForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("admin_tools", JSON.stringify(tools));
  }, [tools]);

  const saveTool = () => {
    if (!toolForm.name.trim()) return;
    if (editToolId !== null) {
      setTools(
        tools.map((t) =>
          t.id === editToolId ? { ...toolForm, id: editToolId } : t,
        ),
      );
      setEditToolId(null);
    } else {
      setTools([...tools, { ...toolForm, id: Date.now() }]);
    }
    setToolForm(EMPTY_TOOL);
    setShowToolForm(false);
  };

  const deleteTool = (id) => setTools(tools.filter((t) => t.id !== id));

  const startEditTool = (tool) => {
    setToolForm({ name: tool.name, icon: tool.icon });
    setEditToolId(tool.id);
    setShowToolForm(true);
  };

  // ── Experience ────────────────────────────────────────
  const [exps, setExps] = useState(() => {
    const saved = localStorage.getItem("admin_exps");
    return saved ? JSON.parse(saved) : [];
  });
  const [expForm, setExpForm] = useState(EMPTY_EXP);
  const [editExpId, setEditExpId] = useState(null);
  const [showExpForm, setShowExpForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("admin_exps", JSON.stringify(exps));
  }, [exps]);

  const saveExp = () => {
    if (!expForm.company.trim()) return;
    if (editExpId !== null) {
      setExps(
        exps.map((e) =>
          e.id === editExpId ? { ...expForm, id: editExpId } : e,
        ),
      );
      setEditExpId(null);
    } else {
      setExps([...exps, { ...expForm, id: Date.now() }]);
    }
    setExpForm(EMPTY_EXP);
    setShowExpForm(false);
  };

  const deleteExp = (id) => setExps(exps.filter((e) => e.id !== id));

  const startEditExp = (exp) => {
    setExpForm({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      description: exp.description,
    });
    setEditExpId(exp.id);
    setShowExpForm(true);
  };

  // ── Logout ────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          {["tools", "experience"].map((tab) => (
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
                <input
                  className={inputCls}
                  placeholder="URL icon (opsional)"
                  value={toolForm.icon}
                  onChange={(e) =>
                    setToolForm({ ...toolForm, icon: e.target.value })
                  }
                />
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
            {tools.length === 0 ? (
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
                      {tool.icon && (
                        <img
                          src={tool.icon}
                          alt={tool.name}
                          className="w-8 h-8 object-contain rounded"
                        />
                      )}
                      <span className="font-medium">{tool.name}</span>
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

        {/* ── EXPERIENCE TAB ── */}
        {activeTab === "experience" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Experience</h2>
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
                  placeholder="Nama perusahaan"
                  value={expForm.company}
                  onChange={(e) =>
                    setExpForm({ ...expForm, company: e.target.value })
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Role / Posisi"
                  value={expForm.role}
                  onChange={(e) =>
                    setExpForm({ ...expForm, role: e.target.value })
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Periode (contoh: Jan 2023 - Des 2024)"
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

            {/* List */}
            {exps.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Belum ada experience. Tambahkan experience pertama kamu.
              </p>
            ) : (
              <div className="space-y-4">
                {exps.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-[#111111] border border-[#2a2a2a] rounded-xl px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {exp.company}
                        </p>
                        <p className="text-[#7A1CAC] text-sm">{exp.role}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {exp.period}
                        </p>
                        {exp.description && (
                          <p className="text-gray-400 text-sm mt-2">
                            {exp.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => startEditExp(exp)}
                          className={btnEdit}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExp(exp.id)}
                          className={btnDanger}
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
      </div>
    </div>
  );
}
