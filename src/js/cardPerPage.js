import { breakpoints } from './variables.global';

export default function cardPerPage() {
  const widthScreen = window.innerWidth;
  if (widthScreen >= breakpoints.tablet && widthScreen < breakpoints.desktop) return 8;
  if (widthScreen >= breakpoints.desktop) return 9;
  return 4; // mobile
}
