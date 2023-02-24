<script lang="ts">

    import type TreeNode from "./TreeNode";
    import iconCloseFolder from "./icon_folder_close.png"
    import iconOpenFolder from "./icon_folder_open.png"
    import iconFile from "./icon_file.png"
    import TreeNodeView from "./TreeNodeView.svelte";
    import {createEventDispatcher} from "svelte";

    export let nodes: Array<TreeNode>;
    export let expand: boolean = false;
    export let expandIcon: any = iconOpenFolder;
    export let foldIcon: any = iconCloseFolder;
    export let leafIcon: any = iconFile;
    export let style: string = '';

    let activeNode: TreeNode = null;
    let dispatch = createEventDispatcher();

    const handleNodeSelected = (e) => {
        activeNode = e.detail;
        dispatch('select', activeNode);
    }

</script>

<div class="tsui-tree-view-wrapper" {style}>
    <div class="tsui-tree-view">
        {#each nodes as node}
            <TreeNodeView {node} {expandIcon} {foldIcon} {leafIcon} {activeNode} on:select={handleNodeSelected} on:dblclick/>
        {/each}
    </div>
</div>
