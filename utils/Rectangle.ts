import { arc2 } from "./Interface";

abstract class Shape {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;

    isInside(mouseX: number, mouseY: number): boolean {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }
}

// class Rectangle extends Shape {
//     // width: number;
//     // height: number;
//     angle: number = 0; // Rotation angle in radians

//     constructor(x: number, y: number, width: number, height: number) {
//         super(x, y,width,height);
//         // this.width = width;
//         // this.height = height;
//     }

//     // Method to rotate the rectangle
//     rotate(angle: number, centerX?: number, centerY?: number) {
//         if (centerX === undefined || centerY === undefined) {
//             centerX = this.x + this.width / 2;
//             centerY = this.y + this.height / 2;
//         }

//         this.angle = angle;

//         // Update the position to reflect rotation
//         // This will need to account for the new bounds of the rectangle
//         // Calculating new position based on rotation
//         const cosA = Math.cos(angle);
//         const sinA = Math.sin(angle);

//         const dx = this.x - centerX;
//         const dy = this.y - centerY;

//         this.x = centerX + dx * cosA - dy * sinA;
//         this.y = centerY + dx * sinA + dy * cosA;
//     }

//     // Method to draw the rotated rectangle
//     draw(ctx: CanvasRenderingContext2D) {
//         ctx.save();
//         ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
//         ctx.rotate(this.angle);
//         ctx.translate(-this.width / 2, -this.height / 2);

//         ctx.beginPath();
//         ctx.rect(0, 0, this.width, this.height);
//         ctx.stroke();
//         ctx.restore();
//     }
// }

export class Rectangle {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    radius: number;
    public fillColor: string;
    public strokeColor: string;
    public strokeWidth: number;
    constructor(x1: number, y1: number, x2: number, y2: number, radius: number) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.radius = radius;
        this.fillColor='black';
        this.strokeColor='black';
        this.strokeWidth=1;
    }
    draw(ctx: CanvasRenderingContext2D) {
        const { x1, y1, x2, y2, radius } = this;

        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        const actualRadius = Math.min(radius, width / 2, height / 2); // Ensure radius isn't too large

        ctx.beginPath();

        ctx.moveTo(x1 + actualRadius, y1);

        ctx.lineTo(x2 - actualRadius, y1);

        ctx.arcTo(x2, y1, x2, y1 + actualRadius, actualRadius);

        ctx.lineTo(x2, y2 - actualRadius);

        ctx.arcTo(x2, y2, x2 - actualRadius, y2, actualRadius);

        ctx.lineTo(x1 + actualRadius, y2);

        ctx.arcTo(x1, y2, x1, y2 - actualRadius, actualRadius);

        ctx.lineTo(x1, y1 + actualRadius);

        ctx.arcTo(x1, y1, x1 + actualRadius, y1, actualRadius);

        ctx.closePath();

        ctx.fillStyle = this.fillColor;
        ctx.fill();

        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.stroke();

    }
}

export function drawArc(arc: arc2,ctx:CanvasRenderingContext2D,obj:{
    fillStyle?: string,
    strokeStyle?: string}={}
) {
    const { startPoint, radius, startAngle, endAngle, counterClockWise } = arc;

    const fillStyle = obj.fillStyle || "rgba(120, 126, 167, 0.18)";
    const strokeStyle = obj.strokeStyle || 'rgba(0, 39, 248, 1)';

    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();

    ctx.arc(startPoint.x, startPoint.y, radius, startAngle, endAngle, counterClockWise);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}