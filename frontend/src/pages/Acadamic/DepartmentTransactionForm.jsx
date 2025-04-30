import React, { useEffect, useState } from "react";
import { EditIcon, Trash2Icon, PlusIcon } from "lucide-react";
import departmentService from "../../services/department.service";

const TransactionForm = () => {
  // const departments = ["HR", "Finance", "IT", "Marketing"];
  const [transactions, setTransactions] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [amount, setAmount] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [departments, setDepartments] = useState([]);
  const page = 1;
  const DepartmentPerPage = 20;
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
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
          // console.log(departmentsData);
          setDepartments(
            departmentsData.map(
              (dep) =>
                // console.log(dep.department_name)
                dep.department_name
            )
          );
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [page]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/transactions");
        const data = await res.json();

        if (res.ok) {
          setTransactions(data.data); // assuming your backend returns { data: [...] }
          console.log(data.data);
        } else {
          console.error("Failed to load transactions:", data.error);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);
  const handleAdd = async () => {
    if (!selectedDept || !amount) return;

    // Check if the department already exists in the transaction list
    const isDuplicate = transactions.some(
      (tx) => tx.department === selectedDept || tx.dept === selectedDept
    );

    if (isDuplicate) {
      alert("Transaction for this department already exists.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: selectedDept,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTransactions([
          { department: selectedDept, amount },
          ...transactions,
        ]);
        closeModals();
      } else {
        alert("Failed to add transaction: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Add transaction error:", error);
      alert("Network or server error occurred.");
    }
  };

  const handleEdit = () => {
    const updated = [...transactions];
    updated[editIndex] = { ...updated[editIndex], amount }; // Only update amount
    setTransactions(updated);
    closeModals();
  };
  const handleDelete = async () => {
    console.log(transactions[deleteIndex]);
    const transactionToDelete = transactions[deleteIndex];

    if (!transactionToDelete?.id) {
      alert("Transaction ID not found.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/transactions/${transactionToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        const updated = [...transactions];
        updated.splice(deleteIndex, 1);
        setTransactions(updated);
        closeModals();
      } else {
        alert(
          "Failed to delete transaction: " + (data.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Delete transaction error:", error);
      alert("Network or server error occurred.");
    }
  };

  const openEditModal = (index) => {
    const item = transactions[index];
    setSelectedDept(item.department); // Keep department as is
    setAmount(item.amount); // Keep amount for editing
    setEditIndex(index);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setSelectedDept("");
    setAmount("");
    setEditIndex(null);
    setDeleteIndex(null);
    setIsFormModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Department Transactions</h1>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <PlusIcon size={18} />
          Add Transaction
        </button>
      </div>

      <table className="w-full border table-auto space-y-5">
        <thead className="bg-gray-100 text-black ">
          <tr>
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">Department</th>
            <th className="text-left p-2">Amount</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index} className="border-b border-l-0 border ">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{tx.department}</td>
              <td className="p-2">{parseInt(tx.amount)}ETB</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => openEditModal(index)}
                  className="text-blue-600"
                >
                  <EditIcon size={18} />
                </button>
                <button
                  onClick={() => openDeleteModal(index)}
                  className="text-red-600"
                >
                  <Trash2Icon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-8 rounded-lg w-full max-w-lg shadow-xl bg-white"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-black">
              Add Transaction
            </h2>

            {/* Department select */}
            <select
              className="w-full mb-6 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              style={{
                backgroundColor: "var(--color-grey-50)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            {/* Amount input */}
            <input
              className="w-full mb-6 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              style={{
                backgroundColor: "var(--color-grey-50)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModals}
                className="w-full py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none text-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none text-lg font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-8 rounded-lg w-full max-w-lg shadow-xl bg-white"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            <h2 className="text-2xl text-black font-semibold mb-6 text-center">
              Edit Transaction
            </h2>

            {/* Department is fixed, not editable */}
            <div
              className="mb-6 p-4 rounded-lg border"
              style={{
                backgroundColor: "var(--color-grey-50)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            >
              <label className="block mb-2 font-medium">Department</label>
              <p>{selectedDept}</p> {/* Display selected department */}
            </div>

            <input
              className="w-full mb-6 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              style={{
                backgroundColor: "var(--color-grey-50)",
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="flex justify-between gap-4">
              <button
                onClick={closeModals}
                className="w-full py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none text-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none text-lg font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-8 rounded-lg w-full  max-w-lg shadow-xl bg-white"
            style={{
              backgroundColor: "var(--color-bg)",
              color: "var(--color-text)",
            }}
          >
            <h2 className="text-2xl text-black font-semibold mb-6 text-center">
              Are you sure you want to delete this transaction?
            </h2>

            <div className="flex justify-between gap-4">
              <button
                onClick={closeModals}
                className="w-full py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 focus:outline-none text-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none text-lg font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionForm;
