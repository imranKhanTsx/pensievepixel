import { CanvasDraw } from "./CanvasClass";
import { arc2, point, pointsArray } from "./Interface";
import { drawArc, Rectangle } from "./Rectangle";

export class Frame {
    private ctx:CanvasRenderingContext2D;
    private x1:number;
    private y1:number;
    private x2:number;
    private y2:number;
    private shape:pointsArray;
    private allCordinate:{
        name: string;
        x: number;
        y: number;
    }[]
    private CanvasDraw:CanvasDraw;
    private allSquare:pointsArray=[];
    private suqareSize:{width:number,height:number};
    private circle:arc2;
    constructor(shape:pointsArray,ctx:CanvasRenderingContext2D,canvasDraw:CanvasDraw,space:number=10,squareSize:{width:number,height:number}={width:8,height:8}){
        this.CanvasDraw=canvasDraw;
        const {minPoints,maxPoints}=this.CanvasDraw.getMaxMin_points(shape);
        this.x1=minPoints.x-space;
        this.y1=minPoints.y-space;
        this.x2=maxPoints.x+space;
        this.y2=maxPoints.y+space;
        this.shape=shape;
        this.allCordinate = this.getAll_Cordinates(this.x1,this.y1,this.x2,this.y2);
        this.ctx=ctx;
        // setting up all the rectange of the frame
        this.suqareSize=squareSize;
        for (let i = 0; i < this.allCordinate.length; i++) {
            const cp= this.allCordinate[i];
            const px = cp.x-this.suqareSize.width/2;
            const py = cp.y-this.suqareSize.height/2;
            this.allSquare.push({x:px,y:py});
        }
        this.circle = {type:'arc',startPoint:{x:this.x1+(this.x2-this.x1)/2,y:this.y1-15},radius:4,counterClockWise:false,endAngle:0,startAngle:Math.PI*2};
    }
    updateShape(shape:pointsArray,space:number=10){
        this.shape = shape;
        const {minPoints,maxPoints}=this.CanvasDraw.getMaxMin_points(shape);
        this.x1=minPoints.x-space;
        this.y1=minPoints.y-space;
        this.x2=maxPoints.x+space;
        this.y2=maxPoints.y+space;
        this.allCordinate = this.getAll_Cordinates(this.x1,this.y1,this.x2,this.y2);
        
        this.allSquare=[]
        for (let i = 0; i < this.allCordinate.length; i++) {
            const cp= this.allCordinate[i];
            const px = cp.x-this.suqareSize.width/2;
            const py = cp.y-this.suqareSize.height/2;
            this.allSquare.push({x:px,y:py});
        }
        this.circle = {type:'arc',startPoint:{x:this.x1+(this.x2-this.x1)/2,y:this.y1-15},radius:4,counterClockWise:false,endAngle:0,startAngle:Math.PI*2};
    }
    checkFrameCorner(e:MouseEvent){
        const {clientX,clientY}=e;
        for (let i = 0; i < this.allSquare.length; i++) {
            const {x,y}=this.allSquare[i];
            const check = this.CanvasDraw.IsMouseInsideReact({x:clientX,y:clientY},{x,y,w:this.suqareSize.width,h:this.suqareSize.height});
            if (check) {
                return i;
            }
        }
        const {startPoint,radius}=this.circle;
        const dist = Math.hypot(e.clientX-startPoint.x,e.clientY-startPoint.y);
        if (dist<=radius) {
            return 4;
        }
    }
    drawFrame(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x1,this.y1);
        for (let i = 1; i < this.allCordinate.length; i++) {
            const p = this.allCordinate[i];
            this.ctx.lineTo(p.x,p.y);
        }
        this.ctx.closePath();
        this.ctx.strokeStyle='rgba(144, 99, 231, 1)'
        this.ctx.lineWidth=1;
        this.ctx.stroke();
        this.ctx.restore();

        
        drawArc(this.circle,this.ctx,{strokeStyle:'white',fillStyle:'black'});

        this.ctx.save();
        for (let i = 0; i < this.allSquare.length; i++) {
            const {x,y}=this.allSquare[i];
            const lx = x+this.suqareSize.width;
            const ly = y+this.suqareSize.height;
            const newRect = new Rectangle(x,y,lx,ly,2);
            newRect.strokeColor='white';
            newRect.draw(this.ctx);
        }
        this.ctx.restore();

    }
    getAll_Cordinates(x1:number,y1:number,x2:number,y2:number){
        return [
            {name:'tl',x:x1,y:y1},
            {name:'tr',x:x2,y:y1},
            {name:'br',x:x2,y:y2},
            {name:'bl',x:x1,y:y2}
        ]
    }

}