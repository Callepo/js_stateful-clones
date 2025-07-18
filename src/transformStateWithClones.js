'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        for (const data in action.extraData) {
          currentState[data] = action.extraData[data];
        }

        stateHistory.push({ ...currentState });
        continue;
      case 'removeProperties':
        for (const data of action.keysToRemove) {
          delete currentState[data];
        }

        stateHistory.push({ ...currentState });
        continue;
      case 'clear':
        Object.keys(currentState).forEach((key) => {
          delete currentState[key];
        });

        stateHistory.push({ ...currentState });
        continue;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
