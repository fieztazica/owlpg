module.exports = {
  formatNumber (num, digits = 2) {
    // https://cell-to-singularity-evolution.fandom.com/wiki/Notation
    num = Number(num)
  const lookup = [
    //{ value: 1, symbol: "" },
    //{ value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m", ex : 6 },
    { value: 1e9, symbol: "b", ex : 9 },//ex?
    { value: 1e12, symbol: "t" , ex : 12},
    //{ value: 1e15, symbol: "Qa" },
    // { value: 1e18, symbol: "qi" },
    // { value: 1e21, symbol: "Sx" },
    // { value: 1e24, symbol: "Sp" },
    // { value: 1e27, symbol: "Oc" },
    // { value: 1e30, symbol: "No" },
    // { value: 1e33, symbol: "Dc" },
    // { value: 1e36, symbol: "Udc" }
  ];
  
  //https://cell-to-singularity-evolution.fandom.com/wiki/Notation
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num  >= item.value;
  }); //num / item.value .toFixed(digits)
  if (!item) return num.toLocaleString()
  let fixedNumbers = (item) ? num.toString().slice(-item.ex, -(item.ex - digits)) : 0
  return item ? Number(num.toString().slice(0, -item.ex)).toLocaleString() +((Number(fixedNumbers) !== 0) ? '.' + fixedNumbers : '') + item.symbol  : num.toLocaleString();// .replace(rx, "1")
},
  number (args, maxValue) {
  if (!isNaN(args)) return args
  if (args === 'all') {
    return Number(maxValue)
  }
  if (args === 'half') {
    return Math.floor(Number(maxValue)/2)
  }
  if (args === 'max') {
    return Math.floor(maxValue)
  } 
  if (args === 'quarter') {
    return Math.floor(Number(maxValue)/4)
  }
  
  const postfixes = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000,
  }
  const argsPostfix = args.slice(-1)
  
  if (postfixes[argsPostfix])
    return Number(args.slice(0, args.length - 1)) * postfixes[argsPostfix]
    
  return Number(args);
}
}