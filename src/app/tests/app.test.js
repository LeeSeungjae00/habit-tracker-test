import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import App from "../app";
import HabitPresenter from "../habit_presenter";

describe('app', () => {
    let presenter;
    beforeEach(() => {
        presenter = new HabitPresenter([
            { id: 1, name: "Reading", count: 0 },
            { id: 2, name: "Running", count: 0 },
            { id: 3, name: "Coding", count: 1 },
        ]);
    });
    it("render", () => {
        let component = renderer.create(<App presenter={presenter} />);
        expect(component.toJSON()).toMatchSnapshot();


    });
    describe('Component', () => {
        beforeEach(() => {
            render(<App presenter={presenter}></App>)
        })
        it('counts only active habits', () => {
            const button = screen.getAllByTitle('increase')[0];
            userEvent.click(button);
            const count = screen.getByTestId('total-count');
            expect(count.innerHTML).toBe('2');
        })
        it('adds new item', () => {
            const input = screen.getByPlaceholderText('Habit');
            const button = screen.getByText('Add');

            userEvent.type(input , 'Testing');
            userEvent.click(button);

            const habitNames = screen.getAllByTestId('habit-name');
            const habitCount = screen.getAllByTestId('habit-count');

            expect(habitNames.length).toBe(4);
            expect(habitNames[3].innerHTML).toBe('Testing');
            expect(habitCount[3].innerHTML).toBe('0');
        })

        it('deletes an item', () => {
            const button = screen.getAllByTitle('delete');

            userEvent.click(button[0]);
            userEvent.click(button[1]);

            const habitNames = screen.getAllByTestId('habit-name');


            expect(habitNames.length).toBe(1);
            expect(habitNames[0].innerHTML).toBe("Coding");
        })

        it('increase an habit', () => {
            const button = screen.getAllByTitle('increase');

            for(let i = 0 ; i < 10 ; i++){
                userEvent.click(button[0]);
            }
            const habitCount = screen.getAllByTestId('habit-count');
            expect(habitCount[0].innerHTML).toBe('10');
            
        })

        it('decrease an habit', () => {
            const button = screen.getAllByTitle('decrease');

            for(let i = 0 ; i < 10 ; i++){
                userEvent.click(button[2]);
            }
            const habitCount = screen.getAllByTestId('habit-count');
            expect(habitCount[2].innerHTML).toBe('0');
            
        })

        it('reset', () => {
            const button = screen.getByText('Reset All');

            userEvent.click(button);

            const habitCount = screen.getAllByTestId('habit-count');

            habitCount.forEach((count) => {
                expect(count.innerHTML).toBe('0');
            })
        })
    })
});
