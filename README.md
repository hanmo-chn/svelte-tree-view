# Tree View Component

[中文文档](https://github.com/hanmo-chn/svelte-tree-view/blob/main/README-CN.md)

This is a Svelte component that allows you to display a tree structure of TreeNode objects, where each node can be expanded or collapsed to reveal or hide its child nodes.

## Installation

you can install it via npm.

```shell
npm i -D @hanmotec/tsui-tree-view
```

## TreeNode Interface and Tree Converter Function

### TreeNode Interface
The TreeNode interface defines the structure of a tree node object. It has the following properties:

**value**: a string that represents the value of the node.  
**text**: a string that represents the display text for the node.  
**data**: an optional property that can hold additional data for the node.  
**children**: an optional array of TreeNode objects that represent the child nodes of the current node.  
**parent**: an optional property that represents the parent node of the current node.  
Here's an example of how to create a TreeNode object:  
```typescript
const node: TreeNode = {
    value: 'node1',
    text: 'Node 1',
    data: { someData: 'example' },
    children: [],
    parent: null
};
```

### Tree Converter Functions
The buildTree function takes an array of objects and converts it into a tree structure. The function takes the following parameters:

**arr**: the array of objects to convert.
**keyField**: the name of the field in the objects that contains the node value.  
**textField**: the name of the field in the objects that contains the display text for the node.  
**parentField**: the name of the field in the objects that contains the value of the parent node.  
**rootParentCode**: an optional value that represents the root node of the tree.  
Here's an example of how to use the buildTree function:  

```typescript
const data = [
    { id: 1, name: 'Node 1', parentId: null },
    { id: 2, name: 'Node 1.1', parentId: 1 },
    { id: 3, name: 'Node 1.2', parentId: 1 },
    { id: 4, name: 'Node 2', parentId: null },
    { id: 5, name: 'Node 2.1', parentId: 4 }
];

const tree = buildTree(data, 'id', 'name', 'parentId');
```

This will create a tree structure with the following nodes:
```typescript
[
    {
        value: '1',
        text: 'Node 1',
        data: { id: 1, name: 'Node 1', parentId: null },
        children: [
            {
                value: '2',
                text: 'Node 1.1',
                data: { id: 2, name: 'Node 1.1', parentId: 1 },
                children: []
            },
            {
                value: '3',
                text: 'Node 1.2',
                data: { id: 3, name: 'Node 1.2', parentId: 1 },
                children: []
            }
        ],
        parent: null
    },
    {
        value: '4',
        text: 'Node 2',
        data: { id: 4, name: 'Node 2', parentId: null },
        children: [
            {
                value: '5',
                text: 'Node 2.1',
                data: { id: 5, name: 'Node 2.1', parentId: 4 },
                children: []
            }
        ],
       

```

## Usage
To use this component, you will need to import it into your Svelte app and provide it with an array of TreeNode objects to display. You can also customize the icons used for the expand/collapse buttons and the leaf nodes, as well as apply a custom CSS style.

Here's an example of how to use the component:


```sveltehtml
<script>
    import TreeView from "@hanmotec/tsui-tree-view";
    
    const nodes = [
        {
            value: '1',
            text: 'Node 1',
            data: { id: 1, name: 'Node 1', parentId: null },
            children: [
                {
                    value: '2',
                    text: 'Node 1.1',
                    data: { id: 2, name: 'Node 1.1', parentId: 1 },
                    children: []
                },
                {
                    value: '3',
                    text: 'Node 1.2',
                    data: { id: 3, name: 'Node 1.2', parentId: 1 },
                    children: []
                }
            ],
            parent: null
        },
        {
            value: '4',
            text: 'Node 2',
            data: {id: 4, name: 'Node 2', parentId: null},
            children: [
                {
                    value: '5',
                    text: 'Node 2.1',
                    data: {id: 5, name: 'Node 2.1', parentId: 4},
                    children: []
                }
            ]
        }
    ];
</script>

<TreeView nodes={nodes} style="font-size: 14px" />

```

## Props
The TreeView component accepts the following props:

**nodes**: an array of TreeNode objects to display in the tree.
**expand**: a boolean indicating whether the tree should be fully expanded or collapsed by default.
**expandIcon**: the icon to use for expanded nodes.
**foldIcon**: the icon to use for collapsed nodes.
**leafIcon**: the icon to use for leaf nodes.
**style**: a string containing CSS styles to apply to the tree container.

## Events
The TreeView component emits a select event when a node is clicked. The event object contains a detail property with the selected TreeNode object.

To handle the select event, you can add an event listener to the component instance:

```sveltehtml
<script>
    import TreeView from "@hanmotec/tsui-tree-view";
    
    const nodes = [...];
    
    const handleNodeSelected = (e) => {
        const selectedNode = e.detail;
        console.log(`Selected node: ${selectedNode.name}`);
    };
</script>

<TreeView nodes={nodes} on:select={handleNodeSelected} />

```

**License**
This project is licensed under the MIT license.

**Contributing**
We welcome contributions to this package! If you have an idea for a feature or would like to report a bug, please open an issue. If you'd like to contribute code, please fork the repository and create a pull request.