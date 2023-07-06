<script lang="ts">

    import iconCloseFolder from "../icon_folder_close.png"
    import iconOpenFolder from "../icon_folder_open.png"
    import iconFile from "../icon_file.png"
    import {createEventDispatcher} from "svelte";
    import type TreeItem from "./TreeItem";
    import TreeNodeItem from "./TreeNodeItem.svelte";

    export let nodes: Array<TreeItem>;
    export let textAttr: string = "label";
    export let childAttr: string = "children";
    export let expand: boolean = false;
    export let expandIcon: any = iconOpenFolder;
    export let foldIcon: any = iconCloseFolder;
    export let leafIcon: any = iconFile;
    export let style: string = '';

    export let activeNode: TreeItem = null;
    let dispatch = createEventDispatcher();

    const handleNodeSelected = (e) => {
        activeNode = e.detail;
        dispatch('select', activeNode);
    }

</script>

<div class="tsui-tree-view-wrapper" {style}>
    <div class="tsui-tree-view">
        {#each nodes as node}
            <TreeNodeItem {node} {textAttr} {childAttr} {expandIcon} {foldIcon} {leafIcon}
                          {activeNode} on:iconClick on:select={handleNodeSelected} on:dblclick/>
        {/each}
    </div>
</div>
