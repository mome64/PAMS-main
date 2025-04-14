import React, { useState } from "react";
import { CheckCircle, Clock, Hourglass } from "lucide-react";

const Progress = ({ showModal, setShowModal, student }) => {
  const [progressReports, setProgressReports] = useState([
    {
      title: "Week 1 - Orientation",
      description: "Completed orientation and safety briefing.",
      date: "2025-04-01",
      status: "done",
    },
    {
      title: "Week 2 - Assigned to Team",
      description: "Started with software testing team.",
      date: "2025-04-08",
      status: "done",
    },
    {
      title: "Week 3 - First Task",
      description: "Bug fixing and test case writing.",
      date: "2025-04-15",
      status: "current",
    },
  ]);

  const [selectedStep, setSelectedStep] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    date: "",
    status: "upcoming",
  });

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

  const handleAddProgress = (e) => {
    e.preventDefault();
    setProgressReports((prev) => [...prev, newReport]);
    closeAddForm();
  };

  return (
    <div className="absolute flex justify-center items-center top-60 inset-0 z-50 h-screen w-screen bg-opacity-60 text-black overflow-y-auto">
      <div className="min-h-screen w-full flex flex-col items-center justify-start py-10 px-4">
        <div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-2xl relative animate-fadeIn">
          <button
            onClick={closeModal}
            className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>

          <h1 className="text-3xl font-bold text-center mb-6">
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

          <div className="relative border-l-4 border-gray-300 pl-6 max-h-[60vh] overflow-y-auto pr-4 space-y-6">
            {progressReports.map((step, index) => (
              <div
                key={index}
                className="relative flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                onClick={() => setSelectedStep(step)}
              >
                <div className="absolute -left-[34px] top-2">
                  {getIcon(step.status)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{step.title}</h2>
                  <p className="text-gray-700">{step.description}</p>
                  <p className="text-sm text-blue-500 mt-1">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Detail Modal */}
        {selectedStep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative animate-fadeIn">
              <button
                onClick={() => setSelectedStep(null)}
                className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedStep.title}</h2>
              <p className="text-gray-700">{selectedStep.description}</p>
              <p className="text-sm text-blue-500 mt-3">{selectedStep.date}</p>
            </div>
          </div>
        )}

        {/* Add Progress Form */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
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
