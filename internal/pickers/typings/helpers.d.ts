import { WithStyles } from '@material-ui/core/styles';
/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export declare type ExtendMui<C, Removals extends keyof C = never> = Omit<C, 'classes' | 'theme' | Removals>;
export declare type MakeOptional<T, K extends keyof T> = {
    [P in K]?: T[P] | undefined;
} & Omit<T, K>;
export declare type MakeRequired<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: T[P];
};
export declare type WithoutClasses<TProps extends WithStyles<any>> = Omit<TProps, keyof WithStyles<any>>;
