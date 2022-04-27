import React, { FC, Fragment, useEffect, useState } from 'react';
import './ShellsContainer.scss';
import { ShellInterface } from '../models/shell.interface';
import Shell from '../components/shell/Shell';
import { GameStatusEnum } from '../models/game-status.enum';
import GameStatus from '../components/gameStatus/GameStatus';

const ShellsContainer: FC = () => {
  // INITIAL STATE
  const initialShells: ShellInterface[] = [
    {
      id: 0,
      hasBall: false,
      isOpen: false,
    },
    {
      id: 1,
      hasBall: false,
      isOpen: false,
    },
    {
      id: 2,
      hasBall: false,
      isOpen: false,
    },
  ];

  const [shells, setShells]: [ShellInterface[], any] = useState(initialShells);
  const [gameStatus, setGameStatus]: [GameStatusEnum | null, any] =
    useState(null);

  useEffect(() => {
    setGameStatus(GameStatusEnum.START);
  }, []);

  const start = (): void => {
    setGameStatus(GameStatusEnum.ONGOING);
    shuffleShells();
  };

  const openShell = (id: number) => {
    const newShells = shells.map((shell: ShellInterface) => {
      if (shell.id === id) {
        shell.isOpen = true;

        setStatus(shell);
      }
      return shell;
    });
    setShells([...newShells]);
  };

  const shuffleShells = (): void => {
    const chosenShells = getRandomInt(0, 2);
    const newShells = shells.map((shell: ShellInterface, index: number) => {
      shell.isOpen = false;
      shell.hasBall = false;
      if (index === chosenShells) {
        shell.hasBall = true;
      }
      return shell;
    });
    setShells([...newShells]);
    setGameStatus(GameStatusEnum.ONGOING);
  };

  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const setStatus = (shell: ShellInterface) => {
    // only if is ongoing
    if (gameStatus === GameStatusEnum.ONGOING) {
      if (shell.hasBall) {
        setGameStatus(GameStatusEnum.WON);
      } else {
        setGameStatus(GameStatusEnum.LOST);
      }
    }
  };

  return (
    <div className='shells-container'>
      {gameStatus !== GameStatusEnum.START && (
        <div className='shells-container__shells'>
          {shells.map((shell) => (
            <Fragment key={shell.id}>
              <Shell shell={shell} onOpenShell={openShell} />
            </Fragment>
          ))}
        </div>
      )}

      <Fragment>
        <div className='shells-container__status'>
          <GameStatus
            status={gameStatus}
            onStart={start}
            onShuffle={shuffleShells}
          />
        </div>
      </Fragment>
    </div>
  );
};

export default ShellsContainer;
