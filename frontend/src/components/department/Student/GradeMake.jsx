import { useState, useEffect } from "react";
import studentService from "../../../services/student.service";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../../../ui/Spinner";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: var(--color-grey-200);
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-grey-100);
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  margin-left: 1px;
  padding: 7px;
  border: 1px solid #ccc;
  background: var(--color-grey-100);
  font-size: 1.4rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const GradeMake = () => {
  const { userId } = useAuth();
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [scoreInputs, setScoreInputs] = useState({});
  const [submittedStudents, setSubmittedStudents] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");

  const fetchStudents = async () => {
    try {
      const response = await studentService.getStudentsByDepartment(userId);
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (response.ok) {
        const responseData = await response.json();
        const studentsData = responseData.data.map((student, index) => ({
          ...student,
          id: index + 1,
        }));
        setStudents(studentsData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await studentService.fetchGrades();
      if (response.success) {
        const fetchedGrades = Array.isArray(response.data) ? response.data : [];
        setGrades(fetchedGrades);
      } else {
        setErrorMessage("Failed to fetch grades.");
        setGrades([]);
      }
    } catch (error) {
      setErrorMessage("Error fetching grades.");
      setGrades([]);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchGrades();
  }, [grades]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filterStudents = (student) => {
    const { first_name, last_name, contact_email, phone_number } = student;
    return (
      first_name.toLowerCase().includes(searchText) ||
      last_name.toLowerCase().includes(searchText) ||
      contact_email.toLowerCase().includes(searchText) ||
      phone_number.toLowerCase().includes(searchText)
    );
  };

  const filteredStudents = searchText
    ? students.filter(filterStudents)
    : students;

  const isValidScore = (value) => {
    const score = parseFloat(value);
    return !isNaN(score) && score >= 0 && score <= 60;
  };

  const handleScoreChange = (studentId, value) => {
    const cleaned = value.replace(/[^0-9.]/g, "");
    setScoreInputs({ ...scoreInputs, [studentId]: cleaned });
    setErrorMessage("");
  };

  const submitScore = async (studentId) => {
    const score = parseFloat(scoreInputs[studentId]);

    if (isNaN(score)) {
      setErrorMessage("Please enter a numeric score");
      return;
    }

    if (score > 60) {
      setErrorMessage("You cannot submit a score greater than 60%");
      return;
    }

    const gradeData = {
      student_id: studentId,
      grade: score,
    };

    try {
      const response = await studentService.submitGrades([gradeData]);
      if (response.success) {
        toast.success(`Score ${score}% submitted`);

        setStudents((prev) =>
          prev.map((s) =>
            s.student_id === studentId ? { ...s, academic_result: score } : s
          )
        );
        fetchGrades();

        setScoreInputs((prev) => {
          const updated = { ...prev };
          delete updated[studentId];
          return updated;
        });

        setSubmittedStudents((prev) => new Set(prev).add(studentId));
      } else {
        toast.error("Error submitting score");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the score");
      console.error("Submit error:", error);
    }
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        <SearchInput
          style={{
            borderRadius: "15px",
            paddingLeft: "40px",
            width: "45%",
            maxWidth: "60%",
          }}
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search by student name, email or phone ..."
        />
        <CiSearch
          style={{
            position: "absolute",
            left: "10px",
            top: "10%",
            fontSize: "28px",
          }}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>ID</TableHeader>
              <TableHeader>First Name</TableHeader>
              <TableHeader>Last Name</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Academic (60 %)</TableHeader>
              <TableHeader>Company (40 %)</TableHeader>
              <TableHeader>Total (100%)</TableHeader>
              <TableHeader>Grade</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {filteredStudents.map((student) => {
              const inputValue = scoreInputs[student.student_id] || "";
              const isSubmitted = submittedStudents.has(student.student_id);

              const grade = grades.find(
                (g) => g.student_id === student.student_id
              );

              const academicResult = grade?.academic_result;
              const companyResult = grade?.company_result;
              const isValidAcademic = !isNaN(academicResult);
              const isValidCompany = !isNaN(companyResult);

              const total =
                isValidAcademic &&
                isValidCompany &&
                companyResult !== null &&
                academicResult !== null
                  ? Number(academicResult) + Number(companyResult)
                  : null;

              const gradeLetter =
                total !== null
                  ? total >= 90
                    ? "A+"
                    : total >= 80
                    ? "A"
                    : total >= 70
                    ? "B"
                    : total >= 60
                    ? "C"
                    : total >= 50
                    ? "D"
                    : "F"
                  : null;

              return (
                <TableRow key={student.student_id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.first_name}</TableCell>
                  <TableCell>{student.last_name}</TableCell>
                  <TableCell>{student.phone_number}</TableCell>
                  <TableCell>{student.contact_email}</TableCell>

                  {/* Academic Result */}
                  <TableCell>
                    {console.log(academicResult, companyResult)}
                    {academicResult !== undefined && academicResult !== null ? (
                      <p>{academicResult}</p>
                    ) : isSubmitted ? (
                      <p>{inputValue}%</p>
                    ) : (
                      companyResult && (
                        <>
                          <input
                            className="border"
                            type="text"
                            placeholder=" Enter..."
                            value={inputValue}
                            onChange={(e) =>
                              handleScoreChange(
                                student.student_id,
                                e.target.value
                              )
                            }
                            style={{ width: "60px", padding: "4px" }}
                          />
                          {errorMessage && (
                            <ErrorMessage>{errorMessage}</ErrorMessage>
                          )}
                        </>
                      )
                    )}
                  </TableCell>

                  {/* Company Result */}
                  <TableCell>
                    {companyResult !== undefined && companyResult !== null ? (
                      <p>{companyResult}</p>
                    ) : (
                      <p>...</p>
                    )}
                  </TableCell>

                  {/* Total */}
                  <TableCell>
                    {total !== null ? <p>{total}</p> : <p>...</p>}
                  </TableCell>

                  {/* Grade */}
                  <TableCell>
                    {gradeLetter !== null ? <p>{gradeLetter}</p> : <p>...</p>}
                  </TableCell>

                  {/* Action */}
                  <TableCell>
                    {!academicResult && !isSubmitted ? (
                      <button
                        className="bg-amber-200 text-black p-2 rounded-2xl"
                        onClick={() => submitScore(student.student_id)}
                        disabled={!isValidScore(inputValue)}
                      >
                        Submit
                      </button>
                    ) : (
                      <p>Done</p>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default GradeMake;
