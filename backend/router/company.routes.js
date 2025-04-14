const express = require("express");
const companyController = require("../controller/company.controller");
const router = express.Router();

router.post("/api/company", companyController.createCompany);
router.get("/api/company/:id", companyController.getCompany);
router.patch("/api/company/:id", companyController.updateCompany);
router.delete("/api/company/:id", companyController.deleteCompany);
router.get("/api/company", companyController.getAllCompaniesWithoutPagination);
router.get("/api/companies/page", companyController.getAllCompanies);

module.exports = router;
