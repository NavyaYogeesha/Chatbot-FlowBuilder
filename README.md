# Chatbot Flow Builder

## Overview

This project is a **Chatbot Flow Builder** developed using **React** and **React Flow** to visually design chatbot conversation flows.
The builder is designed to be **extensible** to support additional features and node types in the future.
A chatbot flow is created by connecting multiple nodes (messages) to control the order of execution.

### Key Technologies

- **React** with Vite + TypeScript
- **React Flow** for flow building and visualization ([React Flow Documentation](https://reactflow.dev/))

---

## Features

### 1. Text Node

- **Description**: The current version supports only one type of node, the **Text Message Node**.
- **Multiple Nodes**: Users can add multiple Text Nodes within a single flow.
- **Drag and Drop**: Text Nodes are added to the flow by dragging them from the **Nodes Panel** into the workspace.

### 2. Nodes Panel

- **Purpose**: This panel contains all node types supported by the flow builder.
- **Extensibility**: Currently, only the **Text Node** is available, but this section is designed to be easily extensible, allowing new types of nodes to be added in future updates.

### 3. Edge

- **Connection**: An Edge connects two nodes, defining the flow's sequence by linking source and target nodes.

### 4. Source Handle

- **Description**: The starting point for an edge.
- **Limitation**: Each Source Handle can only have one outgoing edge.

### 5. Target Handle

- **Description**: The endpoint for an edge.
- **Feature**: A Target Handle can accept multiple incoming edges.

### 6. Settings Panel

- **Purpose**: The **Settings Panel** allows users to edit node-specific settings.
- **Behavior**: The Settings Panel replaces the Nodes Panel when a node is selected.
- **Editable Fields**: Currently, it provides a text field to edit the content of the selected Text Node.

### 7. Save Button

- **Function**: Saves the current flow configuration.
- **Error Handling**: If there are multiple nodes and one or more nodes lack target connections, an error message will be displayed upon save attempt.

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/chatbot-flow-builder.git
   cd chatbot-flow-builder
   ```
2. **Install Dependencies:**:
   ```npm install```
3. **Run the Application:**:
   ```npm run dev```
