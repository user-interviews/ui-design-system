export const drawerResponsiveWidths = {
  sm: 512,
  md: 640,
  lg: 890,
} as const;

export const drawerBreakpointViewports = Object.fromEntries(
  Object.entries(drawerResponsiveWidths).flatMap(([size, width]) => [
    [
      `drawer-${size}-below`,
      {
        name: `Drawer ${size}: ${width - 1}px`,
        styles: { height: '900px', width: `${width - 1}px` },
        type: 'desktop',
      },
    ],
    [
      `drawer-${size}-above`,
      {
        name: `Drawer ${size}: ${width + 1}px`,
        styles: { height: '900px', width: `${width + 1}px` },
        type: 'desktop',
      },
    ],
  ]),
);
