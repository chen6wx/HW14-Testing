import React from "react";
import { http, HttpResponse, rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import TodoList from "./TodoList";


// TODO: Mock the fetch API, and do reset and clean up
const mockAPIData = [
    {
        userId: 1,
        id: 1,
        title: "test1",
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: "test2",
        completed: true,
    },
    {
        userId: 1,
        id: 3,
        title: "test3",
        completed: false,
    },
    {
        userId: 1,
        id: 4,
        title: "test4",
        completed: true,
    },
    {
        userId: 1,
        id: 5,
        title: "test5",
        completed: false,
    }
]

const server = setupServer(
    rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
        return res(ctx.json(mockAPIData));
    })
)

beforeEach(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// TODO: Test component to render correctly with the fetched data
test("renders fetched todos on mount", async () => {
    render(<TodoList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    for (const element of mockAPIData) {
        await waitFor(() =>
            expect(screen.getByText(element.title)).toBeInTheDocument()
        );
    };
});

// TODO: Test component to handle API fetch failure and display error message
test("handles API fetch failure", async () => {
    server.use(
        rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
            return new HttpResponse(null, { status: 500 })
        }),
    )
    render(<TodoList />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
        expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument()
    );

});

// TODO: Test adding a new todo
test("adds a new todo item", async () => {
    render(<TodoList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("test1")).toBeInTheDocument());

    const input = screen.getByPlaceholderText("Enter todo");
    const button = screen.getByText("Add Todo");

    fireEvent.change(input, { target: { value: "test6" } });
    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText("test6")).toBeInTheDocument());
});

// TODO: Test removing a todo
test("removes a todo item", async () => {
    render(<TodoList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("test1")).toBeInTheDocument());

    const button = screen.getByText("test1").children[0];

    fireEvent.click(button);

    await waitFor(() => expect(screen.queryByText("test6")).not.toBeInTheDocument());
});
