/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  for (name of friends) {
    ul.append(`<li>${name}</li>`);
  }
}
