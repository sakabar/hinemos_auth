const memoLogMemorizationValidation = require('../../src/validation/memoLogMemorization');
const assert = require('assert');
const { validationResult, } = require('express-validator');

describe('validation/memoLogMemorization.js', () => {
    describe('postProcess()', () => {
        it('正常系', async () => {
            const req = {
                body: {
                    logs: [
                        {
                            trialDeckId: '0',
                            userName: 'taro',
                            ind: '1',
                            deckInd: '2',
                            pairInd: '3',
                            posInd: '4',
                            deckElementId: '5',
                            memoSec: '6.0',
                        },
                    ],
                },
            };

            for (const fn of memoLogMemorizationValidation.postProcess) {
                await fn(req, {}, () => {});
            }
            const errors = validationResult(req);
            assert.deepStrictEqual(true, errors.isEmpty());
        });

        it('異常系: logsが空', async () => {
            const req = {
                body: {
                    logs: [],
                },
            };

            for (const fn of memoLogMemorizationValidation.postProcess) {
                await fn(req, {}, () => {});
            }
            const errors = validationResult(req);
            assert.deepStrictEqual(false, errors.isEmpty());
        });
    });
});
