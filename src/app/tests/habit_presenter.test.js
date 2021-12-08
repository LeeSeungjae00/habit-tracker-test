import HabitPresenter from "../habit_presenter";

describe('HabitPresenter', () => {
    const habits = [
        { id: 1, name: 'reading', count: 1 },
        { id: 2, name: 'Running', count: 0 }
    ]
    let habitPresenter;
    let update;

    beforeEach(() => {
        update = jest.fn();
        habitPresenter = new HabitPresenter(habits, 3);
    })

    it('when habitPresenter init', () => {
        expect(habitPresenter.getHabits()).toEqual(habits)
    })

    it('increment habit count and call update callback', () => {
        habitPresenter.increment(habits[0], update);

        expect(habitPresenter.getHabits()[0].count).toBe(2);
        checkUpdateIsCalled();
    })

    it('decrement habit count and call update callback', () => {
        habitPresenter.decrement(habits[0], update);

        expect(habitPresenter.getHabits()[0].count).toBe(0);
        checkUpdateIsCalled();
    })

    it('dose not set the count value below 0 when decrements', () => {
        habitPresenter.decrement(habits[0], update);
        habitPresenter.decrement(habits[0], update);
        habitPresenter.decrement(habits[0], update);
        habitPresenter.decrement(habits[0], update);


        expect(habitPresenter.getHabits()[0].count).toBe(0);
    })

    function checkUpdateIsCalled() {
        expect(update).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledWith(habitPresenter.getHabits())
    }

    it('deletes ahbit from the list and call update call', () => {
        habitPresenter.delete(habits[0], update);

        expect(habitPresenter.getHabits().length).toBe(1);
        expect(habitPresenter.getHabits()[0].name).toBe('Running');
        checkUpdateIsCalled();
    })

    it('add habit object, and call update callback', () => {
        habitPresenter.add("testing", update);

        expect(habitPresenter.getHabits().length).toBe(3);
        expect(habitPresenter.getHabits()[2].name).toBe("testing");

        checkUpdateIsCalled();
    })

    it('throws an error when the max habits limit is exceeded', () => {
        habitPresenter.add("testing", update);
        expect(() => habitPresenter.add("Eating", update)).toThrow("습관의 갯수는 3 이상이 될 수 없습니다.")
    })


    describe('reset' , () => {
        it('reset all habit counts to 0', () => {
            habitPresenter.reset(update);
    
            expect(habitPresenter.getHabits()[0].count).toBe(0);
            expect(habitPresenter.getHabits()[1].count).toBe(0);
    
            checkUpdateIsCalled();
        })
        it('does not create new object when count is 0', () => {
            const habits = habitPresenter.getHabits();
            habitPresenter.reset(update);
            const updateHabits = habitPresenter.getHabits();
            expect(habits[1]).toBe(updateHabits[1])
        })

    })

})