/*
 * surfaces.txt の内容を構造化したもの
 */

export class SurfaceDefinitionTree {
  readonly descript: SurfaceDescript;
  readonly surfaces: SurfaceDefinition[];
  readonly aliases:  { [aliasname: string]: number[]; }[];
  //regions: { [scopeID: number]: {[regionName: string]: ToolTipElement}; }; // 謎
  constructor(
    descript: SurfaceDescript=new SurfaceDescript(),
    surfaces: SurfaceDefinition[]=[],
    aliases: { [aliasname: string]: number[]; }[]=[]
  ){
    this.descript = descript;
    this.surfaces = surfaces;
    this.aliases  = aliases;
  }
}


export class SurfaceDescript {
  //version: number;
  //maxwidth: number;
  readonly collisionSort: string;
  readonly animationSort: string;
  constructor(collisionSort="ascend", animationSort="ascend"){
    this.collisionSort = collisionSort;
    this.animationSort = animationSort;
  }
}


export class SurfaceDefinition {
  //characters: { sakura: string; }; // 謎
  readonly points: {
    //centerx: number; centery: number; // SakuraAPI なにそれ
    basepos: { x: number | null, y: number | null };
  };
  readonly balloons: {
    char: { offsetX: number; offsetY: number }[];
    offsetX: number;
    offsetY: number;
  };
  readonly collisions: SurfaceCollision[];
  readonly animations: SurfaceAnimation[];
  readonly elements:   SurfaceElement[];
  constructor(
    elements:SurfaceElement[]=[],
    collisions:SurfaceCollision[]=[],
    animations:SurfaceAnimation[]=[],
    balloons: {
      char: { offsetX: number; offsetY: number }[];
      offsetX: number;
      offsetY: number;
    }={char: [], offsetX: 0, offsetY: 0},
    points:{
      basepos: { x: number|null, y: number|null }
    }={basepos: { x: null, y: null }
  }){
    this.elements   = elements;
    this.collisions = collisions;
    this.animations = animations;
    this.points     = points;
    this.balloons   = balloons;
  }
  getRegion(offsetX: number, offsetY: number): string {
    return getRegion(this.collisions, offsetX, offsetY);
  }
}

export class SurfaceElement {
  readonly type: string;
  readonly file: string;
  readonly x: number;
  readonly y: number;
  constructor(type: string, file: string, x=0, y=0){
    this.type = type;
    this.file = file;
    this.x = x;
    this.y = y;
  }
}

export class SurfaceCollision {
  readonly name: string;
  readonly type: string;
  constructor(type: string, name: string){
    this.name = name;
    this.type = type;
  }
}



