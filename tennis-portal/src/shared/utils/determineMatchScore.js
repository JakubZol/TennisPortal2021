export default ({ players, score }, userId) => {
    if(score) {
        const playerScoreIndex = players.some(({id}) => id === userId) ? 0 : 1;
        const opponentScoreIndex = playerScoreIndex === 0 ? 1 : 0;

        const sets = score.split(' ');
        const finalScoreBoard = sets.reduce((scoreBoard, set) => {
            const tieBreakScoreStartIndex = set.indexOf('(');
            const tieBreakScoreEndIndex = set.indexOf(')');

            const finalSetScore = tieBreakScoreEndIndex > -1 && tieBreakScoreStartIndex > -1 ? set.slice(0, tieBreakScoreStartIndex) + set.slice(tieBreakScoreEndIndex) : set;
            const setScoreBoard = finalSetScore.split('-');

            const playerWon = setScoreBoard[playerScoreIndex] > setScoreBoard[opponentScoreIndex];

            return {
                player: scoreBoard.player += playerWon ? 1 : 0,
                opponent: scoreBoard.opponent += playerWon ? 0 : 1,
            };
        }, {player: 0, opponent: 0});

        return finalScoreBoard.player > finalScoreBoard.opponent;
    }
    return undefined;
}
