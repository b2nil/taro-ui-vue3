import AtComponent from './base'

export interface AtVirtualScrollProps extends AtComponent {
  /*
  * The number of items outside the user view that are rendered
  * (even if they are not viewable);
  * to help prevent empty white space when scrolling fast.
  * @default 0
  */
  bench?: number | string;
  /*
  * Height in pixels of the items to display
  * @default undefined
  */
  itemHeight: number | string;
  /*
  * The array of items to display
  * @default []
  */
  items: any[];
  /*
 * Height of the component as a css value
 * @default undefined
 */
  height?: number | string;
  /*
  * Sets the maximum height for the component.
  * @default undefined
  */
  maxHeight?: number | string;
  /*
  * Sets the maximum width for the component.
  * @default undefined
  */
  maxWidth?: number | string;
  /*
  * Sets the minimum height for the component.
  * @default undefined
  */
  minHeight?: number | string;
  /*
  * Sets the minimum width for the component.
  * @default undefined
  */
  minWidth?: number | string;
  /*
  * Sets the width for the component.
  * @default undefined
  */
  width?: number | string;
}
