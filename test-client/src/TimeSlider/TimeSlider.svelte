<script lang="ts">   
    import pan from "./pan";

    export let min: number;
    export let max: number;
    export let range: number[] = [1.33, 1.66];
    
    let start: number = range[0];
    let end: number = range[1];
    let scale: number;
    let trackNode: HTMLElement;

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
        if ((e >= min) && ((e + width) <= max)) {
            range[0] = e;
            range[1] = e + width;
        }        
    }

    function toPercent(r) {
        const width = max - min;
        return (r - min)/width * 100;        
    }

    $: clamp(min, max)    
    function clamp(min, max) {
        scale = max - min;
        console.log("scale", scale)
        setStart(start);
        setEnd(end);
    }

    function transform(pos: number): number {
        const {left, width} = trackNode.getBoundingClientRect();
        const value = (pos-left)/width*(max-min) + 1;

        console.log("width", width);
        console.log("left", left);
        console.log("pos", pos);
        console.log("value", value);
        console.log("maxmin", max - min);

        if (value > max) {
            return max;
        }
        else if (value < min) {
            return min;
        }

        return value;
    }

</script>

<div class="slider">
    <div on:click={e => min--} class="button left">◀</div>
    <div class="track" bind:this={trackNode}>
        <div use:pan={transform} on:pan={e => move(e.detail)} style={`left:${toPercent(range[0])}%;width:${toPercent(range[1])-toPercent(range[0])}%`} class="range"/>
        <div use:pan={transform} on:pan={e => start = e.detail} class="thumb" style={`left:${toPercent(range[0])}%`}>
            <div class="thumb-content"/>
        </div>
        <div use:pan={transform} on:pan={e => end = e.detail} class="thumb" style={`left:${toPercent(range[1])}%`}>
            <div class="thumb-content"/>
        </div>
    </div>
    <div on:click={e => max++} class="button right">▶</div>
</div>

<p>
    Range: {range[0]}, {range[1]}
</p>    
<p>
    Min/Max: {min}, {max}
</p>

<style>
    .slider {
        position: relative;                               
    }

    .button {
        font-size: 24px;
        color: rgba(200, 200, 200, 0.5);
        position: absolute;   
        top: -12px;
        height: 24px;
        -webkit-user-select: none;
    }

    .left {
        left: 0;
    }

    .right {
        right: 0;
    }

    .track {                 
        margin: 30px;
        position: relative;               
        height: 8px;
        width: calc(100% - 60px);
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