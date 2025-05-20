import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Hourglass, X } from "lucide-react";
import progressService from "../../../services/progress.Service";

const Progress = ({ showModal, setShowModal, student }) => {
  const [progressReports, setProgressReports] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    date: "",
    status: "upcoming",
  });

  useEffect(() => {
    if (student) {
      progressService
        .getProgressByStudentId(student.student_id)
        .then((result) => setProgressReports([...result]))
        .catch(console.error);
    }
  }, [student]);

  const getIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "current":
        return <Hourglass className="w-6 h-6 text-blue-500 animate-pulse" />;
      case "upcoming":
        return <Clock className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  const closeModal = () => {
    setSelectedStep(null);
    setShowModal(false);
  };

  const openAddForm = () => setShowAddForm(true);
  const closeAddForm = () => {
    setShowAddForm(false);
    setNewReport({ title: "", description: "", date: "", status: "upcoming" });
  };

  const handleAddProgress = async (e) => {
    e.preventDefault();
    const payload = { ...newReport, student_id: student.student_id };
    try {
      const saved = await progressService.saveProgress(payload);
      setProgressReports((prev) => [...prev, saved]);
      closeAddForm();
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Enhanced Blur Background */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs backdrop-filter"
        onClick={closeModal}
      ></div>

      {/* Main Progress Container */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-xl shadow-2xl overflow-hidden relative z-10 backdrop-blur-sm border border-gray-700/50">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gray-900/80 border-b border-gray-700/50">
          <h1 className="text-2xl font-bold text-white">
            Progress for {student?.student_first_name}{" "}
            {student?.student_last_name}
          </h1>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Add Progress Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={openAddForm}
              className="flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-700/90 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
            >
              <span>+</span>
              <span>Add Progress</span>
            </button>
          </div>

          {/* Progress List */}
          <div className="relative pl-8 max-h-[60vh] overflow-y-auto pr-4 space-y-4">
            {progressReports.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No progress reports found
              </div>
            ) : (
              progressReports.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-4 p-4 rounded-lg transition-all cursor-pointer hover:bg-gray-700/50 backdrop-blur-xs ${
                    selectedStep?.id === step.id ? "bg-gray-700/70" : ""
                  }`}
                  onClick={() => setSelectedStep(step)}
                >
                  <div className="absolute -left-8 top-5">
                    {getIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold text-white capitalize">
                        {step.title}
                      </h2>
                      <span className="text-xs text-gray-400">
                        {new Date(step.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-1 text-sm">
                      {step.description}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          step.status === "done"
                            ? "bg-green-900/50 text-green-400"
                            : step.status === "current"
                            ? "bg-blue-900/50 text-blue-400"
                            : "bg-gray-700/50 text-gray-400"
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Progress Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Enhanced Blur Background for Form */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs backdrop-filter"
            onClick={closeAddForm}
          ></div>

          <form
            onSubmit={handleAddProgress}
            className="bg-gray-800/95 p-6 rounded-xl shadow-xl max-w-md w-full relative border border-gray-700/50 z-10 backdrop-blur-sm"
          >
            <button
              onClick={closeAddForm}
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-6">
              Add New Progress
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 backdrop-blur-xs"
                  placeholder="Enter title"
                  value={newReport.title}
                  onChange={(e) =>
                    setNewReport({ ...newReport, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 backdrop-blur-xs"
                  placeholder="Enter description"
                  rows={3}
                  value={newReport.description}
                  onChange={(e) =>
                    setNewReport({ ...newReport, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 backdrop-blur-xs"
                  value={newReport.date}
                  onChange={(e) =>
                    setNewReport({ ...newReport, date: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 bg-gray-700/80 border border-gray-600/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500/70 backdrop-blur-xs"
                  value={newReport.status}
                  onChange={(e) =>
                    setNewReport({ ...newReport, status: e.target.value })
                  }
                >
                  <option value="done">Done</option>
                  <option value="current">Current</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-blue-600/90 hover:bg-blue-700/90 text-white py-2 px-4 rounded-md transition-colors duration-200 backdrop-blur-sm"
              >
                Add Progress
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Progress;
