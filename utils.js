function lerp( a, b, t){
    return a + (b-a)*t;
}
function distance(fixedPoint, carPoint){
    return -1*((fixedPoint.y - carPoint.y)**2 + (fixedPoint.x - carPoint.x)**2);   
}

function lineSegmentCircleIntersection(p1, p2, h, k, radius) {
    // Line segment direction vector
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
  
    // Quadratic coefficients
    const A = dx * dx + dy * dy;
    const B = 2 * (dx * (p1.x - h) + dy * (p1.y - k));
    const C = (p1.x - h) ** 2 + (p1.y - k) ** 2 - radius ** 2;
  
    // Discriminant
    const discriminant = B * B - 4 * A * C;
  
    if (discriminant < 0) {
      // No intersection
      return [];
    }
  
    // Calculate t values for intersection points
    const t1 = (-B - Math.sqrt(discriminant)) / (2 * A);
    const t2 = (-B + Math.sqrt(discriminant)) / (2 * A);
  
    const points = [];
  
    // Check if t1 is within the segment
    if (t1 >= 0 && t1 <= 1) {
      points.push({
        x: x1 + t1 * dx,
        y: y1 + t1 * dy,
      });
    }
  
    // Check if t2 is within the segment
    if (t2 >= 0 && t2 <= 1) {
      points.push({
        x: x1 + t2 * dx,
        y: y1 + t2 * dy,
      });
    }
  
    return points;
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function polysIntersect(poly1, poly2){
    for (let i=0; i< poly1.length; ++i){
        for (let j=0; j<poly2.length; ++j){
            if (getIntersection(
                poly1[i], poly1[(i+1)%poly1.length],
                poly2[j], poly2[(j+1)%poly2.length]
            )){
                return true;
            }
        }
    }
        
    return false;    
}