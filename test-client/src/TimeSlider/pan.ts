import type {Action} from "./types";

export default function pan(node: HTMLElement, transform: any): ReturnType<Action> {    

    let active: boolean = false;
    let deltaX: number;

    const track: HTMLElement = node.parentElement;
    
    console.log(track);

    function onDown(event: MouseEvent) {
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);        
        active = true;
        var myLeft = node.getBoundingClientRect().left;
        deltaX = myLeft - event.clientX;
        node.dispatchEvent(new CustomEvent("panstart"));
    }

    function onMove(event: MouseEvent) {
        event.preventDefault();
        if (active) {            
            const pos = transform(event.clientX + deltaX);
            node.dispatchEvent(new CustomEvent("pan", {detail: pos}));            
        }
    }

    function onUp(event: MouseEvent) {                
        window.removeEventListener('mousemove', onMove);
		window.removeEventListener('mouseup', onUp);        
        active = false;
        node.dispatchEvent(new CustomEvent("panend"));
    }

    node.addEventListener("mousedown", onDown);

    return {
        destroy() {
            node.removeEventListener('mousedown', onDown);
        }
    };
}