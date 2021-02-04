
const UI_MOD_OPERAND = 6;
export const uiModClassName = (id) =>
  Number.isNaN(id) ? null : `ui-mod ui-mod--${window.parseInt(id) % UI_MOD_OPERAND}`;
