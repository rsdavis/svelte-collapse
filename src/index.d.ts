declare module "svelte-collapse" {
  import type { ActionReturn } from "svelte/types/runtime/action";

  interface CollapseParams {
	open: boolean;
	duration: number;
	easing: string;
  }

  export default function collapse(node: HTMLElement, params: CollapseParams): ActionReturn;
}
