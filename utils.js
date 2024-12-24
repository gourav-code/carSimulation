function lerp( a, b, t){
    return a + (b-a)*t;
}
function distance(fixedPoint, carPoint){
    return Math.sqrt((fixedPoint[0] - carPoint[0])**2 + (fixedPoint[1] - carPoint[1])**2);   
}

function lineSegmentCircleIntersection(p1, p2, circle) {
    // Line segment direction vector
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const h = circle[0];
    const k = circle[1];
    const radius = circle[2];
  
    // Quadratic coefficients
    const A = dx * dx + dy * dy;
    const B = 2 * (dx * (p1.x - h) + dy * (p1.y - k));
    const C = (p1.x - h) ** 2 + (p1.y - k) ** 2 - radius ** 2;
  
    // Discriminant
    const discriminant = B * B - 4 * A * C;
  
    if (discriminant < 0) {
      // No intersection
      return null;
    }
    
    // const dist1 = distance([p1.y, p1.x], [h,k]);
    // const dist2 = distance([p2.y, p2.x], [h,k]);
    // Calculate t values for intersection points
    const t1 = (-B - Math.sqrt(discriminant)) / (2 * A);
    const t2 = (-B + Math.sqrt(discriminant)) / (2 * A);
  
    
  
    // Check if t1 is within the segment
    if (t1 >= 0 && t1 <= 1) {
        const intersectPoint = {
            x: p1.x + t1 * dx,
            y: p1.y + t1 * dy,
        }
        return {
            x: intersectPoint.x,
            y: intersectPoint.y,
            offset: distance([intersectPoint.x,intersectPoint.y], [p1.x, p1.y])
        };
    }
  
    // Check if t2 is within the segment
    if (t2 >= 0 && t2 <= 1) {
        const intersectPoint = {
            x: p1.x + t2 * dx,
            y: p1.y + t2 * dy,
        }
        return {
            x: intersectPoint.x,
            y: intersectPoint.y,
            offset: distance([intersectPoint.x,intersectPoint.y], [p1.x, p1.y])
        };
    }
  
    return null;
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

function polyRoadIntersect(poly1, roadBorder){
    for(let i=0; i< poly1.length; ++i){
        if (lineSegmentCircleIntersection(
            poly1[i], poly1[(i+1)%poly1.length],
            roadBorder
        )){
            return true;
        }
    }

    return false;
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