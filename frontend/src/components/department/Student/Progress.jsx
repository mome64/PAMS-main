import { useEffect, useState } from "react";
import { CheckCircle, Clock, Hourglass } from "lucide-react";
import progressService from "../../../services/progress.Service"; // update the path if different

const Progress = ({ showModal, setShowModal, student }) => {
  const [progressReports, setProgressReports] = useState([]);

  useEffect(() => {
    if (student?.student_id) {
      progressService
        .getProgressByStudentId(student.student_id)
        .then((result) => setProgressReports(result))
        .catch((error) => console.error("Progress fetch error:", error));
    }
  }, [student]);
  console.log(student?.student_first_name);
  console.log(showModal);

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
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="absolute inset-0 z-50 flex justify-center items-center   backdrop-blur-sm overflow-y-auto">
        <div
          style={{ padding: 12 }}
          className="w-full max-w-4xl bg-stone-800 text-white rounded-2xl shadow-2xl p-8 relative mt-10 animate-fadeIn"
        >
          <button
            onClick={closeModal}
            style={{ fontSize: 20 }}
            className="absolute top-4 right-5 text-4xl text-gray-300 hover:text-red-400 transition-colors duration-200"
          >
            &times;
          </button>

          <h2 className="text-3xl font-bold text-center mb-6">
            Progress for {student?.first_name} {student?.last_name}
          </h2>

          <div
            style={{ padding: 6 }}
            className="relative  pl-6 max-h-[60vh] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-stone-600 scrollbar-track-stone-700"
          >
            {progressReports.length > 0 ? (
              progressReports.map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-start border gap-4 cursor-pointer hover:bg-stone-700 p-4 rounded-lg transition-colors duration-200"
                >
                  <div className="absolute -left-[34px] top-3">
                    {getIcon(step.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-stone-300">{step.description}</p>
                    <p className="text-sm text-blue-400 mt-1">{step.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-stone-400">No progress data available.</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Progress;
