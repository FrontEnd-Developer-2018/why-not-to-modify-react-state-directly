import React from "react";

export default ({ name , chef }) => {
  return (
    <div>
      <h1>I'm String: {name}!</h1>
      <h1>I'm JS Object: {chef.name}!</h1>
    </div>
  );
};
