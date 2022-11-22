import "./styles.css";
import explorer from "./data/folderData";
import { useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/useTraverseTree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) =>
    insertNode(explorerData, folderId, item, isFolder);

  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}
