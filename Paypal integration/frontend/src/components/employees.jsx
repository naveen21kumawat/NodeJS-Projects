export const flatEmployees = [
  { id: "1", name: "Alice", role: "CEO", parentId: null },
  { id: "2", name: "Bob", role: "Manager", parentId: "1" },
  { id: "3", name: "Charlie", role: "Manager", parentId: "1" },
  { id: "4", name: "David", role: "Developer", parentId: "2" },
  { id: "5", name: "Sara", role: "QA Engineer", parentId: "2" },
  { id: "6", name: "Eva", role: "Developer", parentId: "3" },
];
