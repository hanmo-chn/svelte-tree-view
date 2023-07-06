<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import type TreeItem from "./TreeItem";

    export let textAttr: string = "label";
    export let childAttr: string = "children";
    export let expandIcon: any;
    export let foldIcon: any;
    export let leafIcon: any;
    export let node: TreeItem;
    export let activeNode: TreeItem;

    let expanded: boolean = node.expand;
    const dispatch = createEventDispatcher();

    const isBranch = () => {
        return node.data[childAttr] && node.data[childAttr].length > 0;
    }

    const handleNodeIconClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (respond) {
            respond = false;
            if (isBranch()) {
                expanded = !expanded
                node.expand = expanded;
            } else {
                dispatch('iconClick', node);
            }
            setTimeout(()=>{respond=true}, 200);
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

    $: expanded=node.expand;

</script>

<div class="tsui-tree-item">
    <div class="node-item" class:selected={activeNode===node} on:click={handleNodeClick} on:dblclick>
        <img class:branch={isBranch()} alt="" style="cursor: {isBranch() ? 'pointer' : 'default'}"
             src={isBranch() ? (expanded ? expandIcon : foldIcon) : leafIcon}
             on:click={(e)=>{handleNodeIconClick(e)}}/>
        <span>{node.data[textAttr]}</span>
    </div>
    {#if expanded}
        <div class="tsui-sub-tree">
            {#each node.data[childAttr] as child}
                <svelte:self node={child} {textAttr} {childAttr} {expandIcon} {foldIcon}
                             {leafIcon} {activeNode} on:iconClick on:select on:dblclick/>
            {/each}
        </div>
    {/if}
</div>