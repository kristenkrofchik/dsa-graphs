class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray) {
      this.addVertex(node);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for(let node of this.nodes) {
      if(node.adjacent === vertex) {
        this.removeEdge(node, vertex)
      }
    }
  }

  // this function returns an array of Node values using DFS
  /*depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);

    while(toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();

      for(let adjacent of currNode.adjacent) {
        if(!seen.has(adjacent)) {
          seen.add(adjacent);
          toVisitStack.push(adjacent);
        }
      }
    }
    let seenVals = [];
    for(let el of seen) {
      seenVals.push(el.value);
    }
    return seenVals;
  }*/

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // base case
      if (!vertex) {
        return null;
      }
      // visit node
      visited.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);

    while(toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();

      for(let adjacent of currNode.adjacent) {
        if(!seen.has(adjacent)) {
          toVisitQueue.push(adjacent);
          seen.add(adjacent);
        }
      }
    }
    let seenVals = [];
    for(let el of seen) {
      seenVals.push(el.value)
    }

    return seenVals;
  }
}

module.exports = {Graph, Node}