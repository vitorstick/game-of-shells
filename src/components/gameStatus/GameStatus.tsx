import React, { FC, useEffect, useState } from 'react';
import { GameStatusEnum } from '../../models/game-status.enum';
import './GameStatus.scss';

interface Props {
  status: GameStatusEnum | null;
  onStart?: () => void;
  onShuffle?: () => void;
}

const GameStatus: FC<Props> = (props) => {
  const [gameStatus, setGameStatus]: [GameStatusEnum | null, any] = useState(
    props.status
  );

  useEffect(() => {
    setGameStatus(props.status);
  }, [props.status]);

  const start = (): void => {
    props.onStart && props.onStart();
  };
  const shuffle = (): void => {
    props.onShuffle && props.onShuffle();
  };

  const actionsSwitch = (): JSX.Element => {
    switch (gameStatus) {
      case GameStatusEnum.ONGOING:
      case GameStatusEnum.LOST:
      case GameStatusEnum.WON:
        return <button onClick={shuffle}>RESTART</button>;
      case GameStatusEnum.START:
      default:
        return <button onClick={start}>START</button>;
    }
  };

  return (
    <div className='game-status'>
      <div className='game-status__actions'>{actionsSwitch()}</div>
    </div>
  );
};

export default GameStatus;
