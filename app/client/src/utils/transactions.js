const getReceitas = (items) => {
  return items.reduce((acc, cur) => (cur.type === '+' ? acc + cur.value : acc), 0);
}

const getDespesas = (items) => {
  return items.reduce((acc, cur) => (cur.type === '-' ? acc + cur.value : acc), 0);
}

export { getReceitas, getDespesas };