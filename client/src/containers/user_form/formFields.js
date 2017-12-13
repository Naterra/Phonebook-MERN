const fields = {
  pers: [
    { label: "name", name: "name", reguired: true },
    { label: "Company Name", name: "company_name" },
    { label: "Title", name: "title" },
    { label: "Category", name: "category" }
  ],
  contact: [
    { label: "Email", name: "email" },
    { label: "MobileNo", name: "cell_phone" },
    { label: "Office Number", name: "work_phone" },
    { label: "Fax", name: "fax" }
  ],
  address: [
    { label: "Country", name: "country" },
    { label: "City", name: "city" },
    { label: "State", name: "state" },
    { label: "Address", name: "address" },
    { label: "Zip", name: "zip" }
  ],
  other: [{ label: "Notes", name: "notes" }]
};

export default fields;