export class SurfaceCollisionRect extends SurfaceCollision {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  constructor(name: string, left: number, top: number, right: number, bottom: number){
    super("rect", name);
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}

export class SurfaceCollisionEllipse extends SurfaceCollision {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  constructor(name: string, left: number, top: number, right: number, bottom: number){
    super("ellipse", name);
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}

export class SurfaceCollisionCircle extends SurfaceCollision {
  readonly centerX: number;
  readonly centerY: number;
  readonly radius: number;
  constructor(name: string, centerX: number, centerY: number, radius: number){
    super("circle", name);
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  }
}

export class SurfaceCollisionPolygon extends SurfaceCollision {
  readonly coordinates: { x: number; y: number; }[];
  constructor(name: string, coordinates:{ x: number; y: number; }[] ){
    super("polygon", name);
    this.coordinates = coordinates;
  }
}



export class SurfaceAnimation {
  readonly intervals: [string, number[]][]; // [command, args]
  readonly options: [string, number[]][]; // [command, args]
  readonly collisions: SurfaceCollision[];
  readonly patterns:   SurfaceAnimationPattern[];
  constructor(
    intervals:[string, number[]][] = [["never", []]],
    options:[string, number[]][]=[],
    collisions:SurfaceCollision[]=[],
    patterns:SurfaceAnimationPattern[]=[]  
  ){
    this.intervals = intervals;
    this.options = options;
    this.collisions = collisions;
    this.patterns = patterns;
  }
  isBack(): boolean{ return isBack(this); }
  getExclusives(): number[]{ return getExclusives(this); }
}

export class SurfaceAnimationPattern {
  readonly type: string;
  readonly surface: number;
  readonly wait: [number, number];
  readonly x: number;
  readonly y: number;
  readonly animation_ids: number[];
  constructor(
    type="ovelay",
    surface=-1,
    wait:[number, number]=[0, 0],
    x=0,
    y=0,
    animation_ids:number[]=[]
  ){
    this.type = type;
    this.surface = surface;
    this.wait = wait;
    this.x = x;
    this.y = y;
    this.animation_ids = animation_ids;
  }
}


function isBack(anim: SurfaceAnimation): boolean{
  return anim.options.some(([opt, args])=> opt === "background");
}


function getExclusives(anim: SurfaceAnimation): number[]{
  return anim.options.filter(([opt, args])=> opt === "exclusive").reduce<number[]>((l,[opt, args])=> l.concat(args), []);
}


function getRegion(collisions: SurfaceCollision[], offsetX: number, offsetY: number): string {
  // このサーフェスの定義 surfaceNode.collision と canvas と座標を比較して
  // collision設定されていれば name"hoge"
  // basepos 左上からの座標の位置が透明かそうでないか、当たり判定領域か、名前があるかを調べる
  // offsetX: number, offsetY: number は surfaceCanvas.basePosX からの相対座標である必要がある、間違ってもcanvas左上からにしてはいけない 

  const hitCols = collisions.filter((collision, colId)=>{
    const {type, name} = collision;
    switch(collision.type){
      case "rect":
        const {left, top, right, bottom} = <SurfaceCollisionRect>collision;
        return (left < offsetX && offsetX < right && top < offsetY && offsetY < bottom) ||
               (right < offsetX && offsetX < left && bottom < offsetX && offsetX < top);
      case "ellipse":
        const o = <SurfaceCollisionEllipse>collision;
        const width = Math.abs(o.right - o.left);
        const height = Math.abs(o.bottom - o.top);
        return Math.pow((offsetX-(o.left+width/2))/(width/2), 2) +
               Math.pow((offsetY-(o.top+height/2))/(height/2), 2) < 1;
      case "circle":
        const {radius, centerX, centerY} = <SurfaceCollisionCircle>collision;
        return Math.pow((offsetX-centerX)/radius, 2)+Math.pow((offsetY-centerY)/radius, 2) < 1;
      case "polygon":
        const {coordinates} = <SurfaceCollisionPolygon>collision;
        const ptC = {x:offsetX, y:offsetY};
        const tuples = coordinates.reduce<[{x:number,y:number},{x:number,y:number}][]>(((arr, {x, y}, i)=>{
          arr.push([
            coordinates[i],
            (!!coordinates[i+1] ? coordinates[i+1] : coordinates[0])
          ]);
          return arr;
        }), []);
        // TODO: acos使わない奴に変える
        const deg = tuples.reduce(((sum, [ptA, ptB])=>{
          const vctA = [ptA.x-ptC.x, ptA.y-ptC.y];
          const vctB = [ptB.x-ptC.x, ptB.y-ptC.y];
          const dotP = vctA[0]*vctB[0] + vctA[1]*vctB[1];
          const absA = Math.sqrt(vctA.map((a)=> Math.pow(a, 2)).reduce((a, b)=> a+b));
          const absB = Math.sqrt(vctB.map((a)=> Math.pow(a, 2)).reduce((a, b)=> a+b));
          const rad = Math.acos(dotP/(absA*absB));
          return sum + rad;
        }), 0);
        return deg/(2*Math.PI) >= 1;
      default:
        console.warn("SurfaceTree.getRegion: unkown collision type:", this.surfaceId, colId, name, collision);
        return false;
    }
  });
  if(hitCols.length > 0){
    return hitCols[hitCols.length-1].name;
  }
  return "";
}
