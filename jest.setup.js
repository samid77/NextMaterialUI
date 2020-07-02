jest.mock('react-chartjs-2', () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null,
  Pie: () => null
}));

HTMLCanvasElement.prototype.getContext = () => { 
  return;
};