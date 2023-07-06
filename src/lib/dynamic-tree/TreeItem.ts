export default interface TreeItem {
    /**
     * 当前节点是否打开
     */
    expand: boolean;
    /**
     * 对应节点的数据
     */
    data: any;

}

export const createTreeItems = (list: Array<any>):Array<TreeItem> => {
    let nodes:Array<TreeItem> = [];
    if (list && list.length > 0) {
        list.forEach(item => {
            nodes.push({expand: false, data: item});
        })
    }
    return nodes;
}

export const appendChildren = (node: TreeItem, childAttr: string, list: Array<any>):void => {
    node.data[childAttr] = createTreeItems(list);
    node.expand = node.data[childAttr].length > 0;
}
