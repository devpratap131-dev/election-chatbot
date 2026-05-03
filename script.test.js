const { scenarios } = require('../script.js');

describe('Election Dashboard Logic', () => {
    test('Scenarios should exist and have questions', () => {
        expect(scenarios).toBeDefined();
        expect(scenarios.length).toBeGreaterThan(0);
        expect(scenarios[0].question).toContain('Scenario 1');
    });

    test('Each scenario should have at least one correct option', () => {
        scenarios.forEach(scenario => {
            const correctOptions = scenario.options.filter(opt => opt.correct === true);
            expect(correctOptions.length).toBe(1);
        });
    });
});
