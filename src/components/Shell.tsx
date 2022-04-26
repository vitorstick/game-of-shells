import React, { FC, useEffect, useState } from 'react';
import { ShellInterface } from '../models/shell.interface';
import './Shell.scss';

interface Props {
  shell: ShellInterface | null;
  onOpenShell?: (id: number) => void;
}

const Shell: FC<Props> = (props) => {
  const [shell, setShell]: [ShellInterface | null, any] = useState(props.shell);

  useEffect(() => {
    setShell(props.shell);
  }, [props.shell]);

  const openShell = (): void => {
    console.log('openShell');
    if (props.onOpenShell && shell && shell.isOpen === false) {
      props.onOpenShell(shell.id);
    }
  };

  return (
    <div className={`shell ${shell?.isOpen ? 'shell--open' : ''}`}>
      <div
        className={`shell__container ${shell?.isOpen ? 'disabled' : ''}`}
        onClick={() => openShell()}
      ></div>

      <div className='shell__ball'>
        {shell?.isOpen && shell?.hasBall && (
          <div className='shell__ball--has'></div>
        )}
      </div>
    </div>
  );
};

export default Shell;
