export function getImgUrl(id: string) {
  switch (id) {
    case '1':
      return 'https://picsum.photos/1600/1000';
    case '2':
      return 'https://picsum.photos/1600/1001';
    case '3':
    default:
      return 'https://picsum.photos/1600/1007';
  }
}
