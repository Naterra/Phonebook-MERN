const fields = {
  pers: [
    { label: "FirstName", name: "FirstName", reguired: true },
    { label: "LastName", name: "LastName", reguired: true },
    { label: "CompanyName", name: "CompanyName" },
    { label: "Title", name: "Title" },
    { label: "Category", name: "Category" }
  ],
  contact: [
    { label: "Email", name: "Email" },
    { label: "MobileNo", name: "MobileNo" },
    { label: "HomeNo", name: "HomeNo" },
    { label: "OfficeNo", name: "OfficeNo" },
    { label: "OtherNo", name: "OtherNo" },
    { label: "FaxNo", name: "FaxNo" },
    { label: "Cell Phone", name: "cellPhone" }
  ],
  address: [
    { label: "Country", name: "Country" },
    { label: "City", name: "City" },
    { label: "State", name: "State" },
    { label: "Street", name: "Street" },
    { label: "Zip", name: "Zip" }
  ],
  other: [{ label: "Notes", name: "Notes" }]
};

export default fields;
