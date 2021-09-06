<script lang="ts">   
    import pan from "./pan";

    export let min: number;
    export let max: number;
    export let range: number[] = [0.33, 0.66];

    let start: number = range[0];
    let end: number = range[1];

    $: setStart(start);
    function setStart(s) {        
        if (s < range[1]) {
            range[0] = s;
        }
    }

    $: setEnd(end);
    function setEnd(e) {
        if (e > range[0]) {
            range[1] = e;
        }
    }

    function move(e) {                
        const width = range[1] - range[0];
        range[0] = e;
        range[1] = e + width;
    }

    $: min, max, clamp()    
    function clamp() {
        setStart(start);
        setEnd(end);
    }

</script>

<div class="track">
    <div use:pan on:pan={e => move(e.detail)} style={`left:${range[0]*100}%;width:${(range[1]-range[0])*100}%`} class="range"/>
    <div use:pan on:pan={e => start = e.detail} class="thumb" style={`left:${range[0]*100}%`}>
        <div class="thumb-content"/>
    </div>
    <div use:pan on:pan={e => end = e.detail} class="thumb" style={`left:${range[1]*100}%`}>
        <div class="thumb-content"/>
    </div>
</div>

Range: {range[0]*100}, {range[1]*100}

<style>
    .track { 
        margin: 24px;
        position: relative;               
        height: 8px;
        width: calc(100% - 48px);
        background: rgba(200, 200, 200, 0.5);
    }

    .range {
        position: absolute;   
        display: inline-block;
        top: -1px;
        height: 8px;
        min-width: 8px;
        background: #0077aa;
        border: 1px solid black;
    }

    .thumb {                            
        position: absolute;        
        display: inline-block;
        top: 4px;
		width: 0;
		height: 0;
    }

    .thumb-content {
        transform: translate(-50%, -50%);
        background: white;        
        width: 22px;
		height: 22px;
        border: 1px solid black;
        border-radius: 2px;
    }
</style>