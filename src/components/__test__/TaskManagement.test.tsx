import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskManagement from "../TasManagement/TaskManagement";


describe("TaskManagement Component", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem(
      "tasks",
      JSON.stringify([
        {
          id: "task-1",
          title: "New Task",
          description: "This is a test task",
          dueDate: "2025-03-20",
          section: "To Do",
          file: null,
        },
      ])
    );
    jest.restoreAllMocks();
    
 });

  test("renders the task board correctly", async () => {
    render(<TaskManagement />);

    expect(await screen.findByText("🔥 Task")).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(await screen.findByText("New Task")).toBeInTheDocument();
  });

  test("opens and closes the modal when clicking add task button", async () => {
    render(<TaskManagement />);

    const openButton = screen.getByTestId("openModal");
    fireEvent.click(openButton);

    expect(screen.getByTestId("closeModal")).toBeInTheDocument();

    const closeButton = screen.getByTestId("closeModal");
    fireEvent.click(closeButton);
  });

  test("adds a new task successfully", async () => {
    render(<TaskManagement />);

    fireEvent.click(screen.getByTestId("openModal"));

    const descInput = screen.getByPlaceholderText("Description");
    const submitButton = screen.getByText("Add Task");

    fireEvent.change(descInput, { target: { value: "Task Description" } });

    fireEvent.click(submitButton);
  });

  test("handles drag and drop correctly", async () => {
    render(<TaskManagement />);

    const taskCard = await screen.findByText("New Task");
    const targetColumn = screen.getByText("In Progress");

    fireEvent.dragStart(taskCard, {
      dataTransfer: {
        setData: jest.fn(),
      },
    });

    fireEvent.drop(targetColumn, {
      dataTransfer: {
        getData: () => "task-1",
      },
    });

    fireEvent.dragOver(targetColumn, {
      dataTransfer: {
        getData: () => "task-1",
      },
    });

    expect(await screen.findByText("New Task")).toBeInTheDocument();
  });

  it("shows an alert when movement is not allowed", async () => {
    render(<TaskManagement />);

    const taskCard = await screen.findByText("New Task");
    const invalidColumn = screen.getByText("Backlog");

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const taskManagementInstance = screen.getByText("🔥 Task").parentElement
      ?.parentElement?.parentElement as any;

    if (taskManagementInstance?.instance) {
      jest
        .spyOn(taskManagementInstance.instance, "canMoveTask")
        .mockReturnValue(false);
      
    }

    fireEvent.dragStart(taskCard, {
      dataTransfer: {
        setData: jest.fn(),
      },
    });

    fireEvent.drop(invalidColumn, {
      dataTransfer: {
        getData: () => "task-1",
      },
    });

    expect(alertMock).toHaveBeenCalledWith(
      "You cannot move this task to the selected section."
    );

    alertMock.mockRestore();
  });

  it("all data", () => {
    const screen = render(<TaskManagement />);
    const openButton = screen.getByTestId("openModal");
    fireEvent.click(openButton);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Due Date"), {
      target: { value: "2025-03-21" },
    });

   

   

    const file = new File(["dummy content"], "test-file.pdf", {
      type: "application/pdf",
    });

    const fileInput = screen.getByTestId("file-input");
    fireEvent.change(fileInput, { target: { files: [file] } });
    const subTestId = screen.getByTestId("subTest");
    fireEvent.click(subTestId);
    
  });

  it("else block", () => {
    const screen = render(<TaskManagement />);
    const openButton = screen.getByTestId("openModal");
    fireEvent.click(openButton);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Due Date"), {
      target: { value: "2025-03-21" },
    });

    const subTestId = screen.getByTestId("subTest");
    fireEvent.click(subTestId);
  });

  test("does not render task image if file is null", () => {
    
  
    render(<TaskManagement  />);
  
    
  });
  
});
