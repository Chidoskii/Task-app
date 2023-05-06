const colors = ["#0377fc", "#fc9803", "#fc0303"];

const pController = (priority) => {
  const level = ["Low", "Medium", "High"];

  return {
    level: level[priority - 1],
    color: colors[priority - 1],
  };
};

export default pController;
