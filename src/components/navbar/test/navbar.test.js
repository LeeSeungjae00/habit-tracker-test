import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'
import Navbar from '../navbar';

describe('navber', () => {
    const totalCount = 10;
    let navbarComponent;

    beforeEach(() => {
        navbarComponent = (<Navbar totalCount={totalCount} />);
    })
    it('renders', () => {
        const component = renderer.create();
        expect(component.toJSON).toMatchSnapshot();
    })

    it('totalCount is show navbar count', () => {
        render(navbarComponent);
        const span = screen.getAllByText(totalCount);
        expect(span).toHaveLength(1);
    })
})