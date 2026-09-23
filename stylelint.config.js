// Syrup v2 lint rules — see prd.md §3 and §12
const sides = (p) => [p, `${p}-inline`, `${p}-block`, `${p}-inline-start`, `${p}-inline-end`, `${p}-block-start`, `${p}-block-end`];

const groups = [
  // display + internal layout
  ['display', 'container', 'container-type', 'container-name',
    'flex', 'flex-flow', 'flex-direction', 'flex-wrap', 'flex-grow', 'flex-shrink', 'flex-basis',
    'grid', 'grid-template', 'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
    'grid-auto-flow', 'grid-auto-columns', 'grid-auto-rows', 'grid-area', 'grid-column', 'grid-row',
    'gap', 'row-gap', 'column-gap',
    'place-content', 'place-items', 'place-self',
    'align-content', 'align-items', 'align-self',
    'justify-content', 'justify-items', 'justify-self', 'order'],
  // size
  ['box-sizing', 'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height',
    'inline-size', 'min-inline-size', 'max-inline-size', 'block-size', 'min-block-size', 'max-block-size',
    'aspect-ratio', 'overflow', 'overflow-x', 'overflow-y', 'overflow-inline', 'overflow-block'],
  // padding
  sides('padding'),
  // border
  [...sides('border'), ...sides('border').flatMap((p) => [`${p}-width`, `${p}-style`, `${p}-color`]),
    'border-radius', 'border-start-start-radius', 'border-start-end-radius',
    'border-end-start-radius', 'border-end-end-radius',
    'outline', 'outline-width', 'outline-style', 'outline-color', 'outline-offset'],
  // margin
  sides('margin'),
  // position
  ['position', ...sides('inset'), 'z-index'],
  // typography
  ['font', 'font-family', 'font-size', 'font-weight', 'font-style', 'font-variant', 'font-feature-settings',
    'line-height', 'letter-spacing', 'text-align', 'text-transform', 'text-decoration',
    'text-decoration-line', 'text-decoration-color', 'text-decoration-thickness', 'text-underline-offset',
    'text-wrap', 'text-box', 'text-overflow', 'white-space', 'overflow-wrap', 'word-break',
    'hyphens', 'vertical-align', 'list-style'],
  // visual
  ['background', 'background-color', 'background-image', 'background-position', 'background-size',
    'background-repeat', 'color', 'accent-color', 'fill', 'stroke', 'box-shadow', 'opacity',
    'visibility', 'filter', 'backdrop-filter', 'transform', 'clip-path', 'object-fit', 'object-position'],
  // interaction
  ['cursor', 'pointer-events', 'user-select', 'touch-action', 'scroll-behavior',
    'transition', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay',
    'animation', 'will-change'],
].map((properties) => ({ properties }));

export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-use-logical'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(_[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      { message: 'Use block_element--modifier (single underscore)' },
    ],
    'import-notation': 'string',
    'max-nesting-depth': 2,
    'declaration-no-important': true,
    'declaration-property-value-disallowed-list': [
      { '/.*/': ['/(^|[\\s(])1px\\b/'] },
      { message: 'No hardcoded 1px — use a token' },
    ],
    'csstools/use-logical': 'always',
    'order/order': ['custom-properties', 'declarations', 'rules', 'at-rules'],
    'order/properties-order': [groups, { unspecified: 'bottom' }],
  },
  overrides: [
    {
      files: ['css/components/**/*.css'],
      rules: {
        'color-no-hex': true,
        'color-named': 'never',
        'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'color'],
        'media-feature-name-disallowed-list': ['width', 'min-width', 'max-width', 'device-width'],
      },
    },
    { files: ['css/reset.css'], rules: { 'declaration-no-important': null } },
    { files: ['css/tokens.css'], rules: { 'declaration-property-value-disallowed-list': null } },
  ],
};
