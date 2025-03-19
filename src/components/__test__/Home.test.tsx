import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";
import { regionalRankings } from "../Rank";

describe("Home Component", () => {
  it("renders the Home component", () => {
    render(<Home />);
    const leaderboard = screen.getByTestId("leaderboard");
    expect(leaderboard).toBeInTheDocument();
  });

  it("displays the default selected region", () => {
    render(<Home />);
    const regionButton = screen.getByRole("button", { name: /NW/i });
    expect(regionButton).toBeInTheDocument();
  });

  it("opens the region dropdown menu when clicked", () => {
    render(<Home />);
    const regionButton = screen.getByRole("button", { name: /NW/i });

    fireEvent.click(regionButton);
    expect(screen.getByText(/Northwest/)).toBeInTheDocument();
  });

  it("changes the selected region when a new one is clicked", () => {
    render(<Home />);
    const regionButton = screen.getByRole("button", { name: /NW/i });

    fireEvent.click(regionButton);
    const newRegion = screen.getByText(/Southwest/);
    fireEvent.click(newRegion);

    expect(screen.getByRole("button", { name: /SW/i })).toBeInTheDocument();
  });

  it("displays podium rankings for the selected region", async () => {
    render(<Home />);
    
    await waitFor(() => {
      const topThree = regionalRankings
        .filter((user) => user.region === "NW")
        .sort((a, b) => b.points - a.points)
        .slice(0, 3);

      topThree.forEach((player) => {
        expect(screen.getByText(player.name)).toBeInTheDocument();
      });
    });
  });

  it("displays rankings beyond the top three", async () => {
    render(<Home />);

    await waitFor(() => {
      const otherPlayers = regionalRankings
        .filter((user) => user.region === "NW")
        .sort((a, b) => b.points - a.points)
        .slice(3);

      otherPlayers.forEach((player) => {
        expect(screen.getByText(player.name)).toBeInTheDocument();
      });
    });
  });
});
