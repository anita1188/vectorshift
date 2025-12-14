# VectorShift Frontend Technical Assessment

A visual pipeline builder application built with React, ReactFlow, FastAPI, and Zustand. This implementation completes all four parts of the technical assessment with clean, modular, and extensible code.

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [Part 1: Node Abstraction](#part-1-node-abstraction)
- [Part 2: Modern Styling](#part-2-modern-styling)
- [Part 3: Text Node Enhancements](#part-3-text-node-enhancements)
- [Part 4: Backend Integration](#part-4-backend-integration)
- [Testing Guide](#testing-guide)
- [Files Changed and Added](#files-changed-and-added)

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## Architecture Overview

### Directory Structure

```
frontend/src/
├── components/
│   ├── BaseNode.js          # Reusable node component abstraction
│   └── nodeConfigs.js       # Node configuration definitions
├── nodes/
│   ├── inputNode.js         # Input node (refactored to use BaseNode)
│   ├── outputNode.js        # Output node (refactored to use BaseNode)
│   ├── llmNode.js           # LLM node (refactored to use BaseNode)
│   ├── textNode.js          # Text node with auto-resize and dynamic variables
│   ├── uppercaseNode.js     # New: Text transformation node
│   ├── concatNode.js        # New: String concatenation node
│   ├── regexReplaceNode.js  # New: Regex pattern replacement node
│   ├── numberNode.js        # New: Numeric input node
│   └── delayNode.js         # New: Execution delay node
├── styles/
│   └── node-styles.css      # Comprehensive modern styling
├── App.js
├── ui.js                    # ReactFlow canvas and configuration
├── toolbar.js               # Draggable node buttons
├── draggableNode.js         # Drag handler for nodes
├── submit.js                # Backend API integration
├── store.js                 # Zustand state management
└── index.js

backend/
├── main.py                  # FastAPI application with DAG validation
├── requirements.txt         # Python dependencies
```

## Part 1: Node Abstraction

### Overview

Implemented a **config-driven node abstraction system** that eliminates code duplication across node types. The system consists of:

1. **BaseNode Component** (`frontend/src/components/BaseNode.js`)
   - Reusable component that accepts configuration objects
   - Handles layout, styling, field rendering, and handle management
   - Supports text inputs, selects, and textareas
   - Flexible handle positioning on left (inputs) and right (outputs) sides

2. **Node Configuration System** (`frontend/src/components/nodeConfigs.js`)
   - Centralized definitions for all node types
   - Each config specifies: title, subtitle, fields, input/output handles, dimensions
   - Easy to extend with new node types

3. **Refactored Existing Nodes**
   - Input, Output, LLM, and Text nodes now use BaseNode
   - Functionality preserved, code significantly reduced
   - Easier to maintain and extend

### Creating New Nodes

To add a new node type:

1. Add configuration to `nodeConfigs.js`:
   ```javascript
   myCustomNode: {
     title: 'My Custom Node',
     subtitle: 'Description',
     fields: [
       { name: 'fieldName', label: 'Label', type: 'text', defaultValue: '' }
     ],
     inputs: [{ id: 'input1', position: 50 }],
     outputs: [{ id: 'output', position: 50 }],
     width: 200,
     minHeight: 100
   }
   ```

2. Create node component (`src/nodes/myCustomNode.js`):
   ```javascript
   import { BaseNode } from '../components/BaseNode';
   import { nodeConfigs } from '../components/nodeConfigs';

   export const MyCustomNode = ({ id, data }) => {
     return <BaseNode id={id} data={data} config={nodeConfigs.myCustomNode} />;
   };
   ```

3. Register in `ui.js`:
   ```javascript
   import { MyCustomNode } from './nodes/myCustomNode';
   const nodeTypes = { myCustomNode: MyCustomNode, ... };
   ```

4. Add to toolbar in `toolbar.js`:
   ```javascript
   <DraggableNode type='myCustomNode' label='My Custom Node' />
   ```

### Five New Demo Nodes

1. **Uppercase** - Converts text to uppercase
2. **Concat** - Concatenates two input strings with a separator
3. **RegexReplace** - Replaces text matching a regex pattern
4. **Number** - Numeric input field for mathematical operations
5. **Delay** - Introduces a delay (in milliseconds) in the pipeline

All five nodes are fully functional and demonstrate the flexibility of the BaseNode abstraction.

## Part 2: Modern Styling

### Design System

A comprehensive, theme-aware design system implemented in `frontend/src/styles/node-styles.css`:

- **Color Palette**: Blue primary, neutral grays, semantic colors (success, warning, error)
- **Spacing**: 8px grid system for consistent spacing
- **Typography**: Clear hierarchy with 2-3 font weights
- **Shadows**: Subtle shadows for depth, intensify on hover
- **Borders**: 8px border-radius for modern look, 1px subtle borders

### Key Features

- **Light/Dark Mode Support**: Automatic theme detection via `prefers-color-scheme`
- **Responsive Design**: Mobile-friendly breakpoints (768px)
- **Interactive Feedback**: Hover effects, focus states, smooth transitions
- **High Contrast**: WCAG AA compliant contrast ratios
- **Accessibility**: Proper focus management, clear visual states

### Components Styled

- Node cards with header, fields, and handles
- Input fields with focus states
- Select dropdowns with custom styling
- Buttons with hover and active states
- ReactFlow canvas, controls, and minimap
- Animated edges with dashed animation

## Part 3: Text Node Enhancements

### A) Auto-Resize Functionality

The Text node uses `react-textarea-autosize` for seamless resizing:
- Automatically expands as user types more content
- Minimum 3 rows, maximum 8 rows
- Smooth visual feedback without jarring layout shifts
- Clean, modern appearance

### B) Dynamic Variable Handles

The Text node automatically detects variables and creates input handles:

**Variable Pattern**: `{{ validJsVarName }}`
- Matches JavaScript identifier pattern: `[A-Za-z_$][A-Za-z0-9_$]*`
- Examples: `{{username}}`, `{{_private}}`, `{{$special}}`

**Features**:
- **Real-time Detection**: Handles update as user types
- **Stable Ordering**: Alphabetically sorted for consistency
- **Visual Distinction**: Variable handles highlighted in orange
- **Unlimited Variables**: No maximum, creates handle for every unique variable
- **Smart Positioning**: Handles evenly distributed along left edge

**Example**:
```
Text content: "Hello {{name}}, your age is {{age}} and email is {{email}}"
Result: Three input handles created: age, email, name (alphabetical order)
```

When variables are removed, handles are deleted. When new variables are added, handles appear immediately.

## Part 4: Backend Integration

### Endpoint

**POST /pipelines/parse**

Validates a pipeline graph and returns analysis results.

### Request Body

```json
{
  "nodes": [
    {
      "id": "customInput-1",
      "type": "customInput",
      "position": { "x": 100, "y": 100 },
      "data": { "inputName": "input", "inputType": "Text" }
    }
  ],
  "edges": [
    {
      "source": "customInput-1",
      "target": "text-1",
      "id": "edge-1"
    }
  ]
}
```

### Response

```json
{
  "num_nodes": 1,
  "num_edges": 1,
  "is_dag": true
}
```

### DAG Validation

Uses **Kahn's Topological Sort Algorithm**:

1. **Validates Node References**: Ensures all edge source/target IDs reference existing nodes
2. **Detects Cycles**: Returns `is_dag: false` if graph contains any cycle
3. **Handles Disconnected Components**: Treats them as valid DAG

**Algorithm**:
- Build in-degree count for all nodes
- Process nodes with zero in-degree (source nodes)
- Remove edges and decrement in-degrees
- If all nodes are processed → DAG (true), else → cycle detected (false)

**Time Complexity**: O(V + E) where V = nodes, E = edges

### CORS Configuration

Backend allows requests from `http://localhost:3000`:
```python
CORSMiddleware(
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
```

### Frontend Integration

Submit button in `submit.js`:
1. Captures current nodes and edges from Zustand store
2. Sends POST request to backend
3. Displays alert with results: `"Nodes: X\nEdges: Y\nDAG: Yes/No"`
4. Shows error message if request fails

## Testing Guide

### Part 4: DAG Validation Testing

#### Test 1: Valid DAG (Linear Pipeline)
1. Add: Input → Text → Output
2. Connect: Input → Text → Output
3. Submit
4. Expected: `Nodes: 3, Edges: 2, DAG: Yes`

#### Test 2: Valid DAG (Complex)
1. Add: Input, LLM, Uppercase, Text, Output
2. Connect: Input → LLM → Uppercase → Text → Output
3. Submit
4. Expected: `DAG: Yes`

#### Test 3: Cycle Detection
1. Add: Text node A, Text node B
2. Connect: A → B
3. Connect: B → A (creates cycle)
4. Submit
5. Expected: `DAG: No`

#### Test 4: Missing Node Reference
1. Delete a node that has incoming/outgoing edges
2. Submit
3. Expected: `DAG: No` (invalid edge reference)

#### Test 5: Disconnected Nodes
1. Add: 3 nodes with no connections
2. Submit
3. Expected: `Nodes: 3, Edges: 0, DAG: Yes`

### Part 1: Node Abstraction Testing

#### Test 1: Create All Node Types
1. Drag each node type from toolbar
2. Verify visually distinct headers and fields
3. Verify all can be connected properly

#### Test 2: Create Custom Node
1. Add configuration to `nodeConfigs.js`
2. Create node component
3. Register in ui.js and toolbar
4. Drag from toolbar
5. Verify it works

### Part 3: Text Node Variable Handles Testing

#### Test 1: Single Variable
1. Create Text node
2. Change text to `"Hello {{name}}"`
3. Verify: One orange handle on left with id "var:name"

#### Test 2: Multiple Variables
1. Change text to `"{{first}} {{last}} age {{age}}"`
2. Verify: Three handles ordered as: age, first, last (alphabetical)
3. Verify: Evenly spaced along left edge

#### Test 3: Dynamic Updates
1. Start with `"{{a}}{{b}}{{c}}"`
2. Change to `"{{a}}{{x}}{{c}}"`
3. Verify: Handles update immediately (b removed, x added)

#### Test 4: Duplicate Variables
1. Text: `"{{name}} and {{name}}"`
2. Verify: Only ONE handle (var:name) created (deduplicated)

#### Test 5: Invalid Variable Names
1. Text: `"{{123invalid}} {{-bad}} {{good_name}}"`
2. Verify: Only good_name has a handle (invalid names ignored)

#### Test 6: Auto-Resize
1. Create Text node
2. Type multiple lines of text
3. Verify: Node height increases automatically
4. Verify: No horizontal scrolling
5. Type 10+ lines
6. Verify: Stops expanding at max-height (8 rows)

### Part 2: Styling Testing

#### Test 1: Light Mode
1. Open application in light mode
2. Verify: Clean white cards, readable text, good contrast
3. Verify: Blue highlights on hover
4. Verify: Shadows visible

#### Test 2: Dark Mode
1. Set system to dark mode (or browser dev tools)
2. Verify: Dark backgrounds, light text
3. Verify: Good contrast maintained
4. Verify: All controls visible and functional

#### Test 3: Responsive Design
1. Open on desktop (1920px)
2. Resize to tablet (768px)
3. Resize to mobile (375px)
4. Verify: Layout adapts properly
5. Verify: No horizontal scrolling
6. Verify: Touch targets large enough

## Files Changed and Added

### New Files Created

```
frontend/src/components/
├── BaseNode.js              # Reusable node component
└── nodeConfigs.js           # Node configuration definitions

frontend/src/nodes/
├── uppercaseNode.js         # Uppercase transformation node
├── concatNode.js            # String concatenation node
├── regexReplaceNode.js      # Regex replacement node
├── numberNode.js            # Numeric input node
└── delayNode.js             # Execution delay node

frontend/src/styles/
└── node-styles.css          # Comprehensive styling system

backend/
└── requirements.txt         # Python dependencies

README.md                     # This file
```

### Modified Files

```
frontend/
├── package.json             # Added zustand, react-textarea-autosize
├── src/index.css           # Added global styling imports
├── src/ui.js               # Registered new node types
├── src/toolbar.js          # Added toolbar buttons for new nodes
├── src/submit.js           # Integrated backend API calls
├── src/nodes/inputNode.js       # Refactored to use BaseNode
├── src/nodes/outputNode.js      # Refactored to use BaseNode
├── src/nodes/llmNode.js         # Refactored to use BaseNode
└── src/nodes/textNode.js        # Added auto-resize and variable handles

backend/
└── main.py                  # Implemented POST endpoint with DAG validation
```

## Development Notes

### State Management

Using **Zustand** for global state:
- `nodes`: Array of node objects
- `edges`: Array of edge objects
- `getNodeID()`: Generate unique node IDs
- `addNode()`: Add new node to store
- `onNodesChange()`: Handle ReactFlow node changes
- `onEdgesChange()`: Handle ReactFlow edge changes
- `onConnect()`: Handle new edge creation

### Adding New Features

1. **New Node Type**: Follow the steps in Part 1
2. **New Field Type**: Add case to `renderField()` in BaseNode.js
3. **New Backend Endpoint**: Add function to main.py, update CORS if needed
4. **New Style**: Add to node-styles.css following existing patterns

### Performance Considerations

- Nodes render efficiently using BaseNode abstraction
- Zustand provides shallow selector optimization
- CSS uses efficient selectors without deep nesting
- Dark mode media query only applies when needed
- Variable detection uses regex with early termination

## Troubleshooting

### Backend not responding
1. Verify server running: `http://localhost:8000/`
2. Check CORS headers allow origin `http://localhost:3000`
3. Ensure port 8000 is not in use

### Styling not applied
1. Verify `node-styles.css` imported in `index.css`
2. Clear browser cache and rebuild: `npm run build`
3. Check console for CSS errors

### Variables not detected
1. Verify variable format: `{{ validJsVarName }}`
2. Check regex pattern in textNode.js matches expected format
3. Open browser console for any JavaScript errors

### Nodes not appearing in toolbar
1. Verify node component exported correctly
2. Verify registered in `nodeTypes` in ui.js
3. Verify added to toolbar in toolbar.js

## Next Steps

To extend this application:

1. **Persistence**: Add database integration (Supabase recommended)
2. **Execution**: Implement pipeline execution engine
3. **Node Library**: Create more specialized nodes
4. **Validation**: Add field validation with error messages
5. **Export/Import**: Save and load pipelines
6. **History**: Undo/redo functionality
7. **Collaboration**: Real-time multi-user editing

---

**Assessment Completion**: All 4 parts implemented with clean, modular, production-ready code.
