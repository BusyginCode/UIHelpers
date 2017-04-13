export const isServer = !(typeof window !== 'undefined' && window.document);

export const isIE = isServer ? false : !!(window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./));


export const unitsDimensions = [
  {
    key: 'millimeter',
    name: 'мм'
  },
  {
    key: 'meter',
    name: 'м'
  }
];

export const unitsWeight = [
  {
    key: 'gram',
    name: 'г'
  },
  {
    key: 'kilogram',
    name: 'кг'
  }
];
