from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, Any] = {}
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    source: str
    target: str
    id: str = ""

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Validates if the pipeline is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    Returns False if:
    - Any edge references a node ID not present in nodes
    - The graph contains a cycle
    """
    node_ids = {node.id for node in nodes}

    for edge in edges:
        if edge.source not in node_ids or edge.target not in node_ids:
            return False

    in_degree = defaultdict(int)
    adjacency_list = defaultdict(list)

    for node in nodes:
        in_degree[node.id] = 0

    for edge in edges:
        adjacency_list[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed = 0

    while queue:
        node_id = queue.popleft()
        processed += 1

        for neighbor in adjacency_list[node_id]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(request: PipelineRequest):
    num_nodes = len(request.nodes)
    num_edges = len(request.edges)
    is_valid_dag = is_dag(request.nodes, request.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_valid_dag
    }
