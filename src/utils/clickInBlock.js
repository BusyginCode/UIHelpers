export default function clickInBlock(target, block) {
  if (block == target) {
    return (true);
  }
  if (target.parentElement) {
    return clickInBlock(target.parentElement, block);
  }
  return (false);
}

// function findParentFile(parentNode) {

//   if (parentNode.getAttribute('data-reactid')) {
//     if (parentNode.getAttribute('data-component')) {
//       return parentNode.getAttribute('data-component')
//     } else {
//       return findParentFile(parentNode.parentNode)
//     }
//   } else {
//     return 'notfile'
//   }

// }

// {
//     for (let key = 1; key <= e.path.length - 1; key++) {
//       if (e.path[key] == block) {
//         return true
//       }
//     }
//     return false
//   }
