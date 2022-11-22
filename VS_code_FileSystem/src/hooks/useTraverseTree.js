const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: []
      });
      return tree;
    }

    let latestItems = [];
    latestItems = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestItems };
  }

  return { insertNode };
};

export default useTraverseTree;
