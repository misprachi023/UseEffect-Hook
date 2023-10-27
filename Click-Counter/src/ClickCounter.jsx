import React, { useState } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    document.title = `Clicked ${count + 1} times`;
  };

  return (
    <div>
      <h1>{`Clicked ${count} times`}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default ClickCounter;
