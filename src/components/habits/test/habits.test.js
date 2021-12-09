import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import Habits from "../habits";

describe('habits', () => {
    const habits = [
        { id: 1, name: 'reading', count: 4 },
        { id: 2, name: 'Running', count: 0 }
    ];
    let onIncrement;
    let onDecrement;
    let onDelete;
    let onAdd;
    let onReset;
    let habitsComponent;
    beforeEach(() => {
        onIncrement = jest.fn();
        onDecrement = jest.fn();
        onDelete = jest.fn();
        onAdd = jest.fn();
        onReset = jest.fn();

        habitsComponent = (<Habits 
            habits = {habits}
            onIncrement = {onIncrement}
            onDecrement = {onDecrement}
            onDelete = {onDelete}
            onAdd = {onAdd}
            onReset = {onReset}
        />)
    })
    it('render', () => {
        let component = renderer.create(habitsComponent);
        expect(component.toJSON()).toMatchSnapshot();
    })
    describe('button', () => {
        beforeEach(() => {
            render(habitsComponent);
        })
        it('call on Add when clicking the "add" button' ,() => {
            const input = screen.getByPlaceholderText('Habit');
            const button = screen.getByText('Add');
            const newHabit = 'New Habit';
            userEvent.type(input, newHabit);
            userEvent.click(button);
            expect(onAdd).toHaveBeenCalledWith(newHabit);
        })
        it('calls onIncrement when clicking the "increase" button', () => {
            const button = screen.getAllByTitle('increase')[0];
            userEvent.click(button);
            expect(onIncrement).toHaveBeenCalledWith(habits[0]);
        })
        it('calls onDecrement when clicking the "decrement" button', () => {
            const button = screen.getAllByTitle('decrease')[0];
            userEvent.click(button);
            expect(onDecrement).toHaveBeenCalledWith(habits[0]);
        })
        it('calls onDelete when clicking the "delete" button', () => {
            const button = screen.getAllByTitle('delete')[0];
            userEvent.click(button);
            expect(onDelete).toHaveBeenCalledWith(habits[0]);
        })
        it('calls onDelete when clicking the "reset" button', () => {
            const button = screen.getByText('Reset All');
            userEvent.click(button);
            expect(onReset).toHaveBeenCalledTimes(1);
        })
    })
    
})