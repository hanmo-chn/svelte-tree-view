<script lang="ts">
    import TreeView from "../lib/TreeView.svelte";
    import "../lib/tsui-tree-view.scss"
    import iconBuilding from './icon-building.png';
    import {buildTree} from "../lib";

    let nodes = buildTree([
        {code: 'mes', label: '生产制造系统', parentCode: '#'},
        {code: 'engy', label: '能源管理系统', parentCode: '#'},
        {code: 'equ', label: '设备管理系统', parentCode: '#'},
        {code: 'lgs', label: '智能运输系统', parentCode: '#'},
        {code: 'mes.pts', label: '工艺系统', parentCode: 'mes'},
        {code: 'mes.sch', label: '调度管理', parentCode: 'mes'},
        {code: 'mes.job', label: '生产作业', parentCode: 'mes'},
        {code: 'mes.qms', label: '质量管理', parentCode: 'mes'},
        {code: 'mes.qms.raw', label: '质量管理-原材料', parentCode: 'mes.qms'},
        {code: 'mes.qms.int', label: '质量管理-中间品', parentCode: 'mes.qms'},
        {code: 'mes.qms.prod', label: '质量管理-产品', parentCode: 'mes.qms'},
        {code: 'mes.pts.cnt', label: '工艺连锁', parentCode: 'mes.pts'},
        {code: 'mes.pts.card', label: '工艺卡片', parentCode: 'mes.pts'},
        {code: 'mes.pts.prog', label: '工艺操作法', parentCode: 'mes.pts'}
    ], 'code', 'label', 'parentCode', '#');

    console.log(nodes);

</script>
<h1>List Box Demo</h1>
<div style="width: 320px; height: 600px; position: relative; border: 1px solid #e0e0e0">
    <TreeView expand={true}  style="width: 100%; height: 100%" {nodes} on:select={(e)=>{console.log('选择项目：', e.detail)}}>

    </TreeView>
</div>
