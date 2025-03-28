import { fireEvent, render, screen } from "@testing-library/react";
import Main from "../Main";
import { MemoryRouter } from "react-router";

describe("Main component", () => {
  it("renders Main component", () => {
      const mockNavigate = jest.fn();
    
     const screen= render(
        <MemoryRouter>
          <Main /> 
        </MemoryRouter>
      );
      const sidebar=screen.getByTestId("sidebar")
      fireEvent.click(sidebar)
      expect(sidebar).toBeInTheDocument()
  });
});