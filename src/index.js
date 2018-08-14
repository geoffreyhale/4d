import MyChart from './components/chart';
import Point from './components/point';

const points = [];
points.push(new Point(1,2,3,4));
// points.push(new Point(5,6,7,8));
// points.push(new Point(9,0,1,2));

const redPoint = new Point(5,6,7,8);

let curDim = 'w';

const handleKeydown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        points[0][curDim] = (points[0][curDim] + 1) % 10;
    }
    else if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault();
        points[0][curDim] = (points[0][curDim] - 1 + 10) % 10;
    }
    else if (e.key === 'ArrowRight' || e.key === 'd') {
        e.preventDefault();
        if (curDim === 'w') {
            curDim = 'x';
        } else if (curDim === 'x') {
            curDim = 'y';
        } else if (curDim === 'y') {
            curDim = 'z';
        } else {
            curDim = 'w';
        }
    }
    else if (e.key === 'ArrowLeft' || e.key === 'a') {
        e.preventDefault();
        if (curDim === 'w') {
            curDim = 'z';
        } else if (curDim === 'z') {
            curDim = 'y';
        } else if (curDim === 'y') {
            curDim = 'x';
        } else {
            curDim = 'w';
        }
    }
};

Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0,
        max: 9
    }
});

window.onload = function() {
    document.addEventListener("keydown", handleKeydown);

    const draw = (points) => {
        // console.log(points);

        document.getElementById('wQty').innerHTML = points[0].w;
        document.getElementById('xQty').innerHTML = points[0].x;
        document.getElementById('yQty').innerHTML = points[0].y;
        document.getElementById('zQty').innerHTML = points[0].z;

        const axisPairs = [['w','x'],['w','y'],['w','z'],['x','y'],['x','z'],['y','z']];

        axisPairs.forEach((p) => {
            new MyChart(
                p[0]+p[1]+'Chart', // element id
                [
                    points.map((point) => { return {x: point[p[0]], y: point[p[1]]} }),
                    [redPoint].map((point) => { return {x: point[p[0]], y: point[p[1]]} }),
                ], // x y data
                p[0], // x axis
                p[1] // y axis
            );
        });

        document.getElementById('wQty').classList.remove('active');
        document.getElementById('xQty').classList.remove('active');
        document.getElementById('yQty').classList.remove('active');
        document.getElementById('zQty').classList.remove('active');

        document.getElementById(curDim + 'Qty').className += 'active';
    };

    const mainLoop = () => {
        // update();
        draw(points);
        requestAnimationFrame(mainLoop);
    };

    requestAnimationFrame(mainLoop);
};