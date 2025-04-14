import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import resultService from "../../../services/result.service";
import { useAuth } from "../../../context/AuthContext";
import "./EvaluationResults.css"; // Make sure to import the CSS file

const EvaluationResults = () => {
  const [placementResults, setPlacementResults] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchPlacementResults = async () => {
      try {
        if (userId) {
          const data = await resultService.getResultsByStudentId(userId);
          setPlacementResults(data);
        }
      } catch (error) {
        console.error("Error fetching placement results:", error);
      }
    };

    fetchPlacementResults();
  }, [userId]);

  // Function to calculate total score for a result
  const calculateTotalScore = (result) => {
    const numericFields = [
      "attendance",
      "commitment",
      "conduct",
      "courtesy",
      "creativity",
      "efficiency",
      "perseverance",
      "professional_ethics",
      "teamwork",
      "technical_knowledge",
    ];

    return numericFields.reduce((total, field) => {
      const value = parseFloat(result[field]);
      return total + (isNaN(value) ? 0 : value); // Handle non-numeric values gracefully
    }, 0);
  };

  return (
    <div>
      <Header />
      <div className="evaluation-container">
        <h2 className="evaluation-title">Evaluation Results</h2>
        {placementResults.length > 0 ? (
          placementResults.map((result, index) => {
            const totalScore = calculateTotalScore(result); // Calculate total score
            return (
              <div key={index} className="result-card">
                <h3 className="student-name">
                  {result.student_first_name} {result.student_last_name}
                </h3>
                <div className="info-group">
                  <p>
                    <strong>Company:</strong> {result.company_name}
                  </p>
                  <p>
                    <strong>Advisor:</strong> {result.advisor_name}
                  </p>
                  <p>
                    <strong>Area of Work:</strong> {result.area_of_work}
                  </p>
                  <p>
                    <strong>Department:</strong> {result.department_name}
                  </p>
                  <p>
                    <strong>Attachment Period:</strong>{" "}
                    {new Date(result.attachment_from_date).toLocaleDateString()}{" "}
                    - {new Date(result.attachment_to_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total Hours:</strong> {result.total_hours}
                  </p>
                </div>

                <h4 className="section-title">Scores</h4>
                <ul className="score-list">
                  <li>
                    <strong>Attendance:</strong> {result.attendance}
                  </li>
                  <li>
                    <strong>Commitment:</strong> {result.commitment}
                  </li>
                  <li>
                    <strong>Conduct:</strong> {result.conduct}
                  </li>
                  <li>
                    <strong>Courtesy:</strong> {result.courtesy}
                  </li>
                  <li>
                    <strong>Creativity:</strong> {result.creativity}
                  </li>
                  <li>
                    <strong>Efficiency:</strong> {result.efficiency}
                  </li>
                  <li>
                    <strong>Perseverance:</strong> {result.perseverance}
                  </li>
                  <li>
                    <strong>Professional Ethics:</strong>{" "}
                    {result.professional_ethics}
                  </li>
                  <li>
                    <strong>Professional Comments:</strong>{" "}
                    {result.professional_comments}
                  </li>
                  <li>
                    <strong>Teamwork:</strong> {result.teamwork}
                  </li>
                  <li>
                    <strong>Technical Knowledge:</strong>{" "}
                    {result.technical_knowledge}
                  </li>
                </ul>
                {/* Display Total Score */}
                <p className="total-score">
                  <strong>Total Score:</strong> {totalScore}
                </p>
              </div>
            );
          })
        ) : (
          <p className="no-results">No evaluation results sent from Company.</p>
        )}
      </div>
    </div>
  );
};

export default EvaluationResults;
