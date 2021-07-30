// eslint-disable-next-line import/no-anonymous-default-export
export default function (cookie) {
  const cookies = document.cookie.split(',');
  const found = cookies.filter(ck => ck.slice(0, cookie.length) === cookie)[0];
  return found ? found.slice(cookie.length + 1) : null;
}
