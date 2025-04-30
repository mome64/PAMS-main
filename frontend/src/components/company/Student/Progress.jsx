import React, { useState, useEffect } from "react";
import { CheckCircle, Clock, Hourglass } from "lucide-react";
import progressService from "../../../services/progress.Service"; // Adjust the path if needed

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
        .getProgressByStudentId(student)
        .then((result) => setProgressReports([...result]))
        .catch(console.error);
    }
  }, [student]);

  const getIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle className="text-green-500" />;
      case "current":
        return <Hourglass className="text-blue-500 animate-pulse" />;
      case "upcoming":
        return <Clock className="text-gray-400" />;
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
    console.log(payload);
    try {
      const saved = await progressService.saveProgress(payload);
      //   const saved = payload;
      setProgressReports((prev) => [...prev, saved]);

      closeAddForm();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  return (
    <div className="absolute flex justify-center items-center inset-0 z-50 bg-black  opacity-90 text-black overflow-y-auto">
      <div className="w-full flex flex-col items-center justify-start py-10 px-4">
        <div
          style={{ padding: 10 }}
          className="w-full max-w-5xl bg-stone-700 p-8 rounded-xl shadow-2xl relative animate-fadeIn"
        >
          <button
            onClick={closeModal}
            className="absolute top-3 right-4 text-gray-300 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>

          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Progress for {student?.student_first_name}{" "}
            {student?.student_last_name}
          </h1>

          <div className="flex justify-end mb-6">
            <button
              onClick={openAddForm}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              + Add Progress
            </button>
          </div>

          <div className="relative pl-6 max-h-[60vh] overflow-y-auto pr-4 space-y-6">
            {progressReports.map((step, index) => (
              <div
                key={index}
                className="relative flex capitalize border my-2 font-mono items-start gap-3  hover:bg-gray-400 p-2 rounded-lg transition"
                onClick={() => setSelectedStep(step)}
              >
                <div className="absolute -left-[34px] top-2">
                  {getIcon(step.status)}
                </div>
                <div>
                  <h2 className="text-xl  font-serif font-semibold text-white">
                    {step.title}
                  </h2>
                  <p className="text-gray-200">{step.description}</p>
                  <p className="text-sm text-blue-300 mt-1">
                    {" "}
                    {new Date(step.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Modal */}

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form
              onSubmit={handleAddProgress}
              className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative animate-fadeIn"
            >
              <button
                onClick={closeAddForm}
                type="button"
                className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Add New Progress</h2>

              <input
                className="w-full mb-2 p-2 border rounded"
                placeholder="Title"
                value={newReport.title}
                onChange={(e) =>
                  setNewReport({ ...newReport, title: e.target.value })
                }
              />
              <textarea
                className="w-full mb-2 p-2 border rounded"
                placeholder="Description"
                value={newReport.description}
                onChange={(e) =>
                  setNewReport({ ...newReport, description: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full mb-2 p-2 border rounded"
                value={newReport.date}
                onChange={(e) =>
                  setNewReport({ ...newReport, date: e.target.value })
                }
              />
              <select
                className="w-full mb-4 p-2 border rounded"
                value={newReport.status}
                onChange={(e) =>
                  setNewReport({ ...newReport, status: e.target.value })
                }
              >
                <option value="done">Done</option>
                <option value="current">Current</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
