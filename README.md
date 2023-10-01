# Strategic Tic Tac Toe

This project is an implementation of the classic game of Tic Tac Toe, but with an additional strategic twist. In this version, you are not limited to playing in a single 3x3 grid, but rather a nine of them, arranged in a 3x3 format.

## Basics of the Game

The objective of Stategic Tic Tac Toe is the exact same as the traditional game -- to get three of your symbol in a row, whether that be horizontally, vertically, or diagonally. However, in this version, the game is played on a larger grid which consists of nine individual tic tac toe boards. 

During their turn, players place their symbol (either X or O) into empty spaces on one of the boards. The catch of this game is the fact that the opponent's decision determines the position of your move. For example, if your opponent places their symbol in the top-right corner of any small board, you must play your subsequent move in the top-right board of the large grid.

You can win an individual small tic tac toe board just like traditional Tic Tac Toe, and the goal is to win the larger 9x9 grid by winning three small boards in a row. 

## Setup

To get started with this project, follow the steps below:

1. Clone the repository:
   ```
   git clone https://github.com/JetJadeja/strategic-tic-tac-toe.git
   ```

2. Make sure you have Yarn installed on your machine. If not, you can install it by following the instructions at [Yarn Installation](https://classic.yarnpkg.com/en/docs/install).

3. Navigate to the cloned repository's directory:
   ```
   cd strategic-tic-tac-toe
   ```

4. Use Yarn to install the project dependencies:
   ```
   yarn
   ```

Congratulations! The project is now set up and ready to go.

## Running the Program

To run the Strategic Tic Tac Toe game, execute the following command:
```
yarn start
```

This command will start the game and display it at localhost:3000

## Credits

My code was inspired by [`ultimate-tic-tac-toe`](https://github.com/Minimuino/ultimate-tic-tac-toe-react/tree/master) by Minimuino. The style of the board was pretty much taken from their index.css file!
