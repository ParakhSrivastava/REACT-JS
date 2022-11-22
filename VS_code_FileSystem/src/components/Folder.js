import { useState } from "react";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });

  // https://www.w3schools.com/jsref/event_stoppropagation.asp
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    // e.keyCode is 13 for Enter key
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>🗂 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {/* for Input field of new folder/file */}
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "🗂" : ""}</span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                // The onkeydown event occurs when the user is pressing a key (on the keyboard)
                className="inputContainer__input"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={item}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">{explorer.name}</span>;
  }
};

export default Folder;
