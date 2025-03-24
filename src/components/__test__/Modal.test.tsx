import { render, screen, fireEvent } from "@testing-library/react";
import Modals from "../Modal";

describe("Modal component", () => {
  it("renders modal component", () => {
    render(
      <Modals
        open={true}
        handleClose={jest.fn()}
        //addTask={jest.fn()}
      />
    );

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("shows an alert when required fields are missing", () => {
    window.alert = jest.fn(); 

    render(
      <Modals
        open={true}
        handleClose={jest.fn()}
        //addTask={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("Submit"));

    expect(window.alert).toHaveBeenCalledWith("Please fill all fields");
  });

  it("submits the form with valid inputs and a file", () => {
    const mockAddTask = jest.fn();
    const mockHandleClose = jest.fn();
  
    render(
      <Modals
        open={true}
        handleClose={mockHandleClose}
        //addTask={mockAddTask}
      />
    );
  
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Task" },
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
    fireEvent.change(fileInput, { target: { files: [file] } } );
  
    
  
    fireEvent.click(screen.getByText("Submit"));
  
    expect(mockAddTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Task",
        description: "Task Description",
        dueDate: "2025-03-21",
        file: expect.any(File), 
      })
    );
  
    expect(mockHandleClose).toHaveBeenCalled();
  });
  
  
  it("submits the form with valid inputs and a file", () => {
    const mockAddTask = jest.fn();
    const mockHandleClose = jest.fn();
  
    render(
      <Modals
        open={true}
        handleClose={mockHandleClose}
        //addTask={mockAddTask}
      />
    );
     const file = new File(["dummy content"], "test-file.pdf", {
      type: "application/pdf",
    });
  
    const fileInput = screen.getByTestId("file-input");
    fireEvent.change(fileInput, { target: { files: [file] } } );
  
    
  
    fireEvent.click(screen.getByText("Submit"));
  
    
  
    
  });
  
});
