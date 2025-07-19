export function buildTree(flatData) {
  const idMap = {};
  const root = [];

  // Step 1: create a map of all employees
  flatData.forEach(emp => {
    idMap[emp.id] = { ...emp, children: [] };
  });

  // Step 2: connect children to their parent
  flatData.forEach(emp => {
    if (emp.parentId) {
      idMap[emp.parentId].children.push(idMap[emp.id]);
    } else {
      root.push(idMap[emp.id]); // no parent => root node
    }
  });

  // Step 3: transform to react-d3-tree format
  const transformNode = (node) => ({
    name: node.name,
    attributes: { role: node.role },
    children: node.children.map(transformNode),
  });

  return root.map(transformNode)[0]; // Return root node
}
