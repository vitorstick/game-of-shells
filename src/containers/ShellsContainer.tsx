import React, { FC, Fragment, useState } from 'react';
import './ShellsContainer.scss';
import Shell from '../components/Shell';
import { ShellInterface } from '../models/shell.interface';

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
  const [loaded, setLoaded]: [boolean, any] = useState(false);

  const start = (): void => {
    setLoaded(true);
    shuffleShells();
  };

  const openShell = (id: number) => {
    const newShells = shells.map((shell: ShellInterface) => {
      if (shell.id === id) {
        shell.isOpen = true;
      }
      return shell;
    });
    setShells([...newShells]);
  };

  const shuffleShells = () => {
    console.log('shuffleShells');
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
  };

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className='shells-container'>
      {loaded ? (
        <Fragment>
          <div className='shells-container__shells'>
            {shells.map((shell) => (
              <Fragment key={shell.id}>
                <Shell shell={shell} onOpenShell={openShell} />
              </Fragment>
            ))}
          </div>
          <div className='shells-container__actions'>
            <button onClick={() => shuffleShells()}>RE-START</button>
          </div>
        </Fragment>
      ) : (
        <div className='shells-container__start'>
          <button onClick={start}>START</button>
        </div>
      )}
    </div>
  );
};

export default ShellsContainer;
