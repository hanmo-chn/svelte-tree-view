export default interface TreeNode {
    /**
     * 节点的值
     */
    value: string;
    /**
     * 节点的文字
     */
    text: string;
    /**
     * 对应节点的数据
     */
    data?: any;
    /**
     * 子节点
     */
    children?: Array<TreeNode>;
    /**
     * 父节点
     */
    parent?: TreeNode | null;
}

/**
 *
 * @param data
 * @param keyField
 * @param textField
 * @param parentField
 * @param parentCode
 * @param parent
 */
const convertArrayToTree = (data: Array<any>, keyField: string, textField: string, parentField: string,
                            parentCode: string | null = null, parent: TreeNode | null = null) : Array<TreeNode> => {
    let nodes:Array<TreeNode> = [];
    for (let i = 0; i < data.length; i++) {
        let pCode = data[i][parentField];
        if ((parentCode == null && pCode == null) || ( pCode == parentCode)) {
            let code:string = data[i][keyField];
            let node:TreeNode = {value:code, text: data[i][textField], data:data[i], parent}
            node.children = convertArrayToTree(data, keyField, textField, parentField, code, node);
            nodes.push(node);
        }
    }
    return nodes;
}

/**
 * 把数组构建成一棵树
 * @param arr
 * @param keyField
 * @param textField
 * @param parentField
 * @param rootParentCode
 */
export const buildTree = (arr: Array<any>, keyField: string, textField: string, parentField: string,
                          rootParentCode: string | null = null): Array<TreeNode> => {
    return convertArrayToTree(arr, keyField, textField, parentField, rootParentCode);
}