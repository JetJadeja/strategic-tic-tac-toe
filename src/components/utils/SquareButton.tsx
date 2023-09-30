import { Button } from '@chakra-ui/react';
import React from 'react';

// Define the prop types
interface SquareProps {
  value?: 'X' | 'O';
  winner?: 'X' | 'O';
  clickable?: boolean;
  onClick?: () => void;
}

const SquareButton: React.FC<SquareProps> = React.memo(
  ({ value, winner, clickable, onClick }) => {
    const style: React.CSSProperties = {};

    if (value) {
      style.color = value === 'X' ? '#fc7341' : '#2db2e2';
    }
    if (winner) {
      style.background = winner === 'X' ? '#ffccb5' : '#dbf5ff';
    }
    if (clickable) {
      style.background = '#e2ffec';
    }

    return (
      <Button className="square" style={style} onClick={onClick}>
        {value}
      </Button>
    );
  },
);

export default SquareButton;
