# 树形视图组件

这是一个Svelte组件，允许您显示由TreeNode对象构成的树形结构，每个节点都可以展开或折叠，以显示或隐藏其子节点。

## 安装

你可以通过npm安装它。

```shell
npm i -D @hanmotec/tsui-tree-view
```

## TreeNode接口和Tree转换函数

### TreeNode接口
TreeNode接口定义了树节点对象的结构。它具有以下属性：

**value**: 表示节点值的字符串。  
**text**: 表示节点的显示文本的字符串。 
**data**: 一个可选的属性，可以保存节点的其他数据。  
**children**: 一个可选的TreeNode对象数组，表示当前节点的子节点。  
**parent**: 一个可选的属性，表示当前节点的父节点。  
以下是如何创建TreeNode对象的示例：  
```typescript
const node: TreeNode = {
    value: 'node1',
    text: 'Node 1',
    data: { someData: 'example' },
    children: [],
    parent: null
};
```

### Tree转换函数
buildTree函数将一个对象数组转换为树形结构。该函数接受以下参数：

**arr**: 要转换的对象数组。
**keyField**: 包含节点值的对象中的字段的名称。  
**textField**: 包含节点的显示文本的对象中的字段的名称。  
**parentField**: 包含父节点的值的对象中的字段的名称。
**rootParentCode**: 表示树的根节点的可选值。  
以下是如何使用buildTree函数的示例：  

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

这将创建一个具有以下节点的树形结构：
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

## 使用方法

要使用此组件，您需要将其导入到您的 Svelte 应用程序中，并提供要显示的 TreeNode 对象的数组。您还可以自定义用于展开/折叠按钮和叶节点的图标，以及应用自定义 CSS 样式。

但是使用此组件，可以在工程启动的时候引入css文件。
```typescript
import "@hanmotec/tsui-tree-view/tsui-tree-view.css"
```
以下是如何使用该组件的示例：

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

## 属性
TreeView 组件接受以下属性：

**nodes**: 要在树中显示的 TreeNode 对象的数组。
**expand**: 一个布尔值，指示默认情况下树是否应完全展开或折叠。
**expandIcon**: 用于展开节点的图标。
**foldIcon**: 用于折叠节点的图标。
**leafIcon**: 用于叶节点的图标。
**style**: 包含要应用于树容器的 CSS 样式的字符串。

## Events

当单击节点时，TreeView 组件会发出 select 事件。事件对象包含一个带有所选 TreeNode 对象的 detail 属性。
要处理 select 事件，您可以向组件实例添加事件侦听器：

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

当双击节点的时候，TreeView 组件会发出 dblclick 事件

**许可证**
T本项目采用 MIT 许可证授权。

**贡献**
我们欢迎对此软件包的贡献！如果您有功能的想法或想报告错误，请打开一个问题。如果您想贡献代码，请 fork 该存储库并创建拉取请求。