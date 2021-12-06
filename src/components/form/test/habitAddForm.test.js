import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import HabitAddForm from "../habitAddForm";
import renderer from 'react-test-renderer'


describe('HabitAddForm', () => {

    it('renders', () => {
        //snapshot
        const component = renderer.create(<HabitAddForm onAdd ={jest.fn()} />);
        expect(component.toJSON()).toMatchSnapshot();
    })
    describe('Form submit', () => {
        let onAdd;
        let input;
        let button;

        beforeEach(() => {
        onAdd = jest.fn();
        render(<HabitAddForm onAdd = { onAdd } />);
            input = screen.getByPlaceholderText('Habit');
        button = screen.getByText('Add');

    })

    it('calls onAdd when button is clicked and vaild habit is entered', () => {
        userEvent.type(input, "New Habit");
        userEvent.click(button);

        expect(onAdd).toHaveBeenCalledWith('New Habit');
    })

    it('dose not call onAdd when the habit is empty', () => {
        userEvent.type(input, '');
        userEvent.click(button);

        expect(onAdd).toHaveBeenCalledTimes(0);
    })
})

   
})