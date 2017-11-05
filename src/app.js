const source = 'A';
const destination = 'C';

const nodes = {
    A: {
        B: 6,
        D: 1,
    },
    B: {
        A: 6,
        C: 5,
        D: 2,
        E: 2,
    },
    C: {
        B: 5,
        E: 5,
    },
    D: {
        A: 1,
        B: 2,
        E: 1,
    },
    E: {
        B: 2,
        C: 5,
        D: 1,
    },
};

const visitedVertex = [];
const unvisitedVertex = Object.keys(nodes);

const table = {};

for (const key in nodes) {
    table[key] = {
        vertex: key,
        distance: key === source ? 0 : Number.MAX_SAFE_INTEGER,
        previousVertex: null,
    };
}

while (unvisitedVertex.length > 0) {
    const smallestUnvisitedVertex = findSmallestUnvisitedVertex(table, unvisitedVertex);

    for (let key in nodes[smallestUnvisitedVertex.vertex]) {
        if (smallestUnvisitedVertex.distance + nodes[smallestUnvisitedVertex.vertex][key] < table[key].distance) {
            table[key].distance = smallestUnvisitedVertex.distance + nodes[smallestUnvisitedVertex.vertex][key];
            table[key].previousVertex = smallestUnvisitedVertex.vertex;
        }
    }

    visitedVertex.push(smallestUnvisitedVertex.vertex);

    const index = unvisitedVertex.indexOf(smallestUnvisitedVertex.vertex);
    if (index != -1) {
        unvisitedVertex.splice(index, 1);
    }
}

const shortestDistance = table[destination].distance;
const shortestPath = [destination];
let vertex = destination;

while (vertex !== source) {
    vertex = table[vertex].previousVertex;
    
    shortestPath.push(vertex);
}

shortestPath.reverse();

console.log({
    path: shortestPath,
    distance: shortestDistance,
});


function findSmallestUnvisitedVertex(table, unvisitedVertex) {
    let vertex = {
        vertex: null,
        distance: Number.MAX_SAFE_INTEGER,
        previousVertex: null,
    };

    for (const key in table) {
        if (unvisitedVertex.indexOf(key) > -1 && table[key].distance < vertex.distance) {
            vertex = table[key];
        }
    }

    return vertex;
}