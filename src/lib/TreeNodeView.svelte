<script lang="ts">

    import type TreeNode from "./TreeNode";
    import {createEventDispatcher} from "svelte";

    export let expandIcon: any;
    export let foldIcon: any;
    export let leafIcon: any;
    export let node: TreeNode;
    export let activeNode: TreeNode;
    export let expand: boolean = false;

    let expanded: boolean = expand;
    const dispatch = createEventDispatcher();

    const isBranch = () => {
        return node.children && node.children.length > 0;
    }

    const handleNodeIconClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (respond) {
            respond = false;
            if (isBranch()) {
                expanded = !expanded
            } else {
                dispatch('iconClick', node);
                setTimeout(()=>{respond=true}, 200);
            }
        }
    }

    let respond: boolean = true;
    const handleNodeClick = (e: MouseEvent) => {
        if (respond) {
            respond = false;
            dispatch('select', node);
            setTimeout(()=>{respond=true}, 200);
        }
    }

</script>

<div class="tsui-tree-item">
    <div class="node-item" class:selected={activeNode===node} on:click={handleNodeClick} on:dblclick>
        <img class:branch={isBranch()} alt="" style="cursor: {isBranch() ? 'pointer' : 'default'}"
             src={isBranch() ? (expanded ? expandIcon : foldIcon) : leafIcon}
             on:click={(e)=>{handleNodeIconClick(e)}}/>
        <span>{node.text}</span>
    </div>
    {#if expanded}
        <div class="tsui-sub-tree">
            {#each node.children as child}
                <svelte:self node={child} {expand} {expandIcon} {foldIcon} {leafIcon} {activeNode} on:iconClick on:select on:dblclick/>
            {/each}
        </div>
    {/if}
</div>