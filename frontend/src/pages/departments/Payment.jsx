import axios from "axios";
import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import departmentService from "../../services/department.service";

function Payment({ student }) {
  const txRef = `${student.username}_${student.phone_number}_${Date.now()}`;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [payAmount, setPaymentAmount] = useState(null);
  const DepartmentPerPage = 20;
  const page = 1;
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await departmentService.getAllDepartments(
          page,
          DepartmentPerPage
        );

        await new Promise((resolve) => setTimeout(resolve, 400));

        if (response.ok) {
          const responseData = await response.json();

          const departmentsData = responseData.departments?.map(
            (department, index) => ({
              ...department,
              id: (page - 1) * DepartmentPerPage + index + 1,
            })
          );

          setDepartments(departmentsData);

          setLoading(false);
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [page]);
  console.log(departments);
  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(() => {
    if (departments.length > 0) {
      adjustAmountBasedOnDepartment();
    }
  }, [departments]);

  const adjustAmountBasedOnDepartment = () => {
    // Compare the student's department ID with the fetched department ID
    const studentDepartment = student.department_id; // Assuming student object has department_id

    const department = departments.find(
      (dept) => dept.id === studentDepartment
    );

    if (department) {
      // If found, adjust the amount based on department
      if (
        department.name === "InfoSystem" ||
        department.name === "InfoTechnology"
      ) {
        setPaymentAmount(3500); // Adjust the amount for these departments
      } else if (department.name === "CompScience") {
        setPaymentAmount(3200); // Adjust the amount for Computer Science department
      } else if (department.name === "CompScienceand") {
        setPaymentAmount(3300); // Adjust the amount for CompScienceand department
      } else {
        setPaymentAmount(3000); // Default price for all other departments
      }
    }
  };

  async function fetchTransactions() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/payment/transactions"
      );

      if (response.data.status) {
        const allTransactions = response.data.data;
        setTransactions(allTransactions);

        // Now check if student has already paid (by matching name and email)
        const found = allTransactions.find(
          (tx) =>
            tx.first_name.toLowerCase() === student.first_name.toLowerCase() &&
            tx.last_name.toLowerCase() === student.last_name.toLowerCase() &&
            tx.email.toLowerCase() === student.contact_email.toLowerCase() &&
            tx.status === "success" // Only successful transactions
        );

        if (found) {
          setHasPaid(true);
        }
      } else {
        setError(response.data.message || "Failed to load transactions");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!student) return null;

  return (
    <div>
      {/* For debugging purposes */}

      {loading ? (
        <p>Loading payment status...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
          <input
            type="hidden"
            name="public_key"
            value="CHAPUBK_TEST-FHbUiBCjgXrWgBSBtEtuWfDbZ1XnOzAf"
          />
          <input type="hidden" name="tx_ref" value={txRef} />
          <input type="hidden" name="amount" value={payAmount} />
          <input type="hidden" name="currency" value="ETB" />
          <input type="hidden" name="email" value={student.contact_email} />
          <input type="hidden" name="first_name" value={student.first_name} />
          <input type="hidden" name="last_name" value={student.last_name} />
          <input type="hidden" name="title" value="Chapa Checkout" />
          <input
            type="hidden"
            name="description"
            value="Paying with Confidence with cha"
          />
          <input
            type="hidden"
            name="logo"
            value="https://chapa.link/asset/images/chapa_swirl.svg"
          />
          <input
            type="hidden"
            name="callback_url"
            value={`http://localhost:8080/api/payment/callback?tx_ref=${txRef}`}
          />
          <input
            type="hidden"
            name="return_url"
            value="http://localhost:5173/department/student"
          />
          <input type="hidden" name="meta[title]" value="Student Practical" />
          <button
            type="submit"
            disabled={hasPaid}
            style={{ borderRadius: 12, paddingLeft: 12, paddingRight: 12 }}
            className={`px-8 py-2   font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
    ${
      hasPaid
        ? " text-gray-500 cursor-not-allowed"
        : "bg-gradient-to-r   from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-purple-400 shadow-md hover:shadow-lg"
    }`}
          >
            {hasPaid ? (
              <p className="flex place-items-center">
                {" "}
                <Check className="w-9  h-8 mr-5 " /> Paid{" "}
              </p>
            ) : (
              <p className="flex place-items-center">
                <Lock className="w-9 h-8 mr-5" /> Pay{" "}
              </p>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default Payment;
