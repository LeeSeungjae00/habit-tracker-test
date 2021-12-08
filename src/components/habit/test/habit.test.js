import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import Habit from '../habit';

describe('habit', () => {
    const habit = { count: 0, id: 10, name: 'testing' }
    let onIncrement;
    let onDecrement;
    let onDelete;
    let HabitComponent;
    beforeEach(() => {
        onIncrement = jest.fn();
        onDecrement = jest.fn();
        onDelete = jest.fn();
        HabitComponent = (<Habit
            habit={habit}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
        />)

    })
    it('renders', () => {
        const component = renderer.create(HabitComponent);
        expect(component.toJSON).toMatchSnapshot();
    })
    describe('button click', () => {
        beforeEach(() => {
            render(HabitComponent);
        })
        it('call on Increment when click + button', () => {
            const button = screen.getByTitle('increase');
            userEvent.click(button);
            expect(onIncrement).toHaveBeenCalledWith(habit)
        })
        it('call on Increment when click - button', () => {
            const button = screen.getByTitle('decrese');
            userEvent.click(button);
            expect(onDecrement).toHaveBeenCalledWith(habit)
        })
        it('call on Increment when click trash button', () => {
            const button = screen.getByTitle('delete');
            userEvent.click(button);
            expect(onDelete).toHaveBeenCalledWith(habit)
        })
    })

})