import { Navigate, Route, Routes } from "react-router-dom";
import PrivateAuthRoute from "./components/auth/PrivateAuthRoute";
import { ToastContainer, toast } from "react-toastify";

import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/Not Found/PageNotFound";
import { DarkModeProvider } from "./context/DarkModeContext";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Home from "./pages/Home/Home";
import FAQ from "./components/Home/FAQ";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminDepartment from "./pages/Admin/Department";
import AdminCompany from "./pages/Admin/Company";
import AdminUser from "./pages/Admin/AdminUser";
import CriteriaWeight from "./pages/Admin/CriteriaWeight";
import Generate from "./pages/Admin/Generate";
import Account from "./pages/Admin/Account";
import AppLayout from "./ui/Admin/AppLayout";

// Acadamic Pages
import AcadamicDashboard from "./pages/Acadamic/Dashboard";
import AcadamicDepartment from "./pages/Acadamic/Department";
import AcadamicCompany from "./pages/Acadamic/Company";
import AcadamicUser from "./pages/Acadamic/AdminUser";
import CriteriaWeighta from "./pages/Acadamic/CriteriaWeight";
import Generatea from "./pages/Acadamic/Generate";
import Accounta from "./pages/Acadamic/Account";
import AppLayouta from "./ui/Acadamic/AppLayout";

// Student Pages
import Dashboard from "./pages/student/Dashboard";
import StudentPlacementForm from "./components/student/Apply/ApplyForm";
import StudentPlacementUpdateForm from "./components/student/Apply/UpdateForm";
import CompanyList from "./components/student/Company/CompanyList";
import ResultType from "./components/student/Result/ResultType";
import PlacementResults from "./components/student/Result/PlacementResults";
import EvaluationResults from "./components/student/Result/EvaluationResults";
import StudentAccount from "./pages/student/UpdateProfile";

// import Profile from "./pages/student/profile";

// Department Pages
import DepartmentDashboard from "./pages/departments/Dashboard";
import DepartmentCompany from "./pages/departments/Company";
import DepAppLayout from "./ui/Department/DepAppLayout";
import DepartmentStudent from "./pages/departments/Student";
import Result from "./pages/departments/Result";
import Grade from "./pages/departments/Grade";
import PlacementResult from "./components/department/Result/PlacementResult";
import CompanyResult from "./components/department/Result/CompanyResult";
import EvaluationResult from "./components/department/Result/EvaluationResult";

// Company Pages
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyStudent from "./pages/company/Students";
import CompanyAppLayout from "./ui/Company/CompanyAppLayout";

function App() {
  return (
    <>
      <DarkModeProvider>
        <GlobalStyles />
        <Routes>
          {/* ********* Public Routes ******* */}

          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ****** Admin Routes ******** */}

          <Route element={<AppLayout />}>
            <Route
              path="admin/dashboard"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminDashboard />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/user"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminUser />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/department"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminDepartment />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/company"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <AdminCompany />
                </PrivateAuthRoute>
              }
            />

            <Route
              path="admin/criteria"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <CriteriaWeight />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/placement"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <Generate />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="admin/Profile"
              element={
                <PrivateAuthRoute roles={["Admin"]}>
                  <Account />
                </PrivateAuthRoute>
              }
            />
          </Route>
          {/* ****** Acadamic Routes ******** */}

          <Route element={<AppLayouta />}>
            <Route
              path="Acadamic/dashboard"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <AcadamicDashboard />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="acadamic/user"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <AcadamicUser />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="acadamic/department"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <AcadamicDepartment />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="acadamic/company"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <AcadamicCompany />
                </PrivateAuthRoute>
              }
            />

            <Route
              path="acadamic/criteria"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <CriteriaWeighta />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="acadamic/placement"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <Generatea />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="acadamic/Profile"
              element={
                <PrivateAuthRoute roles={["acadamic"]}>
                  <Accounta />
                </PrivateAuthRoute>
              }
            />
          </Route>

          {/* ************* department routes *********** */}
          <Route element={<DepAppLayout />}>
            <Route path="department">
              <Route
                index
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <Navigate replace to="dashboard" />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <DepartmentDashboard />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <DepartmentStudent />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="company"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <DepartmentCompany />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student-results"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <Result />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student-placement-results"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <PlacementResult />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student-organizational-results"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <CompanyResult />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student-evaluation-results"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <EvaluationResult />
                  </PrivateAuthRoute>
                }
              />
              <Route
                path="student-grade"
                element={
                  <PrivateAuthRoute roles={["Department"]}>
                    <Grade />
                  </PrivateAuthRoute>
                }
              />
            </Route>
          </Route>

          {/* ******* student routes ********* */}

          <Route
            path="student/dashboard"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <Dashboard />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/company"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <CompanyList />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/apply"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <StudentPlacementForm />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/form/update"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <StudentPlacementUpdateForm />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/result"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <ResultType />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <StudentAccount />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/placement-results"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <PlacementResults />
              </PrivateAuthRoute>
            }
          />
          <Route
            path="student/evaluation-results"
            element={
              <PrivateAuthRoute roles={["Student"]}>
                <EvaluationResults />
              </PrivateAuthRoute>
            }
          />

          {/* ********** Company Routes ************ */}
          <Route element={<CompanyAppLayout />}>
            <Route
              path="company/dashboard"
              element={
                <PrivateAuthRoute roles={["Company"]}>
                  <CompanyDashboard />
                </PrivateAuthRoute>
              }
            />
            <Route
              path="company/student"
              element={
                <PrivateAuthRoute roles={["Company"]}>
                  <CompanyStudent />
                </PrivateAuthRoute>
              }
            />
          </Route>
        </Routes>
      </DarkModeProvider>
    </>
  );
}

export default App;
