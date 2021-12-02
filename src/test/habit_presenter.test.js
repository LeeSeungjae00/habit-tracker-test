import HabitPresenter from "../habit_presenter";

describe('HabitPresenter', () => {
    let habitPresenter;

    beforeEach(() => {
        habitPresenter = new HabitPresenter([
            { id: 1, name: 'Reading', count: 0 },
            { id: 2, name: 'Running', count: 0 },
            { id: 3, name: 'Coding', count: 0 },
        ]);
    })
})