import { useEffect, useState, useRef } from "react";
import Tree from "react-d3-tree";
import { flatEmployees } from "./employees"; 
import { buildTree } from "../utils/BuildTree"; 

export default function OrgTree() {
  const treeRef = useRef();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const rootNode = buildTree(flatEmployees);
    setTreeData(rootNode);

    const dimensions = treeRef.current.getBoundingClientRect();
    setTranslate({ x: dimensions.width / 2, y: 80 });
  }, []);

  return (
    <div ref={treeRef} style={{ width: "100%", height: "100vh", backgroundColor: "#f3f4f6" }}>
      {treeData && (
        <Tree
          data={treeData}
          translate={translate}
          orientation="vertical"
          pathFunc="step"
          collapsible
          styles={{
            nodes: {
              node: {
                circle: { fill: "#4f46e5", r: 12 },
                name: { fontSize: "14px", fill: "#111" },
                attributes: { fontSize: "12px", fill: "#555" },
              },
              leafNode: {
                circle: { fill: "#22c55e", r: 12 },
              },
            },
          }}
        />
      )}
    </div>
  );
}
