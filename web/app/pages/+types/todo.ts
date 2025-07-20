import type { Todo } from '../../api-client';

export namespace Route {
  export type LoaderArgs = {};
  export type LoaderData = Todo[];
}