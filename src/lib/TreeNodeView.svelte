<script lang="ts">

    import type TreeNode from "./TreeNode";
    import {createEventDispatcher} from "svelte";

    export let expandIcon: any;
    export let foldIcon: any;
    export let leafIcon: any;
    export let node: TreeNode;
    export let activeNode: TreeNode;

    let expanded: boolean = false;
    const dispatch = createEventDispatcher();

    const isBranch = () => {
        return node.children && node.children.length > 0;
    }

    const handleNodeIconClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isBranch()) {
            expanded = !expanded
        }
    }

    const handleNodeClick = (e: MouseEvent) => {
        dispatch('select', node);
    }

</script>

<div class="tsui-tree-item">
    <div class="node-item" class:selected={activeNode===node} on:click={handleNodeClick}>
        <img class:branch={isBranch()} alt="" style="cursor: {isBranch() ? 'pointer' : 'default'}"
             src={isBranch() ? (expanded ? expandIcon : foldIcon) : leafIcon}
             on:click={(e)=>{handleNodeIconClick(e)}}/>
        <span>{node.text}</span>
    </div>
    {#if expanded}
        <div class="tsui-sub-tree">
            {#each node.children as child}
                <svelte:self node={child} {expandIcon} {foldIcon} {leafIcon} {activeNode} on:select/>
            {/each}
        </div>
    {/if}
</div>