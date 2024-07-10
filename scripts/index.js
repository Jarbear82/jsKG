
/* Variables */
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let nextId = 0;
let nodes = [];
let selection = undefined;

/* Function Definitions */
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function newNode() {
    let node = {
        x: 100,
        y: 100,
        radius: 10,
        fillStyle: '#22cccc',
        strokeStyle: '#009999',
        selectedFill: '#88aaaa',
        id: nextId
        };
    nextId++;
    nodes.push(node);
    draw();
}

function clickNode(x, y)
{
    let node = {
        x: x,
        y: y,
        radius: 10,
        fillStyle: '#22cccc',
        strokeStyle: '#009999',
        selectedFill: '#88aaaa'
        };
    nodes.push(node);
    draw();
}

function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        context.beginPath();
        context.fillStyle = node.selected ? node.selectedFill : node.fillStyle;

        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
        context.strokeStyle = node.strokeStyle;
        context.fill();
        context.stroke();
    }
}

function isWithin(x, y) {
    return nodes.find(n => {
        return x > (n.x - n.radius) && 
            y > (n.y - n.radius) &&
            x < (n.x + n.radius) &&
            y < (n.y + n.radius);
    });
}

function moveSelection(mouse) {
    if (selection) {
        selection.x = mouse.x;
        selection.y = mouse.y;
        selection.moving = true;
        draw();
    }
}

function clickDown(mouse) {
    let target = isWithin(mouse.x, mouse.y);
    
    if (target) {
        selection = target;
        selection.selected = true;
    }
}

function clickUp(mouse) {
    if (!selection || !selection.moving) {
        newNode(mouse.x, mouse.y);
    }
    if (selection) {
        delete selection.moving;
        delete selection.selected;
    }
    selection = undefined;
    draw();
}

/* Code */

window.onresize = resize;
resize();

window.onmousemove = moveSelection;
window.onmousedown = clickDown;
window.onmouseup = clickUp;


