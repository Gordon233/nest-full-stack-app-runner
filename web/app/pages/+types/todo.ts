import type { Todo } from '../../api-client';

export namespace Route {
  export type LoaderData = Todo[];

  export interface ActionData {
    success?: string;
    error?: string;
  }

  export interface ClientLoaderArgs {
    request: Request;
    params: Record<string, string>;
  }

  export interface ClientActionArgs {
    request: Request;
    params: Record<string, string>;
  }

  export interface ComponentProps {
    loaderData: LoaderData;
    actionData?: ActionData;
  }
}
