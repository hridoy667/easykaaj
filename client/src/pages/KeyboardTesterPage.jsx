import { useState, useEffect } from 'react';

export default function KeyboardTesterPage() {
  // Windows 104-key style layout rows
  const keyboardRows = [
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'PrtSc', 'ScrollLock', 'Pause'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Insert', 'Home', 'PageUp'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Delete', 'End', 'PageDown'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', '↑'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl', '←', '↓', '→'],
  ];
  useEffect(() => {
    // Disable common browser shortcuts on this page
    const handleShortcut = (event) => {
      // List of blocked key combos (Ctrl or Meta + key)
      const blockedKeys = ['s', 'p', 't', 'r', 'w', 'Tab']; // Add more if needed

      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      if (isCtrlOrMeta && blockedKeys.includes(event.key.toLowerCase())) {
        event.preventDefault();
        console.log(`Blocked browser shortcut: ${event.key} with Ctrl/Meta`);
      }

      // Optionally block F5 (refresh)
      if (event.key === 'F5') {
        event.preventDefault();
        console.log('Blocked browser shortcut: F5');
      }
    };

    window.addEventListener('keydown', handleShortcut);

    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, []);
  const [pressedKeys, setPressedKeys] = useState({});

  function toggleKey(uniqueKey) {
    setPressedKeys(prev => ({
      ...prev,
      [uniqueKey]: !prev[uniqueKey],
    }));
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      keyboardRows.forEach((row, rowIndex) => {
        row.forEach((keyLabel, colIndex) => {
          if (keyMatchesEvent(keyLabel, e)) {
            const uniqueKey = `${keyLabel}-${rowIndex}-${colIndex}`;
            setPressedKeys(prev => ({ ...prev, [uniqueKey]: true }));
          }
        });
      });
    };

    const handleKeyUp = (e) => {
      keyboardRows.forEach((row, rowIndex) => {
        row.forEach((keyLabel, colIndex) => {
          if (keyMatchesEvent(keyLabel, e)) {
            const uniqueKey = `${keyLabel}-${rowIndex}-${colIndex}`;
            setPressedKeys(prev => ({ ...prev, [uniqueKey]: false }));
          }
        });
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  function keyMatchesEvent(keyLabel, event) {
    const key = event.key.toLowerCase();

    // Normalize some special keys to labels in the layout
    switch (keyLabel.toLowerCase()) {
      case 'esc': return key === 'escape';
      case 'ctrl': return key === 'control';
      case 'win': return key === 'meta' || key === 'win';
      case 'alt': return key === 'alt';
      case 'space': return key === ' ' || key === 'spacebar';
      case 'backspace': return key === 'backspace';
      case 'enter': return key === 'enter';
      case 'capslock': return key === 'capslock';
      case 'tab': return key === 'tab';
      case 'shift': return key === 'shift';
      case 'prtsc': return key === 'printscreen' || key === 'prtsc';
      case 'scrolllock': return key === 'scrolllock';
      case 'pause': return key === 'pause' || key === 'break';
      case 'insert': return key === 'insert';
      case 'delete': return key === 'delete';
      case 'home': return key === 'home';
      case 'end': return key === 'end';
      case 'pageup': return key === 'pageup';
      case 'pagedown': return key === 'pagedown';
      case 'menu': return key === 'contextmenu';
      case '←': return key === 'arrowleft';
      case '→': return key === 'arrowright';
      case '↑': return key === 'arrowup';
      case '↓': return key === 'arrowdown';
      default:
        return keyLabel.toLowerCase() === key;
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-indigo-900">Keyboard Tester</h1>

      <div className="space-y-2">
        {keyboardRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center gap-1 flex-wrap">
            {row.map((keyLabel, colIndex) => {
              const uniqueKey = `${keyLabel}-${rowIndex}-${colIndex}`;
              const isPressed = pressedKeys[uniqueKey];

              // Wide keys for proper styling
              const wideKeys = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'Shift', 'Space', 'Ctrl', 'Win', 'Alt', 'Menu'];
              let keyWidthClass = 'min-w-[2.5rem]';

              if (keyLabel === 'Space') keyWidthClass = 'min-w-[14rem]';
              else if (['Backspace', 'Tab', 'CapsLock', 'Enter', 'Shift', 'Ctrl', 'Win', 'Alt', 'Menu'].includes(keyLabel)) keyWidthClass = 'min-w-[5rem]';
              else if (['PrtSc', 'ScrollLock', 'Pause', 'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown'].includes(keyLabel)) keyWidthClass = 'min-w-[4rem]';

              return (
                <button
                  key={uniqueKey}
                  onClick={() => toggleKey(uniqueKey)}
                  className={`
                    ${keyWidthClass} px-2 py-2 rounded select-none border
                    ${isPressed ? 'bg-indigo-700 text-white' : 'bg-white text-gray-900'}
                    hover:bg-indigo-500 hover:text-white
                    transition duration-150 ease-in-out
                    cursor-pointer
                    user-select-none
                    text-sm
                    whitespace-nowrap
                  `}
                  type="button"
                >
                  {keyLabel}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-white max-w-xl">
        Click keys above or press keys on your physical keyboard to test. Pressed keys highlight.
      </p>
    </div>
  );
}
