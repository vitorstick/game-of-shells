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
      case GameStatusEnum.LOST:
        return (
          <button className='action__button' onClick={shuffle}>
            TRY AGAIN
          </button>
        );
      case GameStatusEnum.WON:
        return (
          <button className='action__button' onClick={shuffle}>
            RESTART
          </button>
        );
      case GameStatusEnum.START:
        return (
          <button className='action__button' onClick={start}>
            START
          </button>
        );
      case GameStatusEnum.ONGOING:
      default:
        return <div></div>;
    }
  };

  const labelSwitch = (): JSX.Element => {
    switch (gameStatus) {
      case GameStatusEnum.WON:
        return <div className='label__message'>You Won</div>;
      case GameStatusEnum.LOST:
        return <div className='label__message'>You Lost</div>;
      case GameStatusEnum.START:
      case GameStatusEnum.ONGOING:
      default:
        return <div className='label__message'></div>;
    }
  };

  return (
    <div className='game-status'>
      <div className='game-status__label'>{labelSwitch()}</div>
      <div className='game-status__actions'>{actionsSwitch()}</div>
    </div>
  );
};

export default GameStatus;
